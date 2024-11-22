import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);


  useEffect(() => {
    navigation.setOptions({ title: "Vitrinea" });
  }, [navigation]);

  if (!currentUser ) {
   if(!isClosing) {
      Alert.alert("Error", "User not found.");
   }
    return null; 
  }

  const { name, email, phone, address } = currentUser;
  const fullName = `${name.firstname} ${name.lastname}`;

  const handleLogout = async () => {
    try {
      setIsClosing(false);

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');

      router.replace('/');
    } catch (error) {
      console.error("Logout error", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/user.png")} style={styles.userImage} />
      
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phone}>{phone}</Text>
      
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Address:</Text>
        <Text style={styles.address}>
          {`${address.number} ${address.street}, ${address.city}`}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  addressContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
