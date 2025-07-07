import { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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


  if (!packages || packages.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No packages found.</Text>
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
      <ScrollView contentContainerStyle={styles.headerContainer}>
        <LinearGradient
          colors={['#2196f3', '#3f51b5']}
          style={styles.headerGradient}
        >
          <Image
            source={require('../assets/images/dashboardimg.jpg')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { allowFontScaling }]}>
            Logistics Tracker
          </Text>
          <Text style={[styles.headerSubtitle, { allowFontScaling }]}>
            Seamlessly track your packages in real-time with precision and ease. Stay informed, stay ahead.
          </Text>
        </LinearGradient>
      </ScrollView>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  headerContainer: {

  },
  headerGradient: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 2,
  },
  headerImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  flatList: {
    
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pending: {
    backgroundColor: '#ff9800',
  },
  inTransit: {
    backgroundColor: '#2196f3',
  },
  delivered: {
    backgroundColor: '#4caf50',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});