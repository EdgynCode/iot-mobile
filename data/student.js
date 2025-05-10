import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const studentAction = () => [
  {
    title: "Xuất dữ liệu",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Hủy",
    onClick: (setOpen) => {
      setOpen(false);
    },
  },
];
export const studentColumns = (navigate) => [
  {
    title: "Họ tên",
    dataIndex: ["firstName", "lastName"],
    key: "fullName",
    render: (_, record) => (
      // <TouchableOpacity
      //   onClick={() => navigate(`/student-detail/${record.id}`)}
      // >
      //   <Text>
      //     {record.firstName} {record.lastName}
      //   </Text>
      // </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          {record.firstName} {record.lastName}
        </Text>
      </TouchableOpacity>
    ),
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    filters: [
      {
        text: "Nam",
        value: "Nam",
      },
      {
        text: "Nữ",
        value: "Nữ",
      },
    ],
    filterMode: "tree",
    onFilter: (value, record) => record.gender.includes(value),
  },
];
