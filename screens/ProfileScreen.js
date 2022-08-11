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
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) navigation.navigate("Profile", { id: user.id, email: user.email })
      else navigation.navigate("Logged In");
    });
  }, []);

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
      <View style={styles.profileContainer}>
        <Image style={styles.profilePic} source={{ uri: item.userImg}} />
        <Text style={stylesheet.text}>{item.username}</Text>
        <Text style={stylesheet.text}>{item.age}</Text>
        <Text style={stylesheet.text}>{user}</Text>
      </View>
    );
  }

  return (
    <View data={profile} style={styles.profileView}>
      <Text style={stylesheet.title}>Profile</Text>
      <FlatList
        data={profile}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
      {/* <Image style={styles.profilePic} source={require("../assets/user.jpg")} /> */}
      {/* <Text style={stylesheet.text}>{user}</Text> */}
      <TouchableOpacity
        style={stylesheet.button}
        onPress={() => navigation.navigate("EditProfile", {
          id: id,
          userImg: userImg,
          username: username,
          age: age,
        })}
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
  profileView: {
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
