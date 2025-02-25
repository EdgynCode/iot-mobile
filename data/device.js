import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const deviceListAction = () => [
  {
    title: "Thêm loại thiết bị",
    onClick: (openModal) => {
      openModal();
    },
  },
  {
    title: "Xóa loại thiết bị",
    onClick: (openModal) => {
      openModal();
    },
  },
];
export const deviceListColumns = (navigate) => [
  {
    title: "Tên loại thiết bị",
    dataIndex: "tenLoaiThietBi",
    key: "tenLoaiThietBi",
    render: (text, record) => (
      <TouchableOpacity onPress={() => navigate(`/devices/${record.id}`)}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
  {
    title: "Ghi chú",
    dataIndex: "ghiChu",
    key: "ghiChu",
    render: (text, record) => (
      <TouchableOpacity onPress={() => navigate(`/devices/${record.id}`)}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
];
