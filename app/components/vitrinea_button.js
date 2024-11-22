import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function VitrineaButton({
  title,
  onPress,
  style = {},
  textStyle = {},
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4169E1", 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#00008B", 
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    width: '75%'
  },
  text: {
    color: "#ffffff", 
    fontSize: 16,
    fontWeight: "600",
  },
});
