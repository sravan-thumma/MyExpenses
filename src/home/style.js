const React = require("react-native");
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: responsiveFontSize(2),
  }
});
export default styles;