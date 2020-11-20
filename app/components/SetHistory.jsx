import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../assets/colors.jsx";
import Set from "../components/Set.jsx";
import { AUTHS } from "../../auths.jsx";

export default function SetHistory() {
  const SETS = gql`
    query Sets($id: ID!) {
      player(id: $id) {
        id
        sets(perPage: 20, page: 1) {
          nodes {
            id
            displayScore
            winnerId
            event {
              id
              name
              tournament {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

  function getSets() {
    const { loading, error, data } = useQuery(SETS, {
      variables: {
        perPage: 20,
        id: AUTHS.PLAYER_ID,
        page: 1,
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
        style={styles.scrollview}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {data.player.sets.nodes.map((node) => (
          <Set node={node} key={node.id} />
        ))}
      </ScrollView>
    );
  }
  return <View style={styles.container}>{getSets()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  scrollview: {
    width: "98%",
  },
  noEventsText: {
    color: COLORS.titleText,
    fontSize: 17,
    fontWeight: "bold",
  },
});
