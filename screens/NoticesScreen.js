import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";


const db = firebase.firestore().collection("posts");

export default function NoticesScreen({ navigation, route }) {

  const [posts, setPosts] = useState([]);
  

  function addPost() {
    navigation.navigate("Add");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <FontAwesome
            name="plus"
            size={20}
            style={[styles.icon, { marginRight: 25 }]}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.catName) {
      const newPost = {
        catName: route.params.catName,
        catAge: route.params.catAge,
        breed: route.params.breed,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      };
      db.add(newPost);
    }
  }, [route.params?.catName]);

  useEffect(() => {
    const unsubscribe = db.orderBy("created").onSnapshot((collection) => {
        const updatedPosts = collection.docs.map((doc) => {
          const postObject = {
            ...doc.data(),
            id: doc.id,
          };
          console.log(postObject);
          return postObject;
        });

        setPosts(updatedPosts);
      });

    return () => {
      unsubscribe()
    }
  }, [])

  function deletePost(id) {
    console.log("Deleting " + id);
    // To delete that item, we filter out the item we don't want
    //setNotes(notes.filter((item) => item.id !== id));
    db.doc(id).delete();   
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.catName}</Text>
        <TouchableOpacity onPress={() => deletePost(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={stylesheet.container}>
      
      <FlatList
        data={posts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
