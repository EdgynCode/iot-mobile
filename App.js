import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Login,
  DeviceTypes,
  Devices,
  Schedule,
  Labs,
  Experiments,
  CreateExperiment,
  EditExperiment,
  CreateLab,
  Students,
  UserInfo,
  EditUserInfo,
  CreateClassSession,
  SessionDetail,
  EditClassSession,
} from "./screens";
import { enableScreens } from "react-native-screens";

enableScreens();

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
            case "Loại thiết bị":
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
      <Tab.Screen name="Loại thiết bị" component={DeviceTypes} />
      <Tab.Screen name="Tài khoản" component={UserInfo} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await SecureStore.getItemAsync("user");
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "MainScreen" : "Login"}
          >
            {/* <Stack.Navigator initialRouteName={"MainScreen"}> */}
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
            <Stack.Screen name="Bài thí nghiệm" component={Experiments} />
            <Stack.Screen name="Tạo bài thực hành" component={CreateLab} />
            <Stack.Screen name="Tạo thí nghiệm" component={CreateExperiment} />
            <Stack.Screen name="Sửa thí nghiệm" component={EditExperiment} />
            <Stack.Screen name="Thiết bị" component={Devices} />
            <Stack.Screen name="Chi tiết buổi học" component={SessionDetail} />
            <Stack.Screen
              name="Chỉnh sửa buổi học "
              component={EditClassSession}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
