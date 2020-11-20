import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../assets/colors.jsx";

export default function Set(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.listItem}>{props.node.displayScore}</Text>
    </View>
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
