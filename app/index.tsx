import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter, useNavigation } from "expo-router";
import VitrineaInput from "./components/vitrinea_input";
import VitrineaButton from "./components/vitrinea_button";
import { useDispatch } from "react-redux";
import { fetchUsers, setCurrentUser } from "./redux/userSlice";
import { AppDispatch } from "./redux/store";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: "Inicio de Sesión",
      headerBackVisible: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("username", username);
      dispatch(fetchUsers()).then((action: any) => {
        if (fetchUsers.fulfilled.match(action)) {
          const allUsers = action.payload;
          const matchedUser = allUsers.find(
            (user: { username: string }) => user.username === username
          );

          if (matchedUser) {
            dispatch(setCurrentUser(matchedUser));
            setUsername("");
            setPassword("");
            router.push("/products/ProductListScreen");
          } else {
            Alert.alert("Error", "User not found.");
          }
        } else {
          Alert.alert("Error", "Failed to fetch users.");
        }
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <VitrineaInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <VitrineaInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      <VitrineaButton
        title="Iniciar Sesión"
        onPress={handleLogin}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: "contain",
  },
});
