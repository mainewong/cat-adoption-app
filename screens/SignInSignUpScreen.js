import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
//import auth from '@react-native-firebase/auth';
import firebase from "../database/firebaseDB";
import { auth } from "../database/firebaseDB";
const db = firebase.firestore();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {
  //const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function login() {
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      navigation.navigate("Logged In");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorText(error.message);
    }
  }

  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.");
    } else {
      try {
        setLoading(true);
        await auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
          if (credential && credential.user) {
          //db.collection('users').doc(auth.currentUser.uid)
          db.collection('users').doc(credential.user.uid)
          .set({
            uid: credential.user.uid,
            email: email,
            username: '',
            age: '',
            created: firebase.firestore.Timestamp.now(),
            userImg: null,
          })
        .catch(error => {
          console.log('something went wrong with added user to firebase')
          })
        }})
        setLoading(false);
        navigation.navigate("Logged In");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>{isLogIn ? "Log In" : "Sign Up"}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {isLogIn ? (
        <View />
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password:"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
      <TouchableOpacity
            style={styles.button}
            onPress={isLogIn ? login : signUp}
          >
            <Text style={styles.buttonText}>
              {" "}
              {isLogIn ? "Log In" : "Sign Up"}{" "}
            </Text>
          </TouchableOpacity>
          <Text style={styles.errorText}>{errorText}</Text>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 10 }} />
          ) : (
            <View />
          )}
      </View>

      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 200,
            create: { type: "linear", property: "opacity" },
            update: { type: "spring", springDamping: 0.6 },
          });
          setIsLogIn(!isLogIn);
          setErrorText("");
        }}
      >
        <Text style={styles.switchText}>
          {" "}
          {isLogIn
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    color: "tomato"
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  }
});
