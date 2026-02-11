import { StyleSheet, Text, View } from "react-native";
import AuthStatus from "../authStatus";

import { formatDateTime } from "../../../utils/formatDateTime";


export default function ItemCard({ auth, date, info, id }) {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.date}>{formatDateTime(date)}</Text>
            <AuthStatus auth={auth} />
        </View>
        <View style={styles.center}>
          <Text style={styles.info}>{info}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.tag}>{id}</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
   
    padding: 16,
    backgroundColor: "white",
    gap: 8,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    width:160,
    height:200,
  
  },

  top:{
    alignItems:"center",
    gap:4,
    flex:1,
    width: "100%",
  },

  center:{
    flex:1,
    width: "100%",
  },

  bottom: {
    flex: 1,
    width: "100%",          
    alignItems: "center",
    justifyContent: "flex-end",
  },

  info:{
    textAlign:"center",
    flexShrink: 1,          
    flexWrap: "wrap",      
    maxWidth: "100%",
  },


  date:{
    fontSize:11,
  },  
  tag: {
    fontSize: 11,
    color: "grey",
    textAlign: "center",
    flexShrink: 1,          
    flexWrap: "wrap",      
    maxWidth: "100%",
  },
});