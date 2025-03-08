import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const labColumns = (navigation) => [
  {
    title: "Tên bài tập",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Bài thí nghiệm", { id: record.id })}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
];
