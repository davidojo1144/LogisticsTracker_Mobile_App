import { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { packages } from '../data/packages.json';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Text style={[styles.itemText, { fontScaling: allowFontScaling }]}>ID: {item.trackingId}</Text>
      <Text style={[styles.itemText, { fontScaling: allowFontScaling }]}>{item.recipient.name}</Text>
      <Text
        style={[
          styles.statusBadge,
          item.status === 'Delivered' ? styles.delivered :
          item.status === 'In Transit' ? styles.inTransit :
          styles.pending,
          { fontScaling: allowFontScaling }
        ]}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
  delivered: { backgroundColor: '#4caf50' }
});