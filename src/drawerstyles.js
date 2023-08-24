const React = require("react-native");

const { StyleSheet } = React;

const Drawerstyles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  headerContainerMain: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    paddingBottom:50,
    paddingTop:50,
    borderBottomLeftRadius: -40,
    borderBottomRightRadius: 60,
    bottom: -20,
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
export default Drawerstyles;
