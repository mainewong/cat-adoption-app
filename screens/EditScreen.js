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
const db = firebase.firestore();

export default function EditScreen({ navigation, route }) {
  const id = route.params.id;
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [postId, setPostId] = useState("");

  function getDetails() {
    const postId = route.params.post.id;
    const catName = route.params.post.catName;
    const catAge = route.params.post.catAge;
    const breed = route.params.post.breed;
    setPostId(postId);
    setCatName(catName);
    setCatAge(catAge);
    setBreed(breed);
  }

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (id) {
      const unsubscribe = db.collection("posts").onSnapshot((collection) => {
        const data = collection.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(data);
      });
      return () => unsubscribe();
    }
    //}, [id]);
  }, []);

  async function updatePost() {
    const editedPost = await firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        catName: catName,
        catAge: catAge,
        breed: breed,
      });
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
        <TouchableOpacity style={stylesheet.button} onPress={updatePost}>
          <Text style={stylesheet.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
