import React, { useState, useEffect } from "react";
import ListDetail from "../components/ListDetail";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDeviceData } from "../hooks/useDeviceData";
import { deviceAction, deviceColumns } from "../data/device";

const Devices = ({ route }) => {
  const { id } = route.params;
  const { devices, loading } = useDeviceData(id);
  const actions = deviceAction();
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : (
          <ListDetail data={devices} column={deviceColumns()} />
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
});

export default Devices;
