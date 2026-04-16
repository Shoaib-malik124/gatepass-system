import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 🔥 slightly controlled scaling
const logoWidth = Math.min(Math.max(width * 0.28, 110), 160);

export default styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight || 0,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
  },

  logo: {
    width: logoWidth,
    height: 46,
    resizeMode: 'contain',
    marginLeft: 'auto', // 🔥 pushes logo to right cleanly (no weird spacing)
  },

  line: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 6,
  },
});
