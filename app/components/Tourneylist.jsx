import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import TourneyListItem from "./TourneyListItem.jsx";
import Icon from "react-native-vector-icons/Feather";
import Geocoder from "react-native-geocoding";
import { COLORS } from "../assets/colors.jsx";
import { AUTHS } from "../../auths.jsx";

export default function Tourneylist(props) {
  const [locationSearch, setLocationSearch] = useState("");
  const [locationCoords, setLocationCoords] = useState(
    "33.7454725,-117.86765300000002"
  );

  Geocoder.init(AUTHS.GMAPS_AUTH);

  function handleSearch() {
    console.log("search is running");

    Geocoder.from(locationSearch)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log(location);
        var lat = location.lat.toString();
        var lng = location.lng.toString();

        setLocationCoords(lat.concat(",", lng));
      })
      .catch((error) => console.warn(error));
  }

  const SOCAL_TOURNAMENTS = gql`
    query SocalTournaments(
      $perPage: Int
      $coordinates: String!
      $radius: String!
    ) {
      tournaments(
        query: {
          perPage: $perPage
          filter: {
            location: { distanceFrom: $coordinates, distance: $radius }
          }
        }
      ) {
        nodes {
          id
          name
          city
          rules
          addrState
          events {
            id
            name
            slug
          }
          images {
            id
            url
          }
        }
      }
    }
  `;

  function getTournaments() {
    const { loading, error, data } = useQuery(SOCAL_TOURNAMENTS, {
      variables: {
        perPage: 20,
        coordinates: locationCoords,
        radius: "50mi",
      },
    });

    if (loading)
      return (
        <Icon name="minus" size={30} color="blue" style={{ marginLeft: 15 }} />
      );
    if (error) return <Text>Error :(</Text>;
    console.log(data);

    return (
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {data.tournaments.nodes.map((node) => (
          <TourneyListItem
            node={node}
            navigation={props.navigation}
            key={node.id}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Location"
          placeholderTextColor="#abbabb"
          locationSearch={locationSearch}
          onChangeText={(locationSearch) => setLocationSearch(locationSearch)}
        />
        <TouchableOpacity>
          <Icon
            name="search"
            size={30}
            color={COLORS.titleText}
            style={{ marginLeft: "1%", marginTop: "30%" }}
            onPress={() => handleSearch()}
          />
        </TouchableOpacity>
      </View>
      {getTournaments()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  header: {
    marginTop: "15%",
    fontSize: 20,
    color: "blue",
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "black",
    borderBottomWidth: 1,
    paddingRight: "3%",
    paddingBottom: "3%",
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.titleText,
    paddingLeft: 10,
    minHeight: "3%",
  },
});
