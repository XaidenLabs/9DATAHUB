import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

const EditBundle = ({ route, navigation }: { route: any, navigation: any }) => {
  const { bundle } = route.params;
  
  const [network, setNetwork] = useState(bundle.network);
  const [dataType, setDataType] = useState(bundle.data_type);
  const [dataPlan, setDataPlan] = useState(bundle.data_plan);
  const [price, setPrice] = useState(bundle.price);

  const handleEditBundle = async () => {
    if (!network || !dataType || !dataPlan || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.67.246/backend/Databundles.php?id=${bundle.id}`, {
        method: 'PUT',
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
        Alert.alert('Success', 'Data bundle updated successfully');
        navigation.goBack(); // Go back to the admin dashboard
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error updating data bundle:', error);
      Alert.alert('Error', 'Something went wrong while updating the data bundle.');
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

      <Button title="Save Changes" onPress={handleEditBundle} />
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
    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditBundle;
