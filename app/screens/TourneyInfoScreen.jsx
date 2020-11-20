import * as React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { COLORS } from "../assets/colors.jsx";
import EventList from "../components/EventList";

export default function TourneyListScreen({ route, navigation }) {
  function imageBanner() {
    if (
      route.params.info.images === undefined ||
      route.params.info.images.length == 0
    ) {
      return (
        <Image
          style={styles.images}
          source={require("../assets/smash-icon.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={styles.images}
          source={{
            uri: route.params.info.images[0].url,
          }}
        />
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {imageBanner()}
      <View style={styles.tourneyTitleContainer}>
        <Text style={styles.tourneyTitle}>{route.params.info.name}</Text>
      </View>
      <View style={styles.tourneyInfoContainer}>
        <View style={styles.scrollviewContainer}>
          <EventList events={route.params.info.events} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tourneyTitleContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.titleBackground,
  },
  tourneyTitle: {
    fontSize: 30,
    textAlign: "center",
    color: COLORS.titleText,
    fontWeight: "bold",
  },
  images: {
    flex: 2,
    width: null,
    height: null,
    resizeMode: "stretch",
  },
  tourneyInfoContainer: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: COLORS.background,
  },
  scrollview: {
    width: "3%",
  },
  scrollviewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "2%",
  },
});
