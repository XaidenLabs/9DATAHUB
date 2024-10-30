import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const FundWallet = ({ route, navigation }: { route: any, navigation: any }) => {
  console.log('Route Params:', route.params);

  const userId = route.params?.userId; 


  if (!userId) {
    Alert.alert('Error', 'User ID is not available.');
    return null; 
  }

  const [amount, setAmount] = useState('');

  const handleFundWallet = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    try {

      const response = await fetch('http://192.168.67.246/backend/fund_wallet.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount: numericAmount,
        }),
      });

      const text = await response.text(); 
      console.log('Raw response:', text);
      let data;
      try {
        data = JSON.parse(text);
        console.log('Response from server:', data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        navigation.navigate('Dashboard', { userId }); 
        return;
      }

      const newBalance = data.newBalance; 
      Alert.alert('Success', data.message || 'Wallet funding processed.');
      setAmount(''); 
      
      navigation.navigate('Dashboard', { userId, balance: newBalance });

    } catch (error) {
      console.error('Error funding wallet:', error);
      Alert.alert('Error', 'An error occurred while funding the wallet. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fund Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Fund Wallet" onPress={handleFundWallet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default FundWallet;
