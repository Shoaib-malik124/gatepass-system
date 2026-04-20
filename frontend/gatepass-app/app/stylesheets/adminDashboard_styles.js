import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  topRightContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    zIndex: 10,
  },

  topButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  deleteButton: {
    backgroundColor: '#ff4d4d',
  },

  topButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 6,
  },

  iconContainer: {
    backgroundColor: '#eef6ff',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },

  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});