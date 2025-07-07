import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { packages } from '../../data/packages.js';

export default function PackageDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const packageData = packages.find((p) => p.id === id);
    setPkg(packageData);
    console.log('Package Data:', packageData); // Debug
  }, [id]);

  if (!pkg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Package not found.</Text>
      </View>
    );
  }

  const handleMarkDelivered = () => {
    Toast.show({
      type: 'success',
      text1: 'Status Updated',
      text2: 'Package marked as delivered'
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LinearGradient
          colors={['#2196f3', '#3f51b5']}
          style={styles.headerGradient}
        >
          <Image
            source={require('../../assets/images/logistics-details.jpg')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Package Details</Text>
        </LinearGradient>
        <View style={styles.detailsCard}>
          <Text style={styles.label}>Tracking ID: {pkg.trackingId}</Text>
          <Text style={styles.label}>Recipient: {pkg.recipient.name}</Text>
          <Text style={styles.label}>Phone: {pkg.recipient.phone}</Text>
          <Text style={styles.label}>Address: {pkg.recipient.address}</Text>
          <Text style={styles.label}>Status: {pkg.status}</Text>
          <Text style={styles.label}>Weight: {pkg.weight} kg</Text>
          <Text style={styles.label}>Type: {pkg.type}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.deliveredButton]}
              onPress={handleMarkDelivered}
            >
              <Text style={styles.buttonText}>Mark as Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.contactButton]}
              onPress={() => Linking.openURL(`tel:${pkg.recipient.phone}`)}
            >
              <Text style={styles.buttonText}>Contact Recipient</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={() => router.push(`/update/${id}`)}
            >
              <Text style={styles.buttonText}>Update Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerGradient: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deliveredButton: {
    backgroundColor: '#4caf50',
  },
  contactButton: {
    backgroundColor: '#2196f3',
  },
  updateButton: {
    backgroundColor: '#ff9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});