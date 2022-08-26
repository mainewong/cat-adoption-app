import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { COLORS } from "../constants/theme";

const OnboardingScreen = ({ navigation }) => {

  const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? '#FFF9F3' : 'rgba(0, 0, 0, 0.3)';
    return (
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 20,
          marginHorizontal: 3,
          backgroundColor
        }}
      />
    );
  };

//   const Skip = ({ ...props }) => <Button title="Skip" color="red" {...props} />;

//   const Next = ({ ...props }) => <Button title="Next" color="red" {...props} />;

const Skip = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 16, color: "#FFF9F3" }}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 16, color: "#FFF9F3" }}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 16, color: "#FFF9F3" }}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.navigate("SignInSignUp")}
      //onSkip={() => navigation.replace("SignInSignUp")}
      onDone={() => navigation.navigate("SignInSignUp")}
      pages={[
        {
          backgroundColor: "#FA7E5E",
          image: (
            <Image
              source={require("../assets/onboarding-1.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Welcome to Furever",
          titleStyles: styles.title,
          subtitle: "Furever is where you can help a stray cat to find a forever home, or welcome one into your life.",
          subTitleStyles: {color: '#FFF9F3'}
        },
        {
          backgroundColor: "#FDA946",
          image: (
            <Image
              source={require("../assets/onboarding-2.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Every cat deserves a home",
          titleStyles: styles.title,
          subtitle: "By adopting, you’re helping more cats in need and giving them an opportunity to become beloved pets.",
          subTitleStyles: {color: 'white'}
        },
        {
          backgroundColor: "#7954A5",
          image: (
            <Image
              source={require("../assets/onboarding-3.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Make a new friend",
          titleStyles: styles.title,
          subtitle: "These cats have so much love to give and they won’t ever stop giving it to you once you let them into your heart!",
          subTitleStyles: {color: 'white'}
        },
      ]}
    />
  );
};

export default OnboardingScreen;
const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  onboardingImg: {
    width: deviceWidth,
    height: 330,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: '#FFF9F3',
  }
});
