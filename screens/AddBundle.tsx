import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

const AddBundle = ({ navigation }: { navigation: any }) => {
  const [network, setNetwork] = useState('');
  const [dataType, setDataType] = useState('');
  const [dataPlan, setDataPlan] = useState('');
  const [price, setPrice] = useState('');

  const handleAddBundle = async () => {
    if (!network || !dataType || !dataPlan || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.67.246/backend/Databundles.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          network,
          data_type: dataType,
          data_plan: dataPlan,
          price,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success', 'Data bundle added successfully');
        navigation.goBack(); // Go back to the admin dashboard
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error adding data bundle:', error);
      Alert.alert('Error', 'Something went wrong while adding the data bundle.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Network:</Text>
      <TextInput style={styles.input} value={network} onChangeText={setNetwork} />

      <Text style={styles.label}>Data Type:</Text>
      <TextInput style={styles.input} value={dataType} onChangeText={setDataType} />

      <Text style={styles.label}>Data Plan:</Text>
      <TextInput style={styles.input} value={dataPlan} onChangeText={setDataPlan} />

      <Text style={styles.label}>Price:</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Button title="Add Bundle" onPress={handleAddBundle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddBundle;
