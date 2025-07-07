import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { packages } from '../../data/packages.js';

export default function PackageDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const packageData = packages.find((p) => p.id === id);
    setPkg(packageData);
  }, [id]);

  if (!pkg) return <Text>Loading...</Text>;

  const handleMarkDelivered = () => {
    Toast.show({
      type: 'success',
      text1: 'Status Updated',
      text2: 'Package marked as delivered'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tracking ID: {pkg.trackingId}</Text>
      <Text style={styles.label}>Recipient: {pkg.recipient.name}</Text>
      <Text style={styles.label}>Phone: {pkg.recipient.phone}</Text>
      <Text style={styles.label}>Address: {pkg.recipient.address}</Text>
      <Text style={styles.label}>Status: {pkg.status}</Text>
      <Text style={styles.label}>Weight: {pkg.weight} kg</Text>
      <Text style={styles.label}>Type: {pkg.type}</Text>
      <Button
        title="Mark as Delivered"
        onPress={handleMarkDelivered}
      />
      <Button
        title="Contact Recipient"
        onPress={() => Linking.openURL(`tel:${pkg.recipient.phone}`)}
      />
      <Button
        title="Update Status"
        onPress={() => router.push(`/update/${id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8, fontFamily: 'Roboto-Regular', fontScaling: false }
});