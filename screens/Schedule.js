import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useClassSessionData } from "../hooks/useClassSessionData";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg1",
    "Thg2",
    "Thg3",
    "Thg4",
    "Thg5",
    "Thg6",
    "Thg7",
    "Thg8",
    "Thg9",
    "Thg10",
    "Thg11",
    "Thg12",
  ],
  dayNames: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
};
LocaleConfig.defaultLocale = "vi";

const Schedule = () => {
  const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));
  const { sessions } = useClassSessionData();

  const markedDates = sessions.reduce((acc, session) => {
    const date = dayjs(session.startTime).format("YYYY-MM-DD");
    acc[date] = { marked: true, dotColor: "#003366" };
    return acc;
  }, {});

  markedDates[selected] = {
    ...markedDates[selected],
    selected: true,
    selectedColor: "blue",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Calendar
        theme={{
          calendarBackground: "#fff",
          textSectionTitleColor: "black",
          selectedDayBackgroundColor: "#003366",
          selectedDayTextColor: "white",
          todayTextColor: "red",
          dayTextColor: "black",
          monthTextColor: "black",
          arrowColor: "black",
        }}
        markingType="dot"
        markedDates={markedDates}
        onDayPress={(day) => setSelected(day.dateString)}
      />

      {sessions.some(
        (session) => dayjs(session.startTime).format("YYYY-MM-DD") === selected
      ) && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>
            Buôi học ngày {dayjs(selected).format("DD/MM/YYYY")}
          </Text>
          {sessions
            .filter(
              (session) =>
                dayjs(session.startTime).format("YYYY-MM-DD") === selected
            )
            .map((session, index) => (
              <Text key={index} style={styles.eventItem}>
                Giờ bắt đầu: {dayjs(session.startTime).format("HH:mm")}
                {"\n"}
                Giờ kết thúc: {dayjs(session.endTime).format("HH:mm")}
                {"\n"}
                Tên Wi-Fi Hotspot: {session.wifiHotspot}
              </Text>
            ))}
        </View>
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  eventContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#003366",
  },
  eventItem: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 2,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 50,
  },
});

export default Schedule;
