import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centers everything vertically on the screen
  },

  // Added specifically for the text sitting directly on the gradient background
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text to pop against the blue gradient
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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

  // Icon container for Approval (Blue theme)
  iconContainerApprove: {
    backgroundColor: '#eef6ff',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  // Icon container for Decline (Red theme)
  iconContainerDecline: {
    backgroundColor: '#ffeef0', 
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  // Title for inside the white cards
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },

  // Approve Button (Blue)
  buttonApprove: {
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  // Decline Button (Red)
  buttonDecline: {
    backgroundColor: '#ff4d4d', 
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});