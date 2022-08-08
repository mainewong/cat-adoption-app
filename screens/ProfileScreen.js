import { useNavigation } from "@react-navigation/core";
import React, { useContext, createContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import firebase from "../database/firebaseDB";
import SignInSignUpScreen from "./SignInSignUpScreen";
import { stylesheet } from "../styles/stylesheet";
const auth = firebase.auth();
const LogInContext = createContext({});
const db = firebase.firestore();

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getData();
    });
    getData();
    return removeListener;
  }, [user]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    //console.log(user.uid);
    //console.log(email);
    setUser(email);
  }, []);

  async function getData() {
    const user = firebase.auth().currentUser;
    const email = user.email;

    if (user) {
      const unsubscribe = await db
        .collection("users")
        .onSnapshot((collection) => {
          const data = collection.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log(data);
          setProfile(data.filter((item) => item.email === email));
          //console.log(data.filter((item) => item.uid === uid))
        });

      return () => unsubscribe();
    }
  }

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

  function renderItem({ item }) {
    return (
      <View>
        <Image style={styles.profilePic} source={{ uri: item.userImg}} />
        <Text style={stylesheet.text}>{item.username}</Text>
        <Text style={stylesheet.text}>{item.age}</Text>
      </View>
    );
  }

  return (
    <View data={profile} style={styles.profileContainer}>
      <Text style={stylesheet.title}>Profile</Text>
      <Image style={styles.profilePic} source={require("../assets/user.jpg")} />
      <Text style={stylesheet.text}>{user}</Text>
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
      <FlatList
        data={profile}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
});
