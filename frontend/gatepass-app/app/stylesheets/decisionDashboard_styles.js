import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 6,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#eaf4ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },

  subText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },

  // NEW INPUT STYLE
  input: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#dbe4ea",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
    marginTop: 12,
    marginBottom: 10,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#4facfe",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  declineButton: {
    backgroundColor: "#ff5c5c",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});