import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#000",
          contentStyle: { backgroundColor: "#f3f3f3" },
        }}
      />
    </Provider>
  );
}
