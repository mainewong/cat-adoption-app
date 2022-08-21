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

const OnboardingScreen = ({ navigation }) => {

  const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
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
      <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 16 }}>Done</Text>
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
          backgroundColor: "#f9ebdc",
          image: (
            <Image
              source={require("../assets/onboarding-1.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#f9ebdc",
          image: (
            <Image
              source={require("../assets/onboarding-2.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#f9ebdc",
          image: (
            <Image
              source={require("../assets/onboarding-3.png")}
              style={styles.onboardingImg}
            />
          ),
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper",
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
});
