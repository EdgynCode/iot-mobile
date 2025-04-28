import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { useClassroomData } from "../hooks/useClassroomData";
import { useLabData } from "../hooks/useLabData";
import { useDispatch } from "react-redux";
import { updateClassSession, getAllClassSessions } from "../redux/actions/classSession.action";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";

moment.locale("vi");

const EditClassSession = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { classrooms } = useClassroomData();
  const { labs } = useLabData();
  const session = route.params?.session;
  if (!session) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Không có dữ liệu buổi học để chỉnh sửa!</Text>
      </View>
    );
  }
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(
    moment(session.startTime).format("HH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment(session.endTime).format("HH:mm")
  );
  const [selectedClass, setSelectedClass] = useState(
    Array.isArray(session.lopHocId) ? session.lopHocId[0] : session.lopHocId
  );
  const [selectedLabs, setSelectedLabs] = useState(
    Array.isArray(session.labIds) ? session.labIds[0] : session.labIds
  );

  const handleSave = useCallback(async () => {
    setLoading(true);
    const id = session.nguoiDayId;

    const sessionData = {
      id: session.id,
      lopHocId: selectedClass,
      nguoiDayId: id,
      startTime: moment(session.startTime)
        .set({
          hour: Number(startTime.split(":")[0]),
          minute: Number(startTime.split(":")[1]),
        })
        .format("YYYY-MM-DDTHH:mm:ss"),
      endTime: moment(session.endTime)
        .set({
          hour: Number(endTime.split(":")[0]),
          minute: Number(endTime.split(":")[1]),
        })
        .format("YYYY-MM-DDTHH:mm:ss"),
      wifiHotspot: "IOT-Hotspot",
      brokerAddress: "iot.eclipse.org",
      port: 1883,
      clientId: session.clientId, 
      labIds: [selectedLabs],
    };
    
    console.log("Dữ liệu gửi lên cập nhật:", sessionData);

    dispatch(updateClassSession(sessionData))
      .unwrap()
      .then((result) => {
        dispatch(getAllClassSessions());
        console.log("Kết quả cập nhật:", result);
        Alert.alert("Cập nhật buổi học thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Lỗi cập nhật:", error);
        Alert.alert("Lỗi", "Cập nhật buổi học thất bại!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    session,
    selectedClass,
    selectedLabs,
    startTime,
    endTime,
    dispatch,
    navigation,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Ionicons name="checkmark-done-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#f7f7f7" />
        </View>
      )}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.label}>Giờ bắt đầu</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="HH:mm"
        />
        <Text style={styles.label}>Giờ kết thúc</Text>
        <TextInput
          style={styles.input}
          value={endTime}
          onChangeText={setEndTime}
          placeholder="HH:mm"
        />
        <Text style={styles.label}>Lớp</Text>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          items={classrooms.map((classroom) => ({
            key: classroom.id,
            label: classroom.tenLop,
            value: classroom.id,
          }))}
          style={{
            ...pickerSelectStyles,
            inputIOS: { ...pickerSelectStyles.inputIOS },
            inputAndroid: { ...pickerSelectStyles.inputAndroid },
          }}
          value={selectedClass}
        />
        <Text style={styles.label}>Bài thực hành</Text>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedLabs(itemValue)}
          items={labs.map((lab) => ({
            key: lab.id,
            label: lab.name,
            value: lab.id,
          }))}
          style={{
            ...pickerSelectStyles,
            inputIOS: { ...pickerSelectStyles.inputIOS },
            inputAndroid: { ...pickerSelectStyles.inputAndroid },
          }}
          value={selectedLabs}
        />
      </ScrollView>
    </View>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 5,
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 5,
    backgroundColor: "white",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "green",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default EditClassSession;