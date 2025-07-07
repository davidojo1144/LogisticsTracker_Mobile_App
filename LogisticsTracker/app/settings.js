import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.label}>Enable Font Scaling</Text>
      <Switch
        value={allowFontScaling}
        onValueChange={toggleFontScaling}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, marginBottom: 16, fontFamily: 'Roboto-Regular', fontScaling: false }
});