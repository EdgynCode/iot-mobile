import React, { useState, useLayoutEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
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
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { createAssignment } from "../redux/actions/assignment.action";
import { useClassSessionData } from "../hooks/useClassSessionData";
import RNPickerSelect from "react-native-picker-select";

const CreateAssignment = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [selectedSession, setSelectedSession] = useState("");
  const { sessions } = useClassSessionData();

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        console.log("File picked successfully:", pickedFile);
        setFile(pickedFile); // Save just the asset
      } else {
        console.log("File pick cancelled or no file selected:", result);
      }
    } catch (error) {
      console.error("DocumentPicker error:", error);
      Alert.alert("Lỗi", "Không thể chọn file!\n" + (error?.message || ""));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (!title.trim()) {
      Alert.alert("Lỗi", "Tên bài tập không được để trống!");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Lỗi", "Mô tả không được để trống!");
      setLoading(false);
      return;
    }
    if (!dueDate.trim()) {
      Alert.alert("Lỗi", "Hạn nộp bài không được để trống!");
      setLoading(false);
      return;
    }
    if (!selectedSession) {
      Alert.alert("Lỗi", "Vui lòng chọn buổi học!");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("classSessionId", selectedSession);
    if (file) {
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
      });
    }

    dispatch(createAssignment(formData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo bài tập thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Error creating assignment:", formData);
        Alert.alert("Lỗi", "Tạo bài tập thất bại!");
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
  }, [navigation, title]);

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
        <Text style={styles.label}>Tên bài tập</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Tên bài tập"
        />
        <Text style={styles.label}>Buổi học</Text>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedSession(itemValue)}
          items={sessions.map((s) => {
            return {
              key: s.id,
              label: s.startTime,
              value: s.id,
            };
          })}
          style={{
            ...pickerSelectStyles,
            inputIOS: { ...pickerSelectStyles.inputIOS },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
            },
          }}
          value={selectedSession}
        />
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input}
          placeholder="Mô tả"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Hạn nộp bài</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Text style={styles.label}>File</Text>
        <TouchableOpacity style={styles.fileButton} onPress={handleFilePick}>
          <Text style={{ color: "white" }}>
            {file
              ? file.name
                ? file.name
                : file.assets && file.assets[0] && file.assets[0].name
                ? file.assets[0].name
                : file.uri
                ? file.uri.split("/").pop()
                : "Chọn file"
              : "Chọn file"}
          </Text>
        </TouchableOpacity>
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
  fileButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
});

export default CreateAssignment;
