import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Selector = ({ actions, filters }) => {
  return (
    <>
      <View style={styles.container}>
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
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonGroup: {
    gap: 12,
    display: "flex",
    flexDirection: "column",
  },
});

export default Selector;
