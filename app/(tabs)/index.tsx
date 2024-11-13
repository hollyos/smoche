import { Image, StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { ProfileCard } from '@/components/ProfileCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileList from '@/components/ProfileList';
import { profiles } from '@/stores/profileStore'

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ProfileList profiles={profiles} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
