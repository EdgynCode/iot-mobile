import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const studentAction = () => [
  {
    title: "Thêm danh sách học sinh",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Xuất dữ liệu",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
];
export const studentColumns = (navigate) => [
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => (
      <TouchableOpacity
        onClick={() => navigate(`/student-detail/${record.id}`)}
      >
        <Text>{text}</Text>
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
  {
    title: "Lớp",
    dataIndex: "nguoiHocLopHocs",
    key: "nguoiHocLopHocs",
    render: (text) => (
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
  {
    title: "Chức vụ",
    dataIndex: "role",
    key: "role",
    filters: [
      {
        text: "Lớp trưởng",
        value: "Lớp trưởng",
      },
      {
        text: "Lớp phó",
        value: "Lớp phó",
      },
      {
        text: "Học sinh",
        value: "",
      },
    ],
    filterMode: "tree",
    onFilter: (value, record) => record.role.includes(value),
  },
];
