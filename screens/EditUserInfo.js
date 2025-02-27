import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Card, Title, Button, Divider } from "react-native-paper";
import { useUserData } from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { formatFieldName } from "../data/userInfo";
import { updateUserInfo } from "../redux/actions/auth.action";

const EditUserInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useUserData();
  const [originalEmail, setOriginalEmail] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      const filteredUserData = Object.entries(user).filter(
        ([key]) => formatFieldName(key) !== key
      );
      const userDataObject = Object.fromEntries(filteredUserData);
      setUserData(userDataObject);
      setOriginalEmail(user.email);
    }
  }, [user]);

  const handleUpdate = (requestBody) => {
    dispatch(updateUserInfo(requestBody))
      .unwrap()
      .then(() => {
        Alert.alert("Cập nhật thông tin thành công!");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Cập nhật thông tin thất bại!");
      });
  };

  const handleSave = () => {
    const reverseFieldMapping = Object.fromEntries(
      Object.entries(userData).map(([key]) => [formatFieldName(key), key])
    );

    const requestBody = {
      id: user.id,
      firstName: userData[reverseFieldMapping["Họ"]],
      lastName: userData[reverseFieldMapping["Tên"]],
      gender: userData[reverseFieldMapping["Giới tính"]],
      email: userData[reverseFieldMapping["Email"]],
      phoneNumber: userData[reverseFieldMapping["Số điện thoại"]],
      doB: userData[reverseFieldMapping["Ngày sinh"]],
    };
    if (userData[reverseFieldMapping["Email"]] === originalEmail) {
      delete requestBody.email;
    }
    handleUpdate(requestBody);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.center}>
          <Image
            source={require("../assets/default.png")}
            style={styles.avatar}
          />
          <Title>{user?.userName || "User"}</Title>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.titleContainer}>
          <Card.Title
            title="Sửa thông tin tài khoản"
            titleStyle={styles.cardTitle}
          />
        </View>
        <Divider />
        <Card.Content>
          {Object.entries(userData).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{formatFieldName(key)}:</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) =>
                  setUserData({ ...userData, [key]: text })
                }
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.button} onPress={handleSave}>
        Lưu thay đổi
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
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
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

export default EditUserInfo;
