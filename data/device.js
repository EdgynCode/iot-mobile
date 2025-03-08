import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

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
export const deviceAction = () => [
  {
    title: "Thêm thiết bị",
    onClick: (openModal) => {
      openModal();
    },
  },
];
export const deviceListColumns = (navigation) => [
  {
    title: "Tên loại thiết bị",
    dataIndex: "tenLoaiThietBi",
    key: "tenLoaiThietBi",
    render: (text, record) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Thiết bị", { id: record.id })}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
  {
    title: "Ghi chú",
    dataIndex: "ghiChu",
    key: "ghiChu",
    render: (text, record) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Thiết bị", { id: record.id })}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  },
];
export const deviceColumns = () => [
  {
    title: "Số seri",
    dataIndex: "serialNumber",
    key: "serialNumber",
    render: (text) => (
      <View>
        <Text>{text}</Text>
      </View>
    ),
  },
  {
    title: "Tên thiết bị",
    dataIndex: "tenThietBi",
    key: "tenThietBi",
    render: (text) => (
      <View>
        <Text>{text}</Text>
      </View>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "isTrangThai",
    key: "isTrangThai",
    render: (text) => (
      <View>
        <Text style={{ color: text ? "green" : "red" }}>
          {text ? "Đã kết nối" : "Chưa kết nối"}
        </Text>
      </View>
    ),
  },
  {
    title: "Hạn bảo hành",
    dataIndex: "thoiGianBaoHanh",
    key: "thoiGianBaoHanh",
    render: (text) => (
      <View>
        <Text>{text}</Text>
      </View>
    ),
  },
];
