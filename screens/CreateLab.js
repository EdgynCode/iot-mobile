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
import { createLab } from "../redux/actions/lab.action";
import { Ionicons } from "@expo/vector-icons";

const CreateLab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [pathImage, setPathImage] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (!name.trim() || !pathImage.trim()) {
      Alert.alert("Lỗi", "Tên bài lab và đường dẫn ảnh không được để trống!");
      return;
    }
    const labData = {
      name: name,
      pathImage: pathImage,
    };
    dispatch(createLab(labData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo bài lab thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Tạo bài lab thất bại!");
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
  }, [navigation, name, pathImage]);

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
        <Text style={styles.label}>Tên bài lab</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Tên bài lab"
        />
        <Text style={styles.label}>Đường dẫn ảnh</Text>
        <TextInput
          style={styles.input}
          value={pathImage}
          onChangeText={setPathImage}
          placeholder="Link ảnh"
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

export default CreateLab;
