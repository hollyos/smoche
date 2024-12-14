import { Profile } from "@/stores/profileStore";
import { FC, useCallback, useEffect, useRef, useState, memo } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Button,
} from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PillList } from "./PillList";
import { ImageGallery } from "./ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown";

// nanoid is not supported on native due to no crypto
// this package adds the support for nanoid
// I removed the nanoid import since it was not being used
// import 'react-native-get-random-values';
// import { nanoid } from 'nanoid';

// I removed this GallerySwiper package since it was interfering with scrollability of the application.
// I was able to achieve similar with the FlatList.
// import GallerySwiper from 'react-native-gallery-swiper';

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
export const ProfileCard: FC<ProfileCardProps> = ({
  profile,
  onLike,
  onDislike,
}) => {
  /**
   * State variable to manage the visibility of additional profile details.
   * Set to true when details are expanded, false otherwise.
   */
  const [detailsVisible, setDetailsVisible] = useState(false);
  const toggleRef = useRef(() => {
    console.log("toggleRef");
    setDetailsVisible((prev) => !prev);
  });

  // Ref to store the measured height of the details section
  const contentHeightRef = useRef<number>(0);

  /**
   * Animation properties for expanding/collapsing profile details.
   * Utilizes `useSharedValue` and `withTiming` for smooth transitions.
   */
  const detailsPaddingBottom = useSharedValue(0);
  const detailsTranslateY = useSharedValue(0);
  const detailsOpacity = useSharedValue(0);

  /**
   * Configuration for animation, specifying easing and duration.
   */
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  /**
   * Animated style for the profile details view.
   * Transforms and adjusts padding based on details visibility state.
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      paddingBottom: detailsPaddingBottom.value,
      transform: [{ translateY: detailsTranslateY.value }],
      opacity: detailsOpacity.value,
    };
  });

  // Handle layout event to measure the content's height
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    contentHeightRef.current = height; // Store the measured height in ref
  }, []);

  /**
   * Effect hook to initialize animation values when `detailsVisible` is toggled.
   * Ensures the expanded details area appears smoothly.
   */
  useEffect(() => {
    if (detailsVisible) {
      detailsPaddingBottom.value = withTiming(
        contentHeightRef.current + 14,
        config,
      );
      detailsTranslateY.value = withTiming(0, config);
      detailsOpacity.value = withTiming(1, config);
    } else {
      detailsPaddingBottom.value = withTiming(0, config);
      detailsTranslateY.value = withTiming(-contentHeightRef.current, config);
      detailsOpacity.value = withTiming(0, config);
    }
  }, [detailsVisible]);

  return (
    <View style={styles.card}>
      {/* <GallerySwiper
        enableScale={false}
        enableTranslate={false}
        images={profile.photos}
        initialPage={0}
        maxOverScrollDistance={0}
        onSingleTapConfirmed={() => {
          setDetailsVisible(!detailsVisible);
        }}
        resizeMode="cover"
        sensitiveScroll={false}
        style={{
          height: 500,
          maxWidth: Platform.OS === 'web' ? 500 : dimensions.screen.width,
          width: dimensions.screen.width
        }}
        scrollViewStyle={{
          backgroundColor: "#FFF",
          height: 500,
          maxHeight: 500,
          maxWidth: Platform.OS === 'web' ? 500 : dimensions.screen.width,
          width: dimensions.screen.width
        }}
      /> */}

      <ImageGallery images={profile.photos} onPress={toggleRef.current} />

      <TouchableOpacity
        onPress={toggleRef.current}
        style={styles.imageContainer}
        hitSlop={{ bottom: 6 }}
      >
        <View style={styles.basicsContainer}>
          <View style={styles.basicsContainerInner}>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.name}>
                {profile.info.name},&nbsp;
                <Text style={styles.age}>{profile.info.age}</Text>
              </Text>

              <View style={{ ...styles.row, ...styles.detailsContainer }}>
                <Text style={styles.details}>{profile.info.type}</Text>
                <Text style={styles.details}>{profile.info.gender}</Text>
                <Text style={styles.details}>{profile.info.sexuality}</Text>
              </View>
            </View>

            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
                height: "100%",
                minHeight: "100%",
              }}
            >
              <TouchableOpacity
                onPress={onDislike}
                style={{ ...styles.button, backgroundColor: "red" }}
              >
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{ outline: "none" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onLike}
                style={{ ...styles.button, backgroundColor: "green" }}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ outline: "none" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.bottomAnimationWrapper, animatedStyles]}>
        <View onLayout={handleContentLayout} style={styles.bottomWrapper}>
          <View style={styles.aboutContainer}>
            <Text style={styles.subtitle}>About</Text>
            <Text style={styles.about}>{profile.info.about}</Text>
          </View>

          <PillList data={profile.info.desires} title="Desires" />
          <PillList data={profile.info.interests} title="Interests" />
        </View>
      </Animated.View>
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
    backgroundColor: "#ffffff",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
    maxWidth: "100%",
    width: 500,
  },

  imageContainer: {
    position: "relative",
  },

  /**
   * Style for the name and age text.
   * Uses bold font for prominence.
   */
  basicsContainer: {
    backgroundColor: "rgba(66,66,66,0.45)",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    shadowColor: "#333",
    shadowOffset: { height: -3, width: 0 },
    shadowOpacity: 0.3,
    width: "100%",
    zIndex: 6,
  },
  basicsContainerInner: {
    alignContent: "stretch",
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "relative",
    width: "100%",
  },
  name: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    textShadowColor: "#333",
    textShadowRadius: 5,
  },
  age: {
    color: "white",
    fontSize: 26,
    textShadowColor: "#333",
    textShadowRadius: 5,
  },

  detailsContainer: {
    marginBottom: 6,
    marginTop: 2,
  },
  details: {
    color: "white",
    fontSize: 20,
    textShadowColor: "#333",
    textShadowRadius: 5,
  },

  bottomAnimationWrapper: {
    position: "relative",
    transformOrigin: "top",
    width: "100%",
    zIndex: -1,
  },

  bottomWrapper: {
    position: "absolute",
    width: "100%",
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
    alignContent: "flex-end",
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    width: "100%",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },

  button: {
    padding: 24,
    cursor: "pointer",
    backgroundColor: "green",
    borderRadius: 100,
  },
});
