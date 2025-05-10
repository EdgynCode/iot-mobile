import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useClassroomData } from "../hooks/useClassroomData";
import { useLabData } from "../hooks/useLabData";
import { useUserData } from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { createClassSession } from "../redux/actions/classSession.action";
import { Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";

moment.locale("vi");

const CreateClassSession = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    route.params.selectedDate || dayjs().format("YYYY-MM-DD")
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedLabs, setSelectedLabs] = useState([]);
  const { classrooms } = useClassroomData();
  const { labs } = useLabData();
  const { user } = useUserData();

  const handleSave = async () => {
    setLoading(true);
    const currentUser = user;
    const id = currentUser.id;
    const sessionId = uuidv4();

    const sessionData = {
      id: sessionId,
      lopHocId: selectedClass,
      nguoiDayId: id,
      startTime: moment(`${selectedDate} ${startTime}`).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      endTime: moment(`${selectedDate} ${endTime}`).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      wifiHotspot: "IOT-Hotspot",
      brokerAddress: "iot.eclipse.org",
      port: 1883,
      clientId: uuidv4(),
      labIds: [selectedLabs],
    };
    dispatch(createClassSession(sessionData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo buổi học thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Tạo buổi học thất bại!");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Ionicons name="checkmark-done-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    selectedDate,
    startTime,
    endTime,
    selectedClass,
    selectedLabs,
  ]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#f7f7f7" />
        </View>
      )}
      <KeyboardAvoidingView
        style={styles.scrollContainer}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <Text style={styles.label}>Ngày bắt đầu</Text>
        <TextInput
          style={styles.input}
          value={selectedDate}
          onChangeText={setSelectedDate}
        />
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
          items={classrooms.map((classroom) => {
            return {
              key: classroom.id,
              label: classroom.tenLop,
              value: classroom.id,
            };
          })}
          style={{
            ...pickerSelectStyles,
            inputIOS: { ...pickerSelectStyles.inputIOS },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
            },
          }}
          value={selectedClass}
        />
        <Text style={styles.label}>Bài thực hành</Text>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedLabs(itemValue)}
          items={labs.map((lab) => {
            return {
              key: lab.id,
              label: lab.name,
              value: lab.id,
            };
          })}
          style={{
            ...pickerSelectStyles,
            inputIOS: { ...pickerSelectStyles.inputIOS },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
            },
          }}
          value={selectedLabs}
        />
      </KeyboardAvoidingView>
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
    background: "#f7f7f7",
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
    text: "black",
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

export default CreateClassSession;
