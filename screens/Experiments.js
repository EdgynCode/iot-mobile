import React, { useCallback, useLayoutEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import ExperimentCard from "../components/ExperimentCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useExperimentData } from "../hooks/useExperimentData";
import {
  getExperimentsByLabId,
  deleteExperiments,
} from "../redux/actions/experiment.action";

const Experiments = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const { experiments, loading } = useExperimentData(id);

  useFocusEffect(
    useCallback(() => {
      dispatch(getExperimentsByLabId(id));
    }, [dispatch])
  );

  const handleEdit = (experiment) => {
    navigation.navigate("Sửa thí nghiệm", { experiment });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa thí nghiệm này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            dispatch(deleteExperiments([id]))
              .unwrap()
              .then(() => {
                Alert.alert("Xóa thí nghiệm thành công!");
                navigation.goBack();
              })
              .catch((error) => {
                Alert.alert("Lỗi", "Xóa thí nghiệm thất bại!");
                console.log(error);
              });
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleShow = (data) => {
    // Handle show action
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tạo thí nghiệm", { id: id });
          }}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#003366" />
      ) : (
        experiments.map((data, index) => (
          <ExperimentCard
            cardKey={index}
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShow={handleShow}
          ></ExperimentCard>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  card: {
    width: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addButton: {
    backgroundColor: "#003366",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default Experiments;
