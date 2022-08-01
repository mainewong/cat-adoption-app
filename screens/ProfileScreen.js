import { useNavigation } from "@react-navigation/core";
import React, { useContext, createContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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


  // const signOut = async () => {

  //   navigation.navigate("SignInSignUp")
  //   // add try catch if you want
  //   // console.log(auth.currentUser.email);
  //   // const result = await signOut(authentication);
  //   // console.log("entered sign out functions");
  //   // console.log(auth.currentUser.email);
  // };

  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>Profile</Text>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <Text>Email: {user}</Text>

      <TouchableOpacity
        //onPress={handleSignOut}
        style={stylesheet.button}
      >
        <Text onPress={handleSignOut} style={stylesheet.buttonText}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
