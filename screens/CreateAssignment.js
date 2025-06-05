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
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const CreateAssignment = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDueDate, setAssignmentDueDate] = useState("");
  const [assignmentFile, setAssignmentFile] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (!assignmentName.trim()) {
      Alert.alert("Lỗi", "Tên bài tập không được để trống!");
      return;
    }
    const assignmentData = {
      assignmentName: assignmentName,
      assignmentDescription: assignmentDescription,
      assignmentDueDate: assignmentDueDate,
      assignmentFile: assignmentFile,
    };
    dispatch(createAssignment(assignmentData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo bài tập thành công!");
        navigation.goBack();
      })
      .catch((error) => {
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
  }, [navigation, assignmentName]);

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
          value={assignmentName}
          onChangeText={setAssignmentName}
          placeholder="Tên bài tập"
        />
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input}
          placeholder="Mô tả"
          value={assignmentDescription}
          onChangeText={setAssignmentDescription}
        />
        <Text style={styles.label}>Hạn nộp bài</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={assignmentDueDate}
          onChangeText={setAssignmentDueDate}
        />
        <Text style={styles.label}>File</Text>
        <TextInput
          style={styles.input}
          placeholder="File"
          value={assignmentFile}
          onChangeText={setAssignmentFile}
        />
      </KeyboardAvoidingView>
    </View>
  );
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
});

export default CreateAssignment;
