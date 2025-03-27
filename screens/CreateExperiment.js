import React, { useState, useLayoutEffect } from "react";
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
import { useDispatch } from "react-redux";
import { createExperiment } from "../redux/actions/experiment.action";
import { Ionicons } from "@expo/vector-icons";

const CreateExperiment = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tenThiNghiem, setTenThiNghiem] = useState("");
  const [moTaThiNghiem, setMoTaThiNghiem] = useState("");
  const [pathImage, setPathImage] = useState("");
  const [ghiChu, setGhiChu] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (!tenThiNghiem.trim() || !pathImage.trim()) {
      Alert.alert(
        "Lỗi",
        "Tên thí nghiệm và đường dẫn ảnh không được để trống!"
      );
      return;
    }
    const expData = {
      tenThiNghiem: tenThiNghiem,
      moTaThiNghiem: moTaThiNghiem,
      pathImage: pathImage,
      ghiChu: ghiChu,
      labId: id,
    };
    dispatch(createExperiment(expData))
      .unwrap()
      .then(() => {
        Alert.alert("Tạo thí nghiệm thành công!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Tạo thí nghiệm thất bại!");
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
  }, [navigation, tenThiNghiem, moTaThiNghiem, pathImage, ghiChu, id]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#f7f7f7" />
        </View>
      )}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.label}>Tên thí nghiệm</Text>
        <TextInput
          style={styles.input}
          value={tenThiNghiem}
          onChangeText={setTenThiNghiem}
          placeholder="Tên bài lab"
        />
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.input}
          value={moTaThiNghiem}
          onChangeText={setMoTaThiNghiem}
          placeholder="Mô tả"
          multiline
          numberOfLines={3}
        />
        <Text style={styles.label}>Đường dẫn ảnh</Text>
        <TextInput
          style={styles.input}
          value={pathImage}
          onChangeText={setPathImage}
          placeholder="Link ảnh"
        />
      </ScrollView>
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

export default CreateExperiment;
