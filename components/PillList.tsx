import { FC } from "react";
import { FlatList, StyleSheet, View, ViewProps } from "react-native";
import { Pill } from "./Pill";
import { ThemedText } from "./ThemedText";

export interface PillListProps extends ViewProps {
  data: string[];
  title: string;
  pillColor: string;
}

export const PillList: FC<PillListProps> = ({ pillColor, data, title }) => {
  return (
    <View style={{ paddingHorizontal: 14, marginVertical: 6 }}>
      <ThemedText style={styles.subtitle}>{title}</ThemedText>
      <FlatList
        data={data}
        renderItem={({ item }) => <Pill pillColor={pillColor}>{item}</Pill>}
        keyExtractor={(item, index) => `${index}`}
        style={styles.pillRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pillRow: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    maxWidth: "100%",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
