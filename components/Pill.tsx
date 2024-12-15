import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Colors from "../styles/colors";
import { ThemedText } from "./ThemedText";

interface PillProps extends ViewProps {
  pillColor: string;
}

export const Pill: FC<PillProps> = ({ children, pillColor, ...props }) => (
  <View
    {...props}
    style={{ ...styles.pillContainer, backgroundColor: pillColor }}
  >
    <ThemedText>{children}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: Colors.tan,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 4,
    shadowColor: Colors.blue,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
