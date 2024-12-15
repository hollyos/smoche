import { useThemeColor } from "@/hooks/useThemeColor";
import { Profile, profiles } from "@/stores/profileStore";
import Colors from "@/styles/colors";
import { FC } from "react";
import { ViewProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ProfileCard } from "./ProfileCard";

export const ProfileList: FC<ViewProps> = () => {
  const backgroundColor = useThemeColor(
    { light: Colors.tanLight2, dark: Colors.tanDark2 },
    "background",
  );

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
      data={profiles as Profile[]}
      keyExtractor={(item, index) => `${index}${item.id}`}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator
      nestedScrollEnabled
      shouldActivateOnStart
      initialNumToRender={2}
      scrollEnabled
      scrollEventThrottle={16}
      style={{ backgroundColor }}
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
