import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { Image } from "react-native";
import { supabase } from "../../data/supabase";

import { formatDateTime } from "../../../utils/formatDateTime";




export function ViewItem({ item, onClose }) {


  const [product, setProduct] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  
  useEffect(() => {
    let alive = true;
    if (!item?.id) return;
  
    (async () => {
      setLoading(true);
      setLoadError(null);
  
      const tid = String(item.id);
  
      const { data: productRow, error: productError } = await supabase
        .from("product_info")
        .select("tid, epc, description, origin, produced_on")
        .eq("tid", tid)
        .maybeSingle();
  
      if (productError) throw productError;
  
      const { data: photos, error: photoError } = await supabase
        .from("product_photo")
        .select("photo_url, created_at")
        .eq("tid", tid)
        .order("created_at", { ascending: false })
        .limit(1);
  
      if (photoError) throw photoError;
  
      if (!alive) return;
      setProduct(productRow ?? null);
      setPhotoUrl(photos?.[0]?.photo_url ?? null);
    })()
      .catch((e) => {
        if (alive) setLoadError(e?.message ?? String(e));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
  
    return () => { alive = false; };
  }, [item?.id]);

  
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
             <Pressable onPress={onClose} style={styles.closebtn}><Ionicons name="create-outline" size={24} color="grey" /></Pressable>
              <Pressable onPress={onClose} style={styles.closebtn}><Ionicons name="close-outline" size={24} color="grey" /></Pressable>
          </View>
          <View style={styles.imgBox}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.img} resizeMode="contain" />
          ) : (
            <Ionicons name="image-outline" size={28} color="#9AA0A6" />
          )}
          </View>
          <View style={styles.infoRow}>
              <Text style={styles.label}> epc </Text>
              <Text style={styles.valueBold}>{product?.epc ?? item?.info}</Text>
          </View>
          <View style={styles.infoRow}>
              <Text style={styles.label}> tid </Text>
              <Text style={styles.valueBold}>{product?.tid ?? item?.id}</Text>
          </View>

          <View style={styles.info}>
          <Text style={styles.value}>{product?.description ?? "—"}</Text>
          </View>
          <View style={styles.infoRow}>
              <Text style={styles.valueBold}>{product?.origin ?? "—"}</Text>
              <Text style={styles.valueBold}>{product?.produced_on ?? "—"}</Text>
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
        justifyContent: "space-between"
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
        backgroundColor: "white",
        height: 160,
        borderRadius: 8,
      },

      img: { width: "100%", height: "100%" },

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