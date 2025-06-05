import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import dayjs from "dayjs";

export const assignmentAction = () => [
  {
    title: "Tạo bài tập",
    onClick: (openModal) => openModal(),
  },
  {
    title: "Xóa bài tập",
    onClick: (openModal) => openModal(),
  },
];

export const assignmentColumns = (navigation) => [
  {
    title: "Tên bài tập",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("", { id: record.id })}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
];
