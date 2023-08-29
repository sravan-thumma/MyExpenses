const React = require("react-native");

const { StyleSheet } = React;

const Drawerstyles = StyleSheet.create({
  headerContainer: {
    flex:1,
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,
  },
  headerContainerMain: {
    flex:1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    paddingBottom:100,
    paddingTop:0,
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
