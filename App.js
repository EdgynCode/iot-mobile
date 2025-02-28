import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { store } from "./redux/store";
import {
  Login,
  DeviceTypes,
  Schedule,
  Labs,
  Students,
  UserInfo,
  EditUserInfo,
  CreateClassSession,
} from "./screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppMainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Buổi học":
              iconName = focused ? "calendar-clear" : "calendar-clear-outline";
              break;
            case "Học sinh":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Bài thực hành":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Thiết bị":
              iconName = focused ? "hardware-chip" : "hardware-chip-outline";
              break;
            case "Tài khoản":
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
              break;
            default:
              console.log("Invalid route");
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0377BC",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { display: "flex" },
      })}
    >
      <Tab.Screen name="Buổi học" component={Schedule} />
      <Tab.Screen name="Học sinh" component={Students} />
      <Tab.Screen name="Bài thực hành" component={Labs} />
      <Tab.Screen name="Thiết bị" component={DeviceTypes} />
      <Tab.Screen name="Tài khoản" component={UserInfo} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "MainScreen" : "Login"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={AppMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Sửa thông tin" component={EditUserInfo} />
          <Stack.Screen name="Tạo buổi học" component={CreateClassSession} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
