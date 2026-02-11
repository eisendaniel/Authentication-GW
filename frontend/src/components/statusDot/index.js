import React from "react";
import { View, StyleSheet } from "react-native";

export default function StatusDot({ live }) {
  return <View style={[styles.dot, live ? styles.live : styles.off]} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginLeft: 8,
  },
  live: {
    backgroundColor: "#22c55e", // green
  },
  off: {
    backgroundColor: "#9ca3af", // grey
  },
});