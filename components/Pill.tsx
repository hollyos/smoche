import { FC } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

export const Pill: FC<ViewProps> = ({ children, ...props }) => (
  <View {...props} style={{ ...styles.pillContainer }}>
    <Text style={styles.pillText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: "#ACACAC",
    borderColor: "#333",
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
    shadowColor: "#333",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
