import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRouter } from "expo-router";
import VitrineaCard from '../components/vitrinea_card';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import VitrineaUserProfile from '../components/vitrinea_userProfile';

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Vitrinea", headerBackVisible: false, headerRight: () => <VitrineaUserProfile />, });
  }, [navigation]);

  const removeDuplicateProducts = (newProducts) => {
    const uniqueProducts = newProducts.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.id === value.id)
    );
    return uniqueProducts;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      const uniqueProducts = removeDuplicateProducts(response.data);
      setProducts((prevProducts) => {
        const updatedProducts = removeDuplicateProducts([...prevProducts, ...uniqueProducts]);
        setFilteredProducts(updatedProducts); 
        return updatedProducts;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Hubo un error con la informacion de los Productos. Porfavor trate de nuevo");
      return;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products); 
      return;
    }

    const lowerCaseQuery = text.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      product.price.toString().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar productos..."
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        ): (
          <Icon
            name={"magnify"}
            size={24}
            color="#4169E1"
          />
        )}
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push({
              pathname: `/products/${item.id}`
            })}
          >
            <VitrineaCard
              title={item.title}
              description={item.category}
              price={item.price}
              imageUri={item.image}
            />
          </TouchableOpacity>
        )}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
