import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = ({ route, navigation }: {navigation: any, route: any}) => {
  const { userId, userName, balance: initialBalance } = route.params; 

  const [userDetails, setUserDetails] = useState({
    name: userName,
    balance: initialBalance ?? 0, 
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log('User details:', userDetails);
  }, [userDetails]);

  const updateBalance = (newBalance) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      balance: newBalance,
    }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId })}>
          <Ionicons name="person-circle-outline" size={35} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>Welcome, {userName}</Text>
          <Text style={styles.balance}>
            Balance: {Number(userDetails.balance)?.toFixed(2) ?? '0.00'}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TouchableOpacity onPress={() => navigation.navigate('FundWallet', { userId })}>
          <View style={styles.fundWallet}>
            <Ionicons name="wallet" size={35} color="white" />
            <Text style={styles.fundWalletText}>Fund Wallet</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.widgetsContainer}>
          <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Airtime')}>
            <Ionicons name="call" size={24} color="white"/>
            <Text style={styles.widgetText}>Airtime</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Data')}>
            <Ionicons name="wifi" size={24} color="white" />
            <Text style={styles.widgetText}>Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.widget}>
            <Ionicons name="power" size={24} color="white" />
            <Text style={styles.widgetText}>Electricity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.widget}>
            <Ionicons name="tv" size={24} color="white" />
            <Text style={styles.widgetText}>TV</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Dashboard', { userId })}>
          <Ionicons name="home" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Data')}>
          <Ionicons name="wifi" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Airtime')}>
          <Ionicons name="call" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Airtime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Profile', { userId })}>
          <Ionicons name="person" size={24} color="#1e90ff" />
          <Text style={styles.footerText}>Profile</Text>
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
    marginLeft: 15,
    marginTop: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balance: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  body: {
    padding: 15,
  },
  fundWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#32cd32',
    borderRadius: 10,
    marginVertical: 20,
  },
  fundWalletText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  widgetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  widget: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '48%',
    alignItems: 'center',
  },
  widgetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
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

export default Dashboard;
