const React = require("react-native");
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:"green",
    fontWeight:"bold",
    fontSize: responsiveFontSize(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  floatingPlusButton: {
    position: 'absolute',
    bottom: 50, // Adjust as needed
    right: 30, // Adjust as needed
    backgroundColor: 'black', // Change to your desired background color
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // Add other styles for your button here
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  floatingRefreshButton: {
    position: 'absolute',
    bottom: 120, // Adjust as needed
    right: 30, // Adjust as needed
    backgroundColor: 'black', // Change to your desired background color
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // Add other styles for your button here
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  plusIcon: {
    // Add styles for your plus icon image here
  },
});
export default styles;