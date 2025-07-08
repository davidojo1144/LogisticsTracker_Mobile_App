import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const [allowFontScaling, setAllowFontScaling] = useState(true);

  useEffect(() => {
    const loadFontScaling = async () => {
      const saved = await AsyncStorage.getItem('fontScaling');
      if (saved !== null) setAllowFontScaling(JSON.parse(saved));
    };
    loadFontScaling();
  }, []);

  const toggleFontScaling = async (value) => {
    setAllowFontScaling(value);
    await AsyncStorage.setItem('fontScaling', JSON.stringify(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LinearGradient
          colors={['#2196f3', '#3f51b5']}
          style={styles.headerGradient}
        >
          <Image
            source={require('../assets/images/settings.jpg')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { allowFontScaling }]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, { allowFontScaling }]}>
            Customize your app experience with ease.
          </Text>
        </LinearGradient>
        <View style={styles.settingsCard}>
          <Text style={[styles.label, { allowFontScaling }]}>
            Enable Font Scaling
          </Text>
          <Switch
            value={allowFontScaling}
            onValueChange={toggleFontScaling}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={allowFontScaling ? '#2196f3' : '#f4f3f4'}
            style={styles.switch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: 10,
    alignItems: 'center',
    borderBottomRightRadius: 20,
  },
  headerImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  settingsCard: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
});