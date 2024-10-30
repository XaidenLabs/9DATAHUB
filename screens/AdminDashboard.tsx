  import React, { useEffect, useState } from 'react';
  import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

  const AdminDashboard = ({navigation, route}:{navigation: any, route: any}) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://192.168.67.246/backend/admin_dashboard.php');
          const text = await response.text(); 
          console.log('Raw response:', text); 

          const data = JSON.parse(text); 

          if (data.status === 'success') {
            setUsers(data.users);
          } else {
            Alert.alert('Error', data.message);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          Alert.alert('Error', 'Something went wrong while fetching users.');
        } finally {
          setLoading(false); 
        }
      };

      fetchUsers();
    }, []);

    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const renderItem = ({ item }: { item: any }) => (
      <View style={styles.item}>
        <Text style={styles.text}>ID: {item.id}</Text>
        <Text style={styles.text}>Name: {item.name}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Balance: {item.balance}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTextContainer}>Admin Dashboard</Text>
          </View>
          <Text style={styles.title}> Users</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderItem}
        />

    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('AdminDashboard')}>
          <Ionicons name="home" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Databundles')}>
          <Ionicons name="wifi" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Airtime')}>
          <Ionicons name="call" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Airtime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('AdminDashboard')}>
          <Ionicons name="person" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Users</Text>
        </TouchableOpacity>
      </View>
      </View>

    
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1e90ff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerTextContainer: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
    },

    title:{
      fontSize: 20,
      marginTop: 45,
      marginBottom: -20,
    },

    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginTop: 40,
    },
    text: {
      fontSize: 16,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.62,
      elevation: 4,
    },
    footerButton: {
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      color: '#1e90ff',
    },
  });

  export default AdminDashboard;
