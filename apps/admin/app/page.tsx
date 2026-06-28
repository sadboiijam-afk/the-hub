"use client";

import { useEffect, useMemo, useState } from "react";
import { adminQueues, previewRequestStatuses, type PreviewRequest, type PreviewRequestStatus } from "@lucid/shared-types";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; requests: readonly PreviewRequest[] }
  | { status: "blocked"; message: string }
  | { status: "error"; message: string };

export default function AdminHomePage() {
  const apiBaseUrl = useMemo(() => process.env.NEXT_PUBLIC_API_BASE_URL, []);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [updatingId, setUpdatingId] = useState<string | undefined>();

  async function loadRequests() {
    if (apiBaseUrl === undefined || apiBaseUrl.length === 0) {
      setLoadState({
        status: "error",
        message: "NEXT_PUBLIC_API_BASE_URL is not configured for this admin environment."
      });
      return;
    }

    setLoadState({ status: "loading" });

    try {
      const response = await fetch(`${apiBaseUrl}/preview-requests`, { cache: "no-store" });

      if (response.status === 403) {
        setLoadState({
          status: "blocked",
          message: "Preview request admin endpoints are disabled. Set PREVIEW_ADMIN_ENABLED=true for local review only."
        });
        return;
      }

      if (!response.ok) {
        setLoadState({ status: "error", message: "Preview requests could not be loaded from the API." });
        return;
      }

      const requests = (await response.json()) as readonly PreviewRequest[];
      setLoadState({ status: "ready", requests });
    } catch {
      setLoadState({ status: "error", message: "The API is not reachable. Start services/api or set NEXT_PUBLIC_API_BASE_URL." });
    }
  }

  async function updateStatus(id: string, status: PreviewRequestStatus) {
    if (apiBaseUrl === undefined || apiBaseUrl.length === 0) {
      setLoadState({
        status: "error",
        message: "NEXT_PUBLIC_API_BASE_URL is not configured for this admin environment."
      });
      return;
    }

    setUpdatingId(id);

    try {
      const response = await fetch(`${apiBaseUrl}/preview-requests/${id}/status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        setLoadState({ status: "error", message: "Status update failed. Check the dev-only admin boundary." });
        return;
      }

      await loadRequests();
    } catch {
      setLoadState({ status: "error", message: "The API is not reachable while updating status." });
    } finally {
      setUpdatingId(undefined);
    }
  }

  useEffect(() => {
    void loadRequests();
  }, []);

  return (
    <main className="admin-page">
      <section className="admin-hero" aria-labelledby="admin-title">
        <div>
          <p>Pre-production operations</p>
          <h1 id="admin-title">Trust and preview review workspace</h1>
          <span>
            Development-only surface for reviewing preview requests before full admin authentication exists.
          </span>
        </div>
        <button type="button" onClick={() => void loadRequests()}>
          Refresh
        </button>
      </section>

      <section className="boundary-banner" aria-label="Security boundary">
        <strong>Temporary boundary</strong>
        <span>
          Status updates require the API-side `PREVIEW_ADMIN_ENABLED=true` switch. This is not production auth and must
          be replaced before launch.
        </span>
      </section>

      <section className="preview-queue" aria-labelledby="preview-queue-title">
        <div className="section-title">
          <p>Preview requests</p>
          <h2 id="preview-queue-title">Waitlist intake</h2>
        </div>

        {loadState.status === "loading" ? <p className="admin-state">Loading preview requests...</p> : null}
        {loadState.status === "blocked" || loadState.status === "error" ? (
          <p className={`admin-state ${loadState.status}`}>{loadState.message}</p>
        ) : null}
        {loadState.status === "ready" && loadState.requests.length === 0 ? (
          <p className="admin-state">No preview requests yet.</p>
        ) : null}
        {loadState.status === "ready" && loadState.requests.length > 0 ? (
          <div className="request-list">
            {loadState.requests.map((request) => (
              <article className="request-row" key={request.id}>
                <div>
                  <span className={`status-pill ${request.status}`}>{request.status.replace("_", " ")}</span>
                  <h3>{request.email}</h3>
                  <p>
                    {request.role}
                    {request.city === undefined ? "" : ` · ${request.city}`}
                    {request.country === undefined ? "" : `, ${request.country}`}
                  </p>
                  {request.message === undefined ? null : <small>{request.message}</small>}
                </div>
                <label>
                  <span>Status</span>
                  <select
                    disabled={updatingId === request.id}
                    value={request.status}
                    onChange={(event) => void updateStatus(request.id, event.target.value as PreviewRequestStatus)}
                  >
                    {previewRequestStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </label>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="queue-list" aria-label="Future admin queues">
        {adminQueues.map((queue) => (
          <article className="queue-row" key={queue.name}>
            <div>
              <h2>{queue.name}</h2>
              <p>{queue.description}</p>
            </div>
            <span>{queue.phase}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
