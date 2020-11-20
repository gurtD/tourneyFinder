import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { COLORS } from "../assets/colors.jsx";
import * as WebBrowser from "expo-web-browser";

export default function Event(props) {
  const url = "https://smash.gg/" + props.event.slug;
  handlePress = async () => {
    return await WebBrowser.openBrowserAsync(url);
  };
  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      <View style={styles.container}>
        <Text style={styles.listItem}>{props.event.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "2%",
    justifyContent: "center",
    borderColor: COLORS.background,
    borderBottomWidth: 1.5,
    width: "100%",
    minHeight: 60,
    backgroundColor: COLORS.listEntryBackground,
  },
  listItem: {
    paddingBottom: "3%",
    paddingLeft: "5%",
    paddingTop: "3%",
    borderColor: "green",
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.titleText,
  },
});
