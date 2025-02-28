import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { Card, Title, Button, Divider } from "react-native-paper";
import { useUserData } from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { formatFieldName } from "../data/userInfo";
import { logout, getCurrentUser } from "../redux/actions/auth.action";

const UserInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useUserData();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredUserData = Object.entries(user).filter(
        ([key]) => formatFieldName(key) !== key
      );
      setUserData(filteredUserData);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCurrentUser());
    }, [dispatch])
  );

  const handleAlertLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: handleLogout,
      },
    ]);
  };

  const handleLogout = async () => {
    setLoading(true);

    dispatch(logout())
      .unwrap()
      .then(() => {
        Alert.alert("Đăng xuất thành công");
        navigation.navigate("Login");
      })
      .catch(() => {
        Alert.alert("Đăng xuất thất bại. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.center}>
          <Image
            source={require("../assets/default.png")}
            style={styles.avatar}
          />
          <Title>{user?.firstName + " " + user?.lastName || "User"}</Title>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.titleContainer}>
          <Card.Title title="Thông tin cơ bản" titleStyle={styles.cardTitle} />
        </View>
        <Divider />
        <Card.Content>
          {userData.map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{formatFieldName(key)}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("Sửa thông tin")}
      >
        Chỉnh sửa thông tin
      </Button>
      <Button
        mode="contained"
        style={styles.logOutButton}
        onPress={handleAlertLogout}
      >
        Đăng xuất
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    backgroundColor: "#003366",
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  center: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  infoCard: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    flex: 1.5,
    fontWeight: "bold",
    paddingRight: 10,
  },
  value: {
    flex: 2,
    textAlign: "left",
  },
  cardTitle: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
  },
  button: {
    margin: 10,
    backgroundColor: "#0D47A1",
  },
  logOutButton: {
    margin: 10,
    backgroundColor: "red",
  },
});

export default UserInfo;
