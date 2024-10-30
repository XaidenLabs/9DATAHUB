import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Data = ({ navigation, route }: { navigation: any, route: any }) => {
  const [network, setNetwork] = useState('');
  const [dataType, setDataType] = useState('');
  const [dataPlan, setDataPlan] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dataPlans, setDataPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userId } = route.params || {};

  useEffect(() => {
    const fetchDataBundles = async () => {
      try {
        const response = await fetch('http://192.168.67.246/backend/Databundles.php');
        const data = await response.json();

        if (data.status === 'success') {
          const trimmedData = data.data_bundles.map(plan => ({
            ...plan,
            network: plan.network.trim(),
            data_type: plan.data_type.trim(),
          }));

          setDataPlans(trimmedData);
        } else {
          setError('Failed to fetch data bundles.');
        }
      } catch (error) {
        setError('Error fetching data bundles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataBundles();
  }, []);

  const handleBuyData = () => {
    if (!network || !dataType || !dataPlan || !phoneNumber) {
      Alert.alert("Error", "Please fill all fields before proceeding.");
      return;
    }

    console.log(`Network: ${network}, DataType: ${dataType}, DataPlan: ${dataPlan}, PhoneNumber: ${phoneNumber}`);

    // Show a success alert and navigate to Dashboard on confirmation
    Alert.alert(
      "Success",
      `Data purchase for ${phoneNumber} is being processed.`,
      [
        { text: "OK", onPress: () => navigation.navigate('Dashboard', { userId }) },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading data plans...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Data</Text>

      <Text style={styles.label}>Select Network:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={network}
          onValueChange={(itemValue) => setNetwork(itemValue)}
        >
          <Picker.Item label="Select Network" value="" />
          {[...new Set(dataPlans.map(plan => plan.network))].map((uniqueNetwork, index) => (
            <Picker.Item key={index} label={uniqueNetwork} value={uniqueNetwork} />
          ))}
        </Picker>
      </View>

      {/* Select Data Type */}
      <Text style={styles.label}>Select Data Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dataType}
          onValueChange={(itemValue) => setDataType(itemValue)}
        >
          <Picker.Item label="Select Data Type" value="" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      {/* Select Data Plan */}
      <Text style={styles.label}>Select Data Plan:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dataPlan}
          onValueChange={(itemValue) => setDataPlan(itemValue)}
        >
          <Picker.Item label="Select Data Plan" value="" />
          {dataPlans
            .filter(plan => plan.data_type.toLowerCase() === dataType.toLowerCase() && plan.network === network)
            .map((plan, index) => (
              <Picker.Item key={index} label={`${plan.data_plan} - ₦${plan.price}`} value={plan.data_plan} />
            ))}
        </Picker>
      </View>

      <Text style={styles.label}>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination phone number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        style={[styles.button, (!network || !dataType || !dataPlan || !phoneNumber) && styles.disabledButton]}
        onPress={handleBuyData}
        disabled={!network || !dataType || !dataPlan || !phoneNumber}
      >
        <Text style={styles.buttonText}>Buy Data</Text>
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

export default Data;
