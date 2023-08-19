import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  noOfTodos: number;
}

const Header = (props: Props): JSX.Element => {
  const { noOfTodos } = props;

  return (
    <View style={styles.header}>
      <MaterialIcons name="sticky-note-2" size={24} color="#000000" />
      <Text style={styles.headerText}>Todos</Text>
      <Text style={styles.statusText}>No. of todos: {noOfTodos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#e3be31",
    flexDirection: "row",
    padding: 16,
  },
  headerText: {
    color: "#000000",
    flex: 1,
    fontSize: 24,
    fontFamily: "Inter-Black",
    marginLeft: 10,
  },
  statusText: {
    fontFamily: "Inter-Black",
  },
});

export default Header;
