import { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Pill } from './Pill';
import { Profile } from '@/stores/profileStore'

/**
 * Props interface for the ProfileCard component.
 * Defines the properties that ProfileCard expects to receive.
 */
export interface ProfileCardProps {
  /**
   * The user's profile data to be displayed.
   * This includes information such as the user's name, age, and photos.
   */
  profile: Profile;

  /**
   * Function to call when the "Like" button is pressed.
   * Triggers a like action for the user's profile.
   */
  onLike: () => void;

  /**
   * Function to call when the "Dislike" button is pressed.
   * Triggers a dislike action for the user's profile.
   */
  onDislike: () => void;

  /**
   * Function to call when the "Details" button is pressed.
   * Opens a detailed view of the user's profile.
   */
  onDetails: () => void;
}

/**
 * ProfileCard component displays a user's profile information including
 * their photo, name, age, and a brief description. It also provides
 * interactive buttons for liking, disliking, and viewing more details.
 *
 * @component
 * @param {ProfileCardProps} props - Properties passed to the component.
 * @returns {React.ReactElement} A card with profile information and action buttons.
 */
export const ProfileCard: FC<ProfileCardProps> = ({ profile, onLike, onDislike, onDetails }) => {
  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: profile.photos[0].url }} style={{ width: dimensions.screen.width, height: 500 }} />

        <View style={styles.basicsContainer}>
          <Text style={styles.name}>{profile.info.name},&nbsp;<Text style={styles.age}>{profile.info.age}</Text></Text>

          <View style={{ ...styles.row, ...styles.detailsContainer }}>
            <Text style={styles.details}>{profile.info.type}</Text>
            <Text style={styles.details}>{profile.info.gender}</Text>
            <Text style={styles.details}>{profile.info.sexuality}</Text>
          </View>
        </View>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.subtitle}>About</Text>
        <Text style={styles.about}>{profile.info.about}</Text>
      </View>

      <View style={{ paddingHorizontal: 14, marginVertical: 6 }}>
        <Text style={styles.subtitle}>Desires</Text>
        <FlatList
          data={profile.info.desires}
          renderItem={({ item }) => (
            <Pill>{item}</Pill>
          )}
          keyExtractor={(item) => item}
          style={styles.pillRow}
        />
      </View>

      <View style={{ paddingHorizontal: 14, marginVertical: 6 }}>
        <Text style={styles.subtitle}>Interests</Text>
        <FlatList
          data={profile.info.interests}
          renderItem={({ item }) => (
            <Pill>{item}</Pill>
          )}
          keyExtractor={(item) => item}
          style={styles.pillRow}
        />
      </View>
    </View>
  );
};

/**
 * StyleSheet object defining the styles for the ProfileCard component.
 * The styles include settings for layout, text, buttons, and image rendering.
 */
const styles = StyleSheet.create({
  /**
   * Style for the outer card container.
   * Defines padding, background color, and border radius for the card.
   */
  card: {
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },

  imageContainer: {
    position: "relative",
  },

  /**
   * Style for the name and age text.
   * Uses bold font for prominence.
   */
  basicsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(66,66,66,0.45)',
    shadowColor: '#333',
    shadowOffset: { height: -3, width: 0 },
    shadowOpacity: 0.3,
    width: '100%',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: "white",
    textShadowColor: '#333',
    textShadowRadius: 5,
  },
  age: {
    fontSize: 26,
    color: "white",
    textShadowColor: '#333',
    textShadowRadius: 5,
  },

  detailsContainer: {
    marginBottom: 6,
    marginTop: 2,
  },
  details: {
    fontSize: 20,
    color: "white",
    textShadowColor: '#333',
    textShadowRadius: 5,
  },

  aboutContainer: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  about: {
    fontSize: 16,
  },
  /**
   * Row container.
   */
  row: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    width: "100%",
  },

  pillRow: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    maxWidth: '100%',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});
