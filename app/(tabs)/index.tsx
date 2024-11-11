import { Image, StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { ProfileCard } from '@/components/ProfileCard';

const tempProfiles = [{
  "id": "55be3c8fc964860700ebf515",
  "info": {
    "age": 20,
    "type": "single",
    "gender": "male",
    "sexuality": "straight",
    "name": "John",
    // a short text about them
    "about": "\"Tell us more about you\"",
    // a list of desires
    "desires": [
      "Food"
    ],
    // a list of tags they're interested in
    "interests": [
      "Food"
    ]
  },
  "associated": null, // if they're a couple, this will be populated
  "photos": [ // this will be a list of zero or more photos
    {
      "url": "...",
      "width": 716,
      "height": 716
    }
  ]
}, {
  "id": "55be3c8fc964860700ebf515",
  "info": {
    "age": 20,
    "type": "single",
    "gender": "male",
    "sexuality": "straight",
    "name": "Kirra",
    // a short text about them
    "about": "\"Tell us more about you\"",
    // a list of desires
    "desires": [
      "Food"
    ],
    // a list of tags they're interested in
    "interests": [
      "Food"
    ]
  },
  "associated": null, // if they're a couple, this will be populated
  "photos": [ // this will be a list of zero or more photos
    {
      "url": "...",
      "width": 716,
      "height": 716
    }
  ]
}]

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileCard
        profile={tempProfiles[0]}
        onLike={() => { }}
        onDislike={() => { }}
        onDetails={() => { }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
