import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const VitrineaCard = ({ title, description, price, imageUri }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: imageUri }} style={styles.productImage} />
    <View style={styles.cardContent}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text style={styles.productPrice}>${price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
  },
  priceContainer: {
    justifyContent: 'flex-end',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default VitrineaCard;
