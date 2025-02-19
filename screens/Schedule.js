import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Selector from "../components/Selector";
import dayjs from "dayjs";
//import ScheduleModal from "../components/schedule/ScheduleModal";
import { useClassSessionData } from "../hooks/useClassSessionData";
import { scheduleAction, getListData } from "../data/schedule";

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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));
  const { sessions } = useClassSessionData();

  const renderDateCell = (day) => {
    const listData = getListData(day, sessions);
    return (
      <FlatList
        data={listData}
        keyExtractor={(item) => item.content}
        renderItem={({ item }) => (
          <Text style={{ color: item.type === "warning" ? "red" : "black" }}>
            {item.content}
          </Text>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Selector actions={scheduleAction(setOpen)} />
      <Calendar
        markedDates={{
          [selected]: { selected: true, selectedColor: "blue" },
        }}
        onDayPress={(day) => setSelected(day.dateString)}
        theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "red",
        }}
      />
      <View style={{ marginTop: 20 }}>{renderDateCell(selected)}</View>
      {/* <ScheduleModal open={open} setOpen={setOpen} selected={selected} /> */}
    </View>
  );
};

export default Schedule;
