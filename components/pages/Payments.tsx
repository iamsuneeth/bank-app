import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

export const Payments = ({
  navigation
}: {
  navigation: NavigationStackProp<{}>;
}) => {
  console.log(navigation.state.params.accountId);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
