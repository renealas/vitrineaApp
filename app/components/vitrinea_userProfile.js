import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

const VitrineaUserProfile = () => {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push({
              pathname: '/UserProfileScreen'
            }); 
  };

  return (
    <TouchableOpacity onPress={navigateToProfile}>
      <Icon name="account-circle" size={30} color="#4169E1" />
    </TouchableOpacity>
  );
};

export default VitrineaUserProfile;
