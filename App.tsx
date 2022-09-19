import { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddTodoForm from "./components/AddTodoForm";
import Todo from "./components/Todo";

import { ITodo } from "./types/Todo";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: "113252545",
      text: "Buy food",
      isCompleted: false,
    },
    {
      id: "113252546",
      text: "Cook food",
      isCompleted: true,
    },
    {
      id: "113252547",
      text: "Eat food",
      isCompleted: false,
    },
  ]);

  useEffect(() => {
    AsyncStorage.getItem("todos").then((value) => {
      setTodos(JSON.parse(value || "[]"));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handlePressApp = () => {
    Keyboard.dismiss();
  };

  const addTodo = (text: string) => {
    setTodos((prevState) => [
      ...prevState,
      {
        id: Date.now().toString(),
        isCompleted: false,
        text,
      },
    ]);
  };

  const updateTodo = (id: string, text: string) => {
    setTodos((prevState) =>
      prevState.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressApp}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="sticky-note-2" size={24} color="#000000" />
          <Text style={styles.headerText}>Todos</Text>
          <Text style={styles.statusText}>No. of todos: {todos.length}</Text>
        </View>
        <AddTodoForm addTodo={addTodo} />
        <View style={styles.todosContainer}>
          {todos.length ? (
            <FlatList
              style={styles.todos}
              keyExtractor={({ id }) => id}
              data={todos}
              renderItem={({ item: todo }) => (
                <Todo
                  todo={todo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  toggleTodo={toggleTodo}
                />
              )}
            />
          ) : (
            <View style={styles.noTodoIconContainer}>
              <Text style={styles.noTodoText}>No todo yet.</Text>
              <Entypo style={styles.noTodoIcon} name="emoji-sad" size={30} />
            </View>
          )}
        </View>
        <StatusBar barStyle="default" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
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
    fontWeight: "bold",
    marginLeft: 10,
  },
  statusText: {
    fontWeight: "700",
  },
  todosContainer: {
    flex: 1,
  },
  todos: {
    paddingHorizontal: 24,
  },
  noTodoIconContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  noTodoText: {
    color: "#cccccc",
    fontSize: 20,
    fontWeight: "bold",
  },
  noTodoIcon: {
    color: "#cccccc",
    marginLeft: 10,
  },
});

export default App;
