import { useThemeColor } from "@/hooks/useThemeColor";
import { Profile, useProfileStore } from "@/stores/useProfileStore";
import Colors from "@/styles/colors";
import { FC, useRef } from "react";
import { View, ViewProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ProfileCard } from "./ProfileCard";
import { useUserStore } from "@/stores/userStore";

export const ProfileList: FC<ViewProps> = () => {
  const { profiles, isLoading } = useProfileStore();
  const { addLike, addDislike, likes, dislikes } = useUserStore();

  // Ref for FlatList to pass through methods.
  const flatListRef = useRef<FlatList<Profile>>(null);

  const backgroundColor = useThemeColor(
    { light: Colors.tanLight2, dark: Colors.tanDark2 },
    "background",
  );

  /**
   * Filter profiles to exclude those already liked or disliked.
   */
  const filteredProfiles = profiles.length
    ? profiles.filter(
        (profile: Profile) =>
          !likes.includes(profile.id) && !dislikes.includes(profile.id),
      )
    : profiles;

  /**
   * Handler function to like a profile.
   *
   * @param {string} id - The unique identifier of the profile to like.
   */
  const handleLike = (id: string): void => {
    console.log("like", id);
    addLike(id);
    // likeProfile(id);
  };

  /**
   * Handler function to dislike a profile.
   *
   * @param {string} id - The unique identifier of the profile to dislike.
   */
  const handleDislike = (id: string): void => {
    console.log("dislike", id);
    addDislike(id);
    // dislikeProfile(id);
  };

  // Function to scroll to a specific index
  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the item in the view
      });
    }
  };

  /**
   * Renders the main list of profile cards using `FlatList`.
   * Maps each profile to a `ProfileCard` component, providing handlers for like, dislike, and details actions.
   */
  return (
    <View style={{ backgroundColor }}>
      <FlatList
        data={filteredProfiles as Profile[]}
        decelerationRate="fast"
        initialNumToRender={2}
        keyExtractor={(item) => `${item.id}`}
        nestedScrollEnabled
        ref={flatListRef}
        scrollEnabled
        scrollEventThrottle={16}
        shouldActivateOnStart
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator
        style={{ margin: "auto" }}
        renderItem={({ item, index }) => (
          <ProfileCard
            profile={item}
            onLike={() => handleLike(item.id)}
            onDislike={() => handleDislike(item.id)}
            scrollToIndex={() => scrollToIndex(index)}
          />
        )}
      />
    </View>
  );
};

export default ProfileList;
