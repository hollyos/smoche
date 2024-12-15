// ProfileList.tsx - Main component for displaying a list of user profiles with actions to like, dislike, or view details.
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import ProfileCard from './ProfileCard';
import useProfiles from './useProfiles';
import { ThemedText } from './ThemedText';

/**
 * ProfileList component displays a scrollable list of user profiles.
 * Each profile card provides actions to like, dislike, or view more details.
 *
 * This component fetches profile data using the `useProfiles` hook on mount,
 * displays loading and error states, and renders a list of profile cards
 * with interactive options for each profile.
 *
 * @component
 * @returns {React.ReactElement} A view with a list of profile cards and loading/error handling.
 */
const ProfileList: React.FC = () => {
  /**
   * Destructures state and actions from `useProfiles` hook.
   * 
   * @property {Profile[]} profiles - An array of user profiles.
   * @property {boolean} loading - Loading state to indicate data is being fetched.
   * @property {string | null} error - Error message in case of failed data fetch.
   * @property {() => Promise<void>} fetchProfiles - Function to fetch profile data.
   * @property {(id: string) => void} likeProfile - Function to mark a profile as liked.
   * @property {(id: string) => void} dislikeProfile - Function to mark a profile as disliked.
   */
  const { profiles, loading, fetchProfiles, likeProfile, dislikeProfile, error } = useProfiles();

  /**
   * useEffect hook to fetch profiles when the component mounts.
   * Calls `fetchProfiles` from the `useProfiles` hook to initialize the profiles list.
   */
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  /**
   * Handler function to like a profile.
   * Invokes `likeProfile` function from the `useProfiles` hook, marking the profile as liked.
   *
   * @param {string} id - The unique identifier of the profile to like.
   */
  const handleLike = (id: string): void => {
    likeProfile(id);
  };

  /**
   * Handler function to dislike a profile.
   * Invokes `dislikeProfile` function from the `useProfiles` hook, marking the profile as disliked.
   *
   * @param {string} id - The unique identifier of the profile to dislike.
   */
  const handleDislike = (id: string): void => {
    dislikeProfile(id);
  };

  /**
   * Handler function to view profile details.
   * This function currently logs the profile ID to the console,
   * but can be expanded to navigate to a detailed profile view.
   *
   * @param {string} id - The unique identifier of the profile to view details for.
   */
  const handleDetails = (id: string): void => {
    console.log(`View details for profile id: ${id}`);
  };

  /**
   * Renders a loading indicator while profiles are being fetched.
   * If `loading` is true, this section will display an activity indicator.
   */
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  /**
   * Renders an error message if there was an issue fetching profiles.
   * Displays the error text if `error` is not null.
   */
  if (error) return <ThemedText>Error: {error}</ThemedText>;

  /**
   * Renders the main list of profile cards using `FlatList`.
   * Maps each profile to a `ProfileCard` component, providing handlers for like, dislike, and details actions.
   */
  return (
    <FlatList
      data={profiles}
      renderItem={({ item }) => (
        <ProfileCard
          profile={item}
          onLike={() => handleLike(item.id)}
          onDislike={() => handleDislike(item.id)}
          onDetails={() => handleDetails(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProfileList;
