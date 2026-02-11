import { StyleSheet, Text, View, Image } from 'react-native';
import NavBar from '../navbar/NavBar';

export default function Header({ navigationRef, active }) {

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
            <Image
              source={require('../../../assets/times7_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
        </View>
      </View>
      <View style={styles.center}>
        <NavBar navigationRef={navigationRef} active={active} />
      </View>
      <View style={styles.right}>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    margin: 16,
    borderRadius: 40,
  },


  logo: {
    width: "100%",
    maxWidth: 120,  
    height: 50,
  },

  left:{
    alignItems:"flex-start",
    flex:1,
  },

  center:{
    alignItems:"center",
    flex:1,
  },

  right:{
    alignItems:"flex-end",
    flex:1,
  },
});
