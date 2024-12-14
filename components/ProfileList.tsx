import { FC, useRef } from "react";
import { ProfileCard } from "./ProfileCard";
import { Profile } from "@/stores/profileStore";
import { FlatList } from "react-native-gesture-handler";

export interface ProfileListProps {
  profiles: Profile[];
}

export const ProfileList: FC<ProfileListProps> = ({ profiles }) => {
  /**
   * Handler function to like a profile.
   *
   * @param {string} id - The unique identifier of the profile to like.
   */
  const handleLike = (id: string): void => {
    console.log("like", id);
    // likeProfile(id);
  };

  /**
   * Handler function to dislike a profile.
   *
   * @param {string} id - The unique identifier of the profile to dislike.
   */
  const handleDislike = (id: string): void => {
    console.log("dislike", id);
    // dislikeProfile(id);
  };

  /**
   * Renders the main list of profile cards using `FlatList`.
   * Maps each profile to a `ProfileCard` component, providing handlers for like, dislike, and details actions.
   */
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item, index) => `${index}${item.id}`}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator
      nestedScrollEnabled
      shouldActivateOnStart
      initialNumToRender={2}
      scrollEnabled
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <ProfileCard
          profile={item}
          onLike={() => handleLike(item.id)}
          onDislike={() => handleDislike(item.id)}
        />
      )}
    />
  );
};

export default ProfileList;
