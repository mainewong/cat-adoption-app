import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { stylesheet } from "../../styles/stylesheet";
import { COLORS, SIZES } from "../../constants/theme";
import Quiz from "./Quiz";

const QuizScreen = ({ navigation }) => {
  return (
    <View style={[stylesheet.container, { paddingHorizontal: 20 }]}>
      <Text style={stylesheet.title}>How well do you know cats?</Text>
      <TouchableOpacity
        style={stylesheet.button}
        onPress={() => navigation.navigate("QuizStart")}
      >
        <Text style={stylesheet.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
