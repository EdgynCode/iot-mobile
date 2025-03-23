import React, { useState } from "react";
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
import { useDeviceTypeData } from "../hooks/useDeviceTypeData";
import { deviceListAction, deviceListColumns } from "../data/device";

const DeviceTypes = ({ navigation }) => {
  const { deviceTypes, loading } = useDeviceTypeData();
  const [open, setOpen] = useState(false);
  const actions = deviceListAction();

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : (
          <ListDetail
            data={deviceTypes}
            column={deviceListColumns(navigation)}
          />
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
