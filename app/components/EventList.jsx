import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { COLORS } from "../assets/colors.jsx";
import Event from "../components/Event.jsx";

export default function EventList(props) {
  if (props.events === null || props.events == 0) {
    return <Text style={styles.noEventsText}>No events to display :(</Text>;
  } else {
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {props.events.map((event) => (
          <Event event={event} key={event.id} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    width: "90%",
  },
  noEventsText: {
    color: COLORS.titleText,
    fontSize: 17,
    fontWeight: "bold",
  },
});
