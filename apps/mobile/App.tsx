import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { phaseZeroModules } from "@lucid/shared-types";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>LUCID Hub</Text>
        <Text style={styles.subtitle}>
          Privacy-first local discovery, trusted business profiles, bookings, coupons, and
          community workflows.
        </Text>
        <View style={styles.list}>
          {phaseZeroModules.slice(0, 4).map((module) => (
            <View style={styles.row} key={module.name}>
              <Text style={styles.rowTitle}>{module.name}</Text>
              <Text style={styles.rowText}>{module.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f8f6"
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  title: {
    color: "#17201b",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12
  },
  subtitle: {
    color: "#5d6a62",
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 28
  },
  list: {
    gap: 12
  },
  row: {
    backgroundColor: "#ffffff",
    borderColor: "#dbe2dc",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16
  },
  rowTitle: {
    color: "#17201b",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4
  },
  rowText: {
    color: "#5d6a62",
    fontSize: 14,
    lineHeight: 20
  }
});
