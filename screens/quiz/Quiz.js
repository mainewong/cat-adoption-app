import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  Animated,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import data from "../../quiz/QuizData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { stylesheet } from "../../styles/stylesheet";
import { useNavigation } from "@react-navigation/native";

const CATFACTS_URL = "https://cvillecatcare.com/veterinary-topics/101-amazing-cat-facts-fun-trivia-about-your-feline-friend/#:~:text=Cats%20are%20believed%20to%20be,to%20six%20times%20their%20length."

const Quiz = () => {
  const navigation = useNavigation();

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show next button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 30,
        }}
      >
        {/* Question counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text style={{ color: COLORS.white, fontSize: 30 }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
                  ? COLORS.error
                  : COLORS.secondary + "40",
              backgroundColor:
                option == correctOption
                  ? COLORS.success + "20"
                  : option == currentOptionSelected
                  ? COLORS.error + "20"
                  : COLORS.secondary + "20",
              height: 55,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>

            {/* Show Check or Cross Icon based on correct answers */}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const adoptNowBtn = () => {
    navigation.navigate("Discover")
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const scoreMessage = () => {
    if (score === allQuestions.length) {
      return (
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 30, color: COLORS.success, textAlign: "center" }} > {score}</Text>
            <Text style={{ fontSize: 30, color: COLORS.grey, textAlign: "center" }}>/ {allQuestions.length} </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5, color: COLORS.grey}}>
            Congratulations!
          </Text>
          <Text style={[stylesheet.text, { textAlign: "center" }]}>
            Your results show that you have an excellent understanding about
            cats!
          </Text>
          <TouchableOpacity onPress={adoptNowBtn}
            style={[stylesheet.colorOutlineButton, {borderRadius: 10 }]}>
            <Text style={stylesheet.colorOutlineButtonText}>Adopt now</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (score < allQuestions.length / 2 + 1) {
      return (
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 30, color: COLORS.red, textAlign: "center" }} > {score}</Text>
            <Text style={{ fontSize: 30, color: COLORS.grey, textAlign: "center" }}>/ {allQuestions.length} </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5, color: COLORS.grey}}>Try harder!</Text>
          <Text style={[stylesheet.text, { textAlign: "center" }]}>
            Your results show that you have a poor understanding of cats!
          </Text>
          <TouchableOpacity style={[stylesheet.colorOutlineButton, {borderRadius: 10, width: "100%" }]} onPress={() => Linking.openURL(CATFACTS_URL)}>
              <Text style={[stylesheet.colorOutlineButtonText, {marginLeft: 5 }]}>See 101 Amazing Cat Facts</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 30, color: COLORS.yellow, textAlign: "center" }} > {score}</Text>
            <Text style={{ fontSize: 30, color: COLORS.grey, textAlign: "center" }}>/ {allQuestions.length} </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5, color: COLORS.grey}}>Almost perfect!</Text>
          <Text style={[stylesheet.text, { textAlign: "center" }]}>
              You have most of the questions correct! 
          </Text>
          <TouchableOpacity style={[stylesheet.colorOutlineButton, {borderRadius: 10, width: "100%" }]} onPress={() => Linking.openURL(CATFACTS_URL)}>
              <Text style={[stylesheet.colorOutlineButtonText, {marginLeft: 5 }]}>See 101 Amazing Cat Facts</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.background,
      }}
    >
      {/* <StatusBar backgroundColor={COLORS.primary} /> */}
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          postition: "relative",
          resizeMode: "contain",
        }}
      >
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              background: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >

              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontSize: 30,
                    color:
                      score > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.black,
                  }}
                >
                  / {allQuestions.length}
                </Text>
              </View> */}

              <View style={{ marginVertical: 10}} >
                {scoreMessage()}
              </View>

              {/* Retry quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                >
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Background Image */}

        <Image
          source={require("../../assets/quizBG.png")}
          style={{
            width: SIZES.width,
            height: 140,
            zIndex: -2,
            position: "absolute",
            bottom: -30,
            left: 0,
            right: 0,
            opacity: 0.8,
          }}
          //resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({});
