import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "../database/firebaseDB";
import SignInSignUpScreen from "./SignInSignUpScreen";
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
    <View style={styles.container}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <TouchableOpacity
        //onPress={handleSignOut}
        style={styles.button}
      >
        <Text onPress={signOut} style={styles.buttonText}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
