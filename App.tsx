import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import Todo from "./components/Todo";

import { ITodo } from "./types/Todo";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
  });

  useEffect(() => {
    AsyncStorage.getItem("todos").then((value) => {
      setTodos(JSON.parse(value ?? "[]"));
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
    Alert.alert(
      "Please confirm",
      `Do you want to delete this todo "${
        todos.find(({ id: todoId }) => todoId === id)?.text
      }"?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressApp}>
      <View style={styles.container}>
        <Header noOfTodos={todos.length} />
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
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
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
    fontFamily: "Inter-ExtraBold",
    fontSize: 20,
  },
  noTodoIcon: {
    color: "#cccccc",
    marginLeft: 10,
  },
});

export default App;
