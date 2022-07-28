import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

const DetailsScreen = (props) => {

  const [post, setPost] = useState({catName: "", catAge: ""});
  const getPostById = async (id) => {
    const dbRef = db.collection("posts").doc(id);
    const doc = await dbRef.get();
    const post = doc.data();
    setPost({
        ...post,
        id:doc.id,
    })
  };

  useEffect(() => {
    getPostById(props.route.params.id);
  });

  return <View style={stylesheet.container}>
    <Text>{post.catName}</Text>
    <Text>{post.catAge}</Text>
    <Text>{post.breed}</Text>
  </View>;

};

export default DetailsScreen;

const styles = StyleSheet.create({});
