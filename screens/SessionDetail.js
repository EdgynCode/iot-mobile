import React, { useState, useCallback, useLayoutEffect, useMemo } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useClassSessionData } from "../hooks/useClassSessionData";
import { getAllClassSessions } from "../redux/actions/classSession.action";
import dayjs from "dayjs";

const extractMiddleCode = (id) => {
  if (!id) return "";
  const parts = id.split("-");
  if (parts.length < 2) return id;
  const rest = parts.slice(1).join("");
  return rest.substring(0, 12);
};

const SessionDetail = () => {
  const route = useRoute();
  const { sessionID } = route.params;

  const dispatch = useDispatch();
  const { sessions, loading, error } = useClassSessionData();

  const [sessionData, setSessionData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllClassSessions());
    }, [dispatch])
  );

  useLayoutEffect(() => {
    if (sessions && sessionID) {
      const foundSession = sessions.find((s) => s.id === sessionID);
      setSessionData(foundSession || null);
    }
  }, [sessions, sessionID]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  if (error)
    return <Text style={styles.errorText}>Đã xảy ra lỗi: {error}</Text>;
  if (!sessionData)
    return <Text style={styles.errorText}>Không tìm thấy buổi học.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chi tiết buổi học</Text>

      <Text style={styles.item}>
        Ngày học: {dayjs(sessionData.startTime).format("DD/MM/YYYY")}
      </Text>
      <Text style={styles.item}>
        Mã buổi học: {extractMiddleCode(sessionData.id)}
      </Text>
      <Text style={styles.item}>Mã lớp học: {sessionData.lopHocId}</Text>

      <Text style={styles.item}>
        Thời gian: {dayjs(sessionData.startTime).format("HH:mm")} -{" "}
        {dayjs(sessionData.endTime).format("HH:mm")}
      </Text>

      {sessionData.labIds && sessionData.labIds.length > 0 ? (
        sessionData.labIds.map((name, index) => (
          <Text key={index} style={styles.item}>
            Bài thực hành: {name}
          </Text>
        ))
      ) : (
        <Text style={styles.labItem}>Không có phòng lab nào.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  item: {
    fontSize: 16,
    color: "#34495e",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  labItem: {
    fontSize: 15,
    marginLeft: 20,
    color: "#7f8c8d",
    marginTop: 4,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SessionDetail;
