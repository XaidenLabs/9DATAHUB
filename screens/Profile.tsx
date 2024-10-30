import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`http://192.168.67.246/backend/profile.php?userId=${userId}`);
    const data = await response.json();

    if (data.status === 'success') {
      return data.user; // Return user details
    } else {
      throw new Error(data.message); // Handle error response
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

const Profile = ({ navigation, route }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = route.params?.userId; 

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available.');
      return;
    }

    const getUserDetails = async () => {
      try {
        const fetchedDetails = await fetchUserDetails(userId); // Fetch user details from backend    
        setUserDetails(fetchedDetails); // Set fetched details to state
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user details.');
      } finally {
        setLoading(false); 
      }
    };

    getUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.centered}>
        <Text>User details not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
      <Text style={styles.label}>Username: {userDetails.name}</Text>
      <Text style={styles.label}>Email: {userDetails.email}</Text>
      <Text style={styles.label}>Phone Number: {userDetails.phone}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FundWallet', { userId })}>
        <Text style={styles.buttonText}>Fund Wallet</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
  },
  profile:{
    borderColor: '#333',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 20,
  borderRadius: 30,

  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Profile;
