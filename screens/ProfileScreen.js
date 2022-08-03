import { useNavigation } from "@react-navigation/core";
import React, { useContext, createContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import firebase from "../database/firebaseDB";
import SignInSignUpScreen from "./SignInSignUpScreen";
import { stylesheet } from "../styles/stylesheet";
const auth = firebase.auth();
const LogInContext = createContext({});

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    //console.log(user.uid);
    //console.log(email);
    setUser(email);
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("SignInSignUp");
        console.log("signed out");
        setIsLoggedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={stylesheet.title}>Profile</Text>
      <Image style={styles.profilePic} source={require("../assets/user.jpg")} />
      <Text style={stylesheet.text}>{user}</Text>
      <Text style={stylesheet.text}>Username</Text>
      <TouchableOpacity
        style={stylesheet.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={stylesheet.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={stylesheet.button}>
        <Text onPress={handleSignOut} style={stylesheet.buttonText}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
});
