import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import ListDetail from "../components/ListDetail";
import { labAction, labColumns, labFilter } from "../data/lab";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useLabData } from "../hooks/useLabData";

const Labs = () => {
  const navigation = useNavigation();
  const { labs: labData } = useLabData();

  return (
    <>
      <View style={{ flex: 1, padding: 16 }}>
        <ListDetail data={labData} />
      </View>
    </>
  );
};

export default Labs;
