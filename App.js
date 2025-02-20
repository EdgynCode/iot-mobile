import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./redux/store";
import Login from "./screens/Login";
import Schedule from "./screens/Schedule";
import Labs from "./screens/Labs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Buổi học" component={Schedule} /> */}
          <Stack.Screen name="Bài thực hành" component={Labs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
