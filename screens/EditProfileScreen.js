import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";

import { stylesheet } from "../styles/stylesheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ProfileImagePicker from "../components/ProfileImagePicker";

import uuid from "react-native-uuid";
import firebase from "../database/firebaseDB";

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;

export default function EditProfileScreen({ navigation }) {
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

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ProfileImagePicker></ProfileImagePicker>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          //data={ profile }
          placeholder="username"
          placeholderTextColor="#666666"
          autoCorrect={false}
          //value={username}
          // onChangeText={(txt) => setUserData({...userData, fname: txt})}
          style={[stylesheet.textInput, { marginLeft: 10 }]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color="#333333" size={20} />
        <TextInput
          placeholder="age"
          placeholderTextColor="#666666"
          autoCorrect={false}
          // value={userData ? userData.fname : ''}
          // onChangeText={(txt) => setUserData({...userData, fname: txt})}
          style={[stylesheet.textInput, { marginLeft: 10 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
});
