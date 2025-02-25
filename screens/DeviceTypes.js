import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListDetail from "../components/ListDetail";
import { useDeviceTypeData } from "../hooks/useDeviceTypeData";
import { deviceListAction, deviceListColumns } from "../data/device";

const DeviceTypes = () => {
  const { deviceTypes } = useDeviceTypeData();
  const [open, setOpen] = useState(false);
  const actions = deviceListAction();

  return (
    <>
      <View style={styles.container}>
        <ListDetail data={deviceTypes} column={deviceListColumns()} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setOpen(true)}>
        <Ionicons name="settings-outline" size={28} color="white" />
      </TouchableOpacity>

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
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
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
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 50,
  },
});

export default DeviceTypes;
