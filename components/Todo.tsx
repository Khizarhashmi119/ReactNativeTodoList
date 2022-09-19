import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { ITodo } from "../types/Todo";

interface Props {
  todo: ITodo;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  toggleTodo: (id: string) => void;
}

const Todo = (props: Props): JSX.Element => {
  const { todo, deleteTodo, updateTodo, toggleTodo } = props;
  const { id, isCompleted, text } = todo;

  const [isEditTodoEnable, setIsEditTodoEnable] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState(todo.text);

  const handlePressDeleteIcon = () => {
    deleteTodo(id);
  };

  const handlePressEditIcon = () => {
    setIsEditTodoEnable(true);
    updateTodo(id, updatedTodoText);
  };

  const handlePressTickIcon = () => {
    setIsEditTodoEnable(false);
    updateTodo(id, updatedTodoText);
  };

  const handleChangeEditTodoInput = (text: string) => {
    setUpdatedTodoText(text);
  };

  const handlePressToggleTodoIcon = () => {
    toggleTodo(id);
  };

  return (
    <View
      style={[
        styles.todoContainer,
        isCompleted && styles.todoContainerCompleted,
      ]}
    >
      {!isEditTodoEnable &&
        (isCompleted ? (
          <MaterialIcons
            style={[
              styles.toggleIcon,
              isCompleted && styles.toggleIconCompleted,
            ]}
            name="check-box"
            size={24}
            onPress={handlePressToggleTodoIcon}
          />
        ) : (
          <MaterialIcons
            style={[
              styles.toggleIcon,
              isCompleted && styles.toggleIconCompleted,
            ]}
            name="check-box-outline-blank"
            size={24}
            onPress={handlePressToggleTodoIcon}
            color="black"
          />
        ))}
      {!isEditTodoEnable ? (
        <Text
          style={[styles.todoText, isCompleted && styles.todoTextCompleted]}
        >
          {text}
        </Text>
      ) : (
        <TextInput
          style={styles.editTodoInput}
          value={updatedTodoText}
          onChangeText={handleChangeEditTodoInput}
        />
      )}
      {isEditTodoEnable ? (
        <MaterialCommunityIcons
          style={[styles.editIcon, isCompleted && styles.editIconCompleted]}
          name="check-bold"
          size={24}
          onPress={handlePressTickIcon}
        />
      ) : (
        <MaterialIcons
          style={[styles.editIcon, isCompleted && styles.editIconCompleted]}
          name="edit"
          size={24}
          onPress={handlePressEditIcon}
        />
      )}
      <MaterialIcons
        style={[styles.deleteIcon, isCompleted && styles.deleteIconCompleted]}
        name="delete"
        size={24}
        onPress={handlePressDeleteIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: "center",
    borderColor: "#dc4146",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
  },
  todoContainerCompleted: {
    borderColor: "#4FA845",
  },
  toggleIcon: {
    color: "#dc4146",
  },
  toggleIconCompleted: {
    color: "#4FA845",
  },
  todoText: {
    borderRadius: 5,
    color: "#dc4146",
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  editTodoInput: {
    backgroundColor: "#ffffc2",
    borderRadius: 5,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  todoTextCompleted: {
    color: "#4FA845",
    textDecorationLine: "line-through",
  },
  editIcon: {
    color: "#dc4146",
    marginLeft: 10,
  },
  editIconCompleted: {
    color: "#4FA845",
  },
  deleteIcon: {
    color: "#dc4146",
    marginLeft: 10,
  },
  deleteIconCompleted: {
    color: "#4FA845",
    marginLeft: 10,
  },
});

export default Todo;
