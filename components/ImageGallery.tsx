import { FC, memo, useCallback, useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Photo } from "../stores/profileStore";

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
  const MemoizedImage = memo(({ item }: { item: Photo }) => (
    <View style={{ backgroundColor: "white", height: 500, width: 500, maxWidth: dimensions.screen.width }}>
      <Image
        source={{ uri: item.url }}
        style={{
          height: 500,
          left: 0,
          maxWidth: dimensions.screen.width,
          resizeMode: "cover",
          top: 0,
          width: 500,
        }}
      />
    </View>
  ));

  /**
   * renderItem is wrapped with useCallback with no dependencies, so it will never change once set.
   * This is to prevent re-rendering of the image on scroll.
   */
  const renderItem = useCallback(
    ({ item }: { item: { url: string; height: number; width: number } }) => (
      <TouchableWithoutFeedback onPress={onPress}>
        <MemoizedImage item={item} />
      </TouchableWithoutFeedback>
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
