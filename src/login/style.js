const React = require("react-native");
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: responsiveFontSize(4),
    fontWeight: "500",
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(5),
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
    color:"#eaeaea"
  },
  loginFormTextInput: {
    height: responsiveWidth(12),
    fontSize: responsiveFontSize(2.5),
    borderRadius: responsiveWidth(10),
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    padding: responsiveWidth(2.5),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveWidth(1.5),
    marginBottom: responsiveWidth(1.5),
    width: responsiveWidth(90),
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: responsiveWidth(10),
    height: responsiveWidth(12),
    marginTop: responsiveWidth(2.5),
    padding: responsiveWidth(1),
    width: responsiveWidth(30),
    alignItems: "center",
    alignSelf: "center",
  },
  fbLoginButton: {
    alignSelf: "center",
    height: responsiveWidth(12),
    marginTop: responsiveWidth(2.5),
    backgroundColor: 'transparent',
  },
});
export default styles;