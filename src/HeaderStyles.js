const React = require("react-native");
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { StyleSheet } = React;

const HeaderStyles = StyleSheet.create({
  headerContainer: {
    flex:1,
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,
  },
  headerLock: {
    flex:1,
    position: "absolute",
    top: 60,
    left:25,
    //right: 20,
    zIndex: 1,
  },
  headerContainerMain: {
    flex:1,
    alignItems: "center",
    marginTop: responsiveHeight(4.5),
    backgroundColor: "white",
    paddingBottom:responsiveHeight(11),
    paddingTop:responsiveHeight(2),
    //borderBottomLeftRadius: -40,
    borderBottomRightRadius: responsiveWidth(15),
    top: responsiveHeight(0),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
export default HeaderStyles;
