import { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { packages } from '../data/packages.js';

export default function Dashboard() {
  const router = useRouter();
  const [allowFontScaling, setAllowFontScaling] = useState(true);

  useEffect(() => {
    const loadFontScaling = async () => {
      const saved = await AsyncStorage.getItem('fontScaling');
      if (saved !== null) setAllowFontScaling(JSON.parse(saved));
    };
    loadFontScaling();
  }, []);

  // Debug: Log packages to ensure data is loaded
  useEffect(() => {
    console.log('Packages:', packages);
  }, []);

  if (!packages || packages.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No packages found. Please check data/packages.json.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Text style={[styles.itemText, { allowFontScaling }]}>ID: {item.trackingId}</Text>
      <Text style={[styles.itemText, { allowFontScaling }]}>{item.recipient.name}</Text>
      <Text
        style={[
          styles.statusBadge,
          item.status === 'Delivered' ? styles.delivered :
          item.status === 'In Transit' ? styles.inTransit :
          styles.pending,
          { allowFontScaling }
        ]}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image 
      resizeMode='contain'
      style={{width: "auto", height: "auto"}}
      source={require("../assets/images/dashboardimg.jpg")}/>

      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemText: { fontSize: 16, fontFamily: 'Roboto-Regular' },
  statusBadge: {
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 4,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Roboto-Regular'
  },
  pending: { backgroundColor: '#ff9800' },
  inTransit: { backgroundColor: '#2196f3' },
  delivered: { backgroundColor: '#4caf50' },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 }
});