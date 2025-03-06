import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { createLab } from "../redux/actions/lab.action";
import { Ionicons } from "@expo/vector-icons";

const CreateLab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [pathImage, setPathImage] = useState("");

  const handleSave = async () => {
    const labData = {
      name: name,
      pathImage: pathImage,
    };
    console.log("Lab Data:", labData);
    dispatch(createLab(labData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo bài lab thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Tạo bài lab thất bại!");
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
    <View style={styles.container}>
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
    </View>
  );
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

export default CreateLab;
