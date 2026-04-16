import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
  width: '100%',
  maxWidth: 500,
  minHeight: 450,
  backgroundColor: 'white',
  padding: 30,
  borderRadius: 15,

  elevation: 5,

  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
},

  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 15,
  },

  portal: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    padding: 12,
  },

  button: {
    backgroundColor: '#4a6cf7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});