import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import ListDetail from "../components/ListDetail";
import { labAction, labColumns, labFilter } from "../data/lab";
import { useDispatch } from "react-redux";
import { useLabData } from "../hooks/useLabData";

const Labs = ({ navigation }) => {
  const { labs } = useLabData();

  return (
    <>
      <View style={{ flex: 1, padding: 16 }}>
        <ListDetail data={labs} column={labColumns(navigation)} />
      </View>
    </>
  );
};

export default Labs;
