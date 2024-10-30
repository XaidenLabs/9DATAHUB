import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Databundles = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [dataBundles, setDataBundles] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataBundles = async () => {
      try {
        const response = await fetch('http://192.168.67.246/backend/Databundles.php');
        const text = await response.text();
        console.log('Raw response:', text); // Debugging raw response

        const data = JSON.parse(text);

        if (data.status === 'success') {
          // Clean up any leading/trailing spaces and ensure consistency
          const cleanedData = data.data_bundles.map(bundle => ({
            ...bundle,
            network: bundle.network.trim(),
            data_type: bundle.data_type.trim(),
            data_plan: bundle.data_plan.trim(),
            price: parseFloat(bundle.price).toFixed(2) // Ensure price is formatted
          }));
          setDataBundles(cleanedData);
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Error fetching data bundles:', error);
        Alert.alert('Error', 'Something went wrong while fetching data bundles.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataBundles();
  }, []);

  const deleteBundle = async (id: number) => {
    try {
      const response = await fetch('http://192.168.125.246/backend/Databundles.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success', 'Data bundle deleted successfully');
        setDataBundles((prevBundles) => prevBundles.filter((bundle) => bundle.id !== id));
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error deleting data bundle:', error);
      Alert.alert('Error', 'Something went wrong while deleting the data bundle.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Network: {item.network}</Text>
      <Text style={styles.text}>Data Type: {item.data_type}</Text>
      <Text style={styles.text}>Plan: {item.data_plan}</Text>
      <Text style={styles.text}>Price: {item.price} NGN</Text>

      <View style={styles.actions}>
        <Button title="Edit" onPress={() => navigation.navigate('EditBundle', { bundle: item })} />
        <Button title="Delete" color="red" onPress={() => deleteBundle(item.id)} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Dashboard</Text>
      </View>
      <Text style={styles.title}>Data Bundles</Text>
      <FlatList
        data={dataBundles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBundle')}
      >
        <Ionicons name="add-circle" size={60} color="blue" />
      </TouchableOpacity>

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

const FooterButton = ({ icon, label, onPress }: { icon: string, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="blue" />
    <Text style={styles.footerText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e90ff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  listContainer: {
    paddingBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});

export default Databundles;
