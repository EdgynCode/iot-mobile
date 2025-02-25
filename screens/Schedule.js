import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
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
          textSectionTitleColor: "black",
          selectedDayBackgroundColor: "#003366",
          selectedDayTextColor: "white",
          todayTextColor: "red",
          dayTextColor: "black",
          monthTextColor: "black",
          arrowColor: "black",
        }}
        markingType={"custom"}
        markedDates={{
          [selected]: { selected: true, selectedColor: "blue" },
        }}
        onDayPress={(day) => setSelected(day.dateString)}
      />
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
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
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
