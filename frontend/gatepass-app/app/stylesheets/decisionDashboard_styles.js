import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 8,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#eef6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  subText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 18,
    lineHeight: 22,
  },

  input: {
    width: "100%",
    backgroundColor: "#f7f9fc",
    borderWidth: 1,
    borderColor: "#dde6ee",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    marginBottom: 14,
  },

  button: {
    backgroundColor: "#4facfe",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  declineButton: {
    backgroundColor: "#ff5c5c",
  },

  fineButton: {
    backgroundColor: "#ff9f43",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});