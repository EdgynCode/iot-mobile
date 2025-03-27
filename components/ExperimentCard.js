import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ExperimentCard = ({ cardKey, data, onEdit, onDelete, onShow }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <View key={cardKey} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{`Thí nghiệm: ${data.tenThiNghiem}`}</Text>
        <Text style={styles.description}>{`Ngày tạo: ${formatDate(
          data.ngayTao
        )}`}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(data)}>
            <Ionicons name="pencil" size={24} color="#003366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(data.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShow(data)}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ExperimentCard;
