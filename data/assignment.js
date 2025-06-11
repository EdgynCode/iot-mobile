import { Text, TouchableOpacity } from "react-native";

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
