import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { COLORS } from "../assets/colors.jsx";

export default function TourneyListItem(props) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("TourneyInfo", { info: props.node })
      }
    >
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>{props.node.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    borderColor: COLORS.background,
    borderBottomWidth: 1.5,
    width: "100%",
    minHeight: 20,
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
