import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { formatDateTime } from "../../../utils/formatDateTime";




export function ViewItem({ item, onClose }) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
             <Pressable onPress={onClose} style={styles.closebtn}><Ionicons name="close-outline" size={24} color="grey" /></Pressable>
              <Pressable onPress={onClose} style={styles.closebtn}><Ionicons name="close-outline" size={24} color="grey" /></Pressable>
          </View>
          <View style={styles.imgBox}>

          </View>
          <View style={styles.infoRow}>
              <Text style={styles.label}> epc </Text>
              <Text style={styles.valueBold}>{item?.info}</Text>
          </View>
          <View style={styles.infoRow}>
              <Text style={styles.label}> tid </Text>
              <Text style={styles.valueBold}>{item?.id}</Text>
          </View>

          <View style={styles.info}>
              <Text style={styles.value}>This is the best wine in the world. Made by two cute couple in Malborough,NZ. Grapes are handpressed personally.</Text>
          </View>
          <View style={styles.infoRow}>
              <Text style={styles.valueBold}>New Zealand</Text>
              <Text style={styles.valueBold}>18 Dec 1980</Text>
          </View>


         
        </View>
      </View>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(10, 12, 18, 0.80)",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "flex-end"
    },

    card: {

        width: "100%",
        maxWidth: 360,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        marginVertical: 24,
        gap: 14,

      },

      closebtn:{

      },

      imgBox:{
        backgroundColor: "#F5F5F5",
        height: 160,
        borderRadius: 8,
      },

      info:{
        marginVertical: 8,
      },

      infoRow:{
        flexDirection: "row",
        justifyContent: "space-between",
      },

      label:{
        color: "grey",
      },
      value: {
     
      },

      valueBold: {
        fontWeight: "bold",
      },




  });