import React, { useState, useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useClassSessionData } from "../hooks/useClassSessionData";
import { getAllClassSessions } from "../redux/actions/classSession.action";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

// Cấu hình tiếng Việt cho lịch
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

const Schedule = ({ navigation }) => {
  const dispatch = useDispatch();
  const { sessions } = useClassSessionData();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tạo buổi học", { selectedDate });
          }}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedDate]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllClassSessions());
    }, [dispatch])
  );

  const markedDates = sessions.reduce((acc, session) => {
    const date = dayjs(session.startTime).format("YYYY-MM-DD");
    acc[date] = { marked: true, dotColor: "#003366" };
    return acc;
  }, {});

  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
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
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      {sessions.some(
        (session) =>
          dayjs(session.startTime).format("YYYY-MM-DD") === selectedDate
      ) && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>
            Buổi học ngày {dayjs(selectedDate).format("DD/MM/YYYY")}
          </Text>

          <ScrollView style={{ maxHeight: 300 }}>
            {sessions
              .filter(
                (session) =>
                  dayjs(session.startTime).format("YYYY-MM-DD") === selectedDate
              )
              .map((session, index) => (
                <View key={index} style={styles.sessionBox}>
                  <Text style={styles.eventItem}>
                    Giờ bắt đầu: {dayjs(session.startTime).format("HH:mm")}
                    {"\n"}
                    Giờ kết thúc: {dayjs(session.endTime).format("HH:mm")}
                    {"\n"}
                    Tên Wi-Fi Hotspot: {session.wifiHotspot}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() =>
                      navigation.navigate("Chi tiết buổi học", {
                        sessionID: session.id,
                        selectedDate: selectedDate,
                        session,
                      })
                    }
                  >
                    <Text style={styles.Button}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
      )}
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
  sessionBox: {
    marginBottom: 15,
    paddingBottom: 50,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  eventItem: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 2,
  },
  addButton: {
    backgroundColor: "#003366",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  detailButton: {
    backgroundColor: "white",
    padding: 5,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 3,
  },
  Button: {
    fontWeight: "bold",
    color: "#003366",
  },
});

export default Schedule;
