import React, { useState, useCallback, useLayoutEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListDetail from "../components/ListDetail";
import { useLabData } from "../hooks/useLabData";
import { labColumns } from "../data/lab";
import { getAllLabs } from "../redux/actions/lab.action";

const Labs = ({ navigation }) => {
  const dispatch = useDispatch();
  const { labs, loading } = useLabData();

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllLabs());
    }, [dispatch])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tạo bài thực hành");
          }}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : (
          <ListDetail data={labs} column={labColumns()} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#003366",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default Labs;
