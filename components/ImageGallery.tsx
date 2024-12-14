import { Photo } from "../stores/profileStore";
import { FC, memo, useEffect, useCallback, useState, useRef } from "react";
import { Dimensions, View, Image } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

export interface ImageGalleryProps {
  images: Photo[];
  onPress: () => void;
}
/**
 * ImageGallery component to display a list of images in a horizontal scroll view.
 *
 * @param images - An array of objects containing image details.
 * @param onPress - A function to handle the press event on an image.
 * @returns A React component that renders the image gallery.
 */

export const ImageGallery: FC<ImageGalleryProps> = ({ images, onPress }) => {
  const windowDimensions = Dimensions.get("window");
  const screenDimensions = Dimensions.get("screen");
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  /**
   * Effect hook to handle dimension changes dynamically.
   * Updates state when screen or window dimensions change.
   */
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  }, []);

  /**
   * Memoized image component to prevent re-rendering of the image on scroll.
   */
  const MemoizedImage = memo(
    ({ item }: { item: Photo }) => (
      <View style={{ backgroundColor: "white", height: 500, width: 500 }}>
        <Image
          source={{ uri: item.url }}
          style={{
            width: 500,
            height: 500,
            resizeMode: "cover",
            maxWidth: dimensions.screen.width,
            top: 0,
            left: 0,
          }}
        />
      </View>
    ),
  );

  /**
   * renderItem is wrapped with useCallback with no dependencies, so it will never change once set.
   * This is to prevent re-rendering of the image on scroll.
   */
  const renderItem = useCallback(
    ({ item }: { item: { url: string; height: number; width: number } }) => (
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <MemoizedImage item={item} />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        decelerationRate="fast"
        removeClippedSubviews={false}
        scrollEnabled
        maxToRenderPerBatch={1}
        windowSize={3}
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}${item.url}`}
        renderItem={renderItem}
      />
    </View>
  );
};
