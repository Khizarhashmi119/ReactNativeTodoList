import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  addTodo: (text: string) => void;
}

const AddTodoForm = (props: Props): JSX.Element => {
  const { addTodo } = props;

  const [todoText, setTodoText] = useState("");

  const handleChangeTodoText = (text: string) => {
    setTodoText(text);
  };

  const handlePressPlusIcon = () => {
    if (todoText) {
      addTodo(todoText);
      setTodoText("");
    }
  };

  return (
    <View style={styles.todoInputContainer}>
      <TextInput
        style={styles.todoInput}
        placeholder="Enter todo"
        value={todoText}
        onChangeText={handleChangeTodoText}
      />
      <TouchableOpacity onPress={handlePressPlusIcon}>
        <View style={styles.todoInputButton}>
          <MaterialIcons name="add" size={30} color="#000000" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoInputContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 24,
  },
  todoInput: {
    borderColor: "#000000",
    borderRadius: 5,
    borderWidth: 2,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  todoInputButton: {
    backgroundColor: "#e3be31",
    borderRadius: 5,
    padding: 6,
    marginLeft: 10,
  },
});

export default AddTodoForm;
