import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 25,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#4facfe",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  pickerContainer: {
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
});