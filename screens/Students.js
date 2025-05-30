import React, { useState, useLayoutEffect } from "react";
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
import { useStudentData } from "../hooks/useStudentData";
import { studentAction, studentColumns } from "../data/student";

const Students = ({ navigation }) => {
  const { students, loading } = useStudentData();
  const [open, setOpen] = useState(false);
  const actions = studentAction();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {}} style={styles.exportButton}>
          <Ionicons name="archive-outline" size={24} color="white" />
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
          <ListDetail data={students} column={studentColumns()} />
        )}
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tác vụ</Text>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalButton}
                onPress={() => {
                  action.onClick(setOpen);
                }}
              >
                <Text style={styles.modalButtonText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  exportButton: {
    backgroundColor: "#003366",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  importButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 50,
  },
});

export default Students;
