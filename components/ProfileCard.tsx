import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
export const ProfileCard: FC<ProfileCardProps> = ({ profile, onLike, onDislike, onDetails }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{profile.info.name},&nbsp;<Text style={styles.age}>{profile.info.age}</Text></Text>
  </View>
)

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
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },
  /**
   * Style for the name and age text.
   * Uses bold font for prominence.
   */
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  age: {
    fontSize: 16,
  },
});
