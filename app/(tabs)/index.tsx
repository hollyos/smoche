import { Image, StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { ProfileCard } from '@/components/ProfileCard';
import ProfileList from '@/components/ProfileList';
import { profiles } from '@/stores/profileStore'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileList profiles={profiles} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
