import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ScrollView,
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
    const currentUser = user;
    const id = currentUser.id;
    const sessionId = uuidv4();

    const sessionData = {
      id: sessionId,
      lopHocId: selectedClass,
      nguoiDayId: id,
      startTime: moment(`${selectedDate}T${startTime}`).toISOString(),
      endTime: moment(`${selectedDate}T${endTime}`).toISOString(),
      wifiHotspot: "IOT-Hotspot",
      brokerAddress: "iot.eclipse.org",
      port: 1883,
      clientId: uuidv4(),
      labIds: [selectedLabs],
    };

    console.log("Session Data:", sessionData);

    dispatch(createClassSession(sessionData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo buổi học thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Tạo buổi học thất bại!");
        console.log(error);
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
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
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
    padding: 20,
    background: "#f7f7f7",
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
