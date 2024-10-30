import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Airtime = ({navigation, route}: {navigation: any, route: any }) => {
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const { userId } = route.params || {};

  const handleBuyAirtime = () => {
       {
        Alert.alert(
          "Success",
          `Airtime purchase for ${phoneNumber} is being processed.`,
          [
            { text: "OK", onPress: () => navigation.navigate('Dashboard', { userId }) },
          ],
          { cancelable: false }
        );  };
        return;
      }
  
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Airtime</Text>

      {/* Select Network */}
      <Text style={styles.label}>Select Network:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={network}
          onValueChange={(itemValue) => setNetwork(itemValue)}
        >
          <Picker.Item label="Select Network" value="" />
          <Picker.Item label="MTN" value="mtn" />
          <Picker.Item label="Airtel" value="airtel" />
          <Picker.Item label="Glo" value="glo" />
          <Picker.Item label="9mobile" value="9mobile" />
        </Picker>
      </View>

      
 
      {/* Amount */}
      <Text style={styles.label}>Enter Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Phone Number Input */}
      <Text style={styles.label}>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination phone number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Buy airtime Button */}
      <TouchableOpacity style={styles.button} onPress={handleBuyAirtime}>
        <Text style={styles.buttonText}>Buy Airtime</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1e90ff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default Airtime;
