import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TourneylistScreen from "./app/screens/TourneyListScreen.jsx";
import TourneyInfoScreen from "./app/screens/TourneyInfoScreen.jsx";
import StatsScreen from "./app/screens/StatsScreen.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AUTHS } from "./auths.jsx";

const httpLink = createHttpLink({
  uri: "https://api.smash.gg/gql/alpha",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: AUTHS.APPOLO_AUTH_TOKEN,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const TourneyStack = createStackNavigator();

function TourneyStackScreen() {
  return (
    <TourneyStack.Navigator initialRouteName="TourneyList">
      <TourneyStack.Screen name="TourneyList" component={TourneylistScreen} />
      <TourneyStack.Screen name="TourneyInfo" component={TourneyInfoScreen} />
    </TourneyStack.Navigator>
  );
}

const StatsStack = createStackNavigator();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator initialRouteName="TourneyList">
      <StatsStack.Screen name="Stats" component={StatsScreen} />
    </StatsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Tourney" component={TourneyStackScreen} />
          <Tab.Screen name="Stats" component={StatsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
