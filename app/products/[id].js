import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";

export default function ProductDetail() {
  const local = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  const id = local['id'];

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Vitrinea", headerBackTitle: "Regresar"});
  }, [navigation]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        Alert.alert("Error", "Hubo un error con la informacion de su Producto. Porfavor trate de nuevo");
        return;
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#4169E1" size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "Flex-start",
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
