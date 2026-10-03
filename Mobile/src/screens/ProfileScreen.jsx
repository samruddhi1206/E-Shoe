import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {AuthContext} from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileCard}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>

        <Text style={styles.name}>
          {user?.name || 'User'}
        </Text>

        <Text style={styles.email}>
          {user?.email || ''}
        </Text>

      </View>

      {/* My Orders */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('Orders')}
      >
        <Text style={styles.menuButtonText}>My Orders</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 25,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },

  menuButton: {
    height: 55,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  logoutButton: {
    height: 55,
    backgroundColor: '#111',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;