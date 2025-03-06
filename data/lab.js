import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const labColumns = (navigate) => [
  {
    title: "Tên bài tập",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <TouchableOpacity
        onPress={() => {
          navigate(`/lab-detail/${record.id}`, { state: { record } });
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
];
