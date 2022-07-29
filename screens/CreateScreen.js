import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebaseDB";
import { stylesheet } from "../styles/stylesheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//const auth = firebase.auth();
const db = firebase.firestore().collection("posts");


export default function CreateScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUser(user.uid);
  }, []);
  
  // Monitor route.params for changes and add items to the database
  async function savePost() {
    const newPost = {
      uid: user,
      catName: catName,
      catAge: catAge,
      breed: breed,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.add(newPost);
    Alert.alert("Post published!");
    navigation.navigate("MyNotices");
  }

  return (
    <KeyboardAwareScrollView>
      <View style={{ margin: 20 }}>
        <Text style={[stylesheet.label, styles.text]}>Name</Text>
        <TextInput
          style={stylesheet.input}
          value={catName}
          onChangeText={(input) => setCatName(input)}
        />
        <Text style={[stylesheet.label, styles.text]}>Age</Text>
        <TextInput
          style={stylesheet.input}
          value={catAge}
          onChangeText={(input) => setCatAge(input)}
        />
        <Text style={[stylesheet.label, styles.text]}>Breed</Text>
        <TextInput
          style={stylesheet.input}
          value={breed}
          onChangeText={(input) => setBreed(input)}
        />
        <TouchableOpacity style={stylesheet.button} onPress={savePost}>
          <Text style={stylesheet.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
