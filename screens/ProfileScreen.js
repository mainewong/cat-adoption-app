import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "../database/firebaseDB";
import SignInSignUpScreen from "./SignInSignUpScreen";
import { stylesheet } from "../styles/stylesheet";
const auth = firebase.auth();

export default function ProfileScreen({ navigation }) {
  const signOut = async () => {

    navigation.navigate("SignInSignUp")
    // add try catch if you want
    // console.log(auth.currentUser.email);
    // const result = await signOut(authentication);
    // console.log("entered sign out functions");
    // console.log(auth.currentUser.email);
  };

  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>Profile</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        //onPress={handleSignOut}
        style={stylesheet.button}
      >
        <Text onPress={signOut} style={stylesheet.buttonText}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
