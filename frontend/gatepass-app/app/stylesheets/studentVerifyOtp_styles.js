import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    minHeight: 350,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,

    // Android shadow
    elevation: 5,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    justifyContent: 'center',
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    textAlign: 'center', 
    fontSize: 18,
    letterSpacing: 8, 
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#4a6cf7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  label: {
    color: '#3b5ed7',
    marginBottom: 5,
    marginTop: 10,
  }
});