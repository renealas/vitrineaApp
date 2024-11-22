import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function VitrineaInput({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={styles.toggleButton}
        >
          <Icon
            name={secureTextEntry ? "eye-outline" :  "eye-off-outline"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  toggleButton: {
    marginLeft: 10,
  },
});
