import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    padding: 20,
    paddingTop: 120, // space for top buttons
    paddingBottom: 40,
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
    backgroundColor: 'rgba(255,255,255,0.95)',
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
    marginBottom: 15,
  },

  // --- NEW STYLES FOR DROPDOWN ---
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    overflow: 'hidden', // Ensures picker corners don't overlap border on iOS
  },

  picker: {
    height: 50,
    width: '100%',
  },

  helperText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  // --------------------------------

  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 14, // Slightly taller for better touch target
    borderRadius: 12,
    alignItems: 'center',
  },

  // --- NEW STYLE FOR DISABLED STATE ---
  buttonDisabled: {
    backgroundColor: '#cccccc', 
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});