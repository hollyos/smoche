import { FC } from "react";
import { FlatList, StyleSheet, Text, View, ViewProps } from "react-native";
import { Pill } from "./Pill";

export interface PillListProps extends ViewProps {
  data: any[];
  title: string;
}

export const PillList: FC<PillListProps> = ({ data, title }) => {
  return (
    <View style={{ paddingHorizontal: 14, marginVertical: 6 }}>
      <Text style={styles.subtitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Pill>{item}</Pill>}
        keyExtractor={(item) => item}
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
