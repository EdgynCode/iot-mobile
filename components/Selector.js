import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Selector = ({ title, actions, filters }) => {
  return (
    <>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.filterGroup}>
          {filters
            ? filters.map((filter, index) => (
                <View key={index}>
                  <Button
                    title={filter.label}
                    onPress={() => {}}
                    icon={<AntDesign name="down" size={2} color="black" />}
                  />
                </View>
              ))
            : null}
        </View>
        <View style={styles.buttonGroup}>
          {actions
            ? actions.map((action, index) => (
                <Button
                  key={index}
                  onPress={action.onClick}
                  title={action.title}
                />
              ))
            : null}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: -24,
    marginLeft: -24,
    justifyContent: "space-between",
  },
  container: {
    gap: 8,
    display: "flex",
    justifyContent: "space-between",
  },
  filterGroup: {
    gap: 12,
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    gap: 12,
    display: "flex",
    flexDirection: "column",
  },
});

export default Selector;
