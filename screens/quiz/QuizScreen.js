import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { stylesheet } from "../../styles/stylesheet";
import { COLORS, SIZES } from "../../constants/theme";
import Quiz from "./Quiz";

const QuizScreen = ({ navigation }) => {
  return (
    <View style={[stylesheet.container, { paddingHorizontal: 20, backgroundColor: COLORS.lightbeige }]}>
      <Text style={[stylesheet.title, { fontSize: 30, fontWeight: "700" }]}>How well do</Text>
      <Text style={[stylesheet.title, { fontSize: 30, fontWeight: "700"  }]}>you know cats?</Text>
      <Text style={[stylesheet.text, { paddingTop: 3 }]}>Find out by doing this short quiz!</Text>
      <TouchableOpacity
        style={[stylesheet.button, {width: "80%", marginBottom: 20 }]}
        onPress={() => navigation.navigate("QuizStart")}
      >
        <Text style={stylesheet.buttonText}>Start</Text>
      </TouchableOpacity>
      <Image
              source={require("../../assets/quiz.png")}
              style={styles.quizImg}
      />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  quizImg: {
    width: 340,
    height: 260, 
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});
