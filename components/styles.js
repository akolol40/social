import {StyleSheet} from 'react-native'

const defaultView = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    friendContainer: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'space-between',
      top: 20
    }
});

const Ava = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    bottom: 350,
    top: 120,
    position: 'absolute',
    zIndex: -1
  }
})
const defText = StyleSheet.create({
   setup: {
    fontSize: 18, 
    lineHeight: 21,
    color: '#141414',  
    width: 276, 
    marginBottom: 30, 
    paddingTop: 10
  },
  logo: {
    width: 160,
    height: 150,
    marginBottom: 30,
    marginRight: 15
  }
});


const Btn_1 = StyleSheet.create({
    btn: {
        borderRadius: 15,
        width: 309,
        height: 50,
        alignSelf: "center",
        backgroundColor: "rgb(255,191,118)",
        borderColor: "#FFD876",
        marginBottom: 15
      },
      text: {
        alignSelf: "center",
        marginTop: 14,
        fontSize: 18,
        lineHeight: 21,
        color: "#FFFFFF",
      }
});

const Btn_2 = StyleSheet.create({
    btn: {
        borderRadius: 15,
        width: 309,
        height: 50,
        alignSelf: "center",
        backgroundColor: "rgb(255,255,255)",
        borderWidth: 1,
        borderColor: "#FFD876",
        marginBottom: 15
    },
    text: {
        alignSelf: "center",
        marginTop: 14,
        fontSize: 18,
        lineHeight: 21,
        color: "#FFAA47",
      }
});

const logoAndName = StyleSheet.create({
  logo: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginTop: 34,
    marginRight: 230
  },
  text: {
    marginRight: -30,
    marginTop: -85,
    marginBottom: 56,
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28
  },
  text_2: {
    left: 140,
    top: -80,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 28
  },
  textInfo:{
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: "#5C5C5C",
    marginRight: 162,
    marginBottom: 11
  },
  textData: {
    color: "#141414",
    fontSize: 14,
    lineHeight: 16,
    //marginLeft: 148,
    //marginTop: -54,
   // marginBottom: 51,
    marginVertical: 6
  }
})

const btnCab = StyleSheet.create({
  btn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 309,
    height: 35,
    borderWidth: 0.2,
    shadowOpacity: 0.2,
    marginBottom: 18,
    borderRadius: 25
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    color: "#141414",
    fontWeight: '500',
    marginTop: 10,
  }
})
  

const footerUi = StyleSheet.create({
  theme: {
    position: 'absolute',
    flex: 1/10,
    marginBottom: 0, 
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    height: 38,
    backgroundColor: "#ffffff",
    shadowColor: "#D8D8D8",
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2
    }
  
  }, 
  theme_2: {
    position: 'relative',
    flex: 1/8,
    marginBottom: 0, 
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    height: 40,
    borderWidth: 0.2,
    backgroundColor: "#ffffff",
    shadowColor: "#D8D8D8",
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2
    }
  }
});



export {defaultView, Btn_1, Btn_2, defText, Ava, logoAndName, btnCab, footerUi}