import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UpdateStatus() {
  const { id } = useLocalSearchParams();
  const [status, setStatus] = useState('');
  const [allowFontScaling, setAllowFontScaling] = useState(true);

  useEffect(() => {
    const loadFontScaling = async () => {
      const saved = await AsyncStorage.getItem('fontScaling');
      if (saved !== null) setAllowFontScaling(JSON.parse(saved));
    };
    loadFontScaling();
  }, []);

  const handleSubmit = () => {
    if (!status) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a status'
      });
      return;
    }
    console.log(`Package ${id} status updated to: ${status}`);
    Toast.show({
      type: 'success',
      text1: 'Status Updated',
      text2: `Package status set to ${status}`
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.label, { allowFontScaling }]}>Update Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(value) => setStatus(value)}
        style={[styles.picker, { allowFontScaling }]}
      >
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="In Transit" value="In Transit" />
        <Picker.Item label="Delivered" value="Delivered" />
        <Picker.Item label="Failed" value="Failed" />
      </Picker>

      <TouchableOpacity
      onPress={handleSubmit}
      style={styles.submitTouch}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => router.push("/settings")}
      style={styles.settingWrapper}>
        <Text style={styles.settingText}>Setting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "gray" },
  label: { fontSize: 40, marginBottom: 16, fontFamily: 'Roboto-Regular' },
  picker: {backgroundColor: '#2196f3', height: 200, width: '100%', borderRadius: 10  },
  submitTouch: {backgroundColor: "orange", height: 50, borderRadius: 20, marginTop: 30,  alignItems: "center", justifyContent: "center"},
  submitText: {color: "#fff", fontSize: 25},
  settingWrapper: {marginTop: 15, backgroundColor: "gray", width: "40%", height: "5%", borderRadius:30, alignItems: "center", justifyContent: "center"},
  settingText: {color: "#fff", fontSize: 15}
});