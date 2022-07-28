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
const auth = firebase.auth();

//const db = firebase.firestore().collection("posts");
const db = firebase.firestore();
//const user = auth.currentUser?.uid

export default function NoticesScreen({ navigation, route }) {
  const [myPosts, setMyPosts] = useState([]);
  const user = auth.currentUser?.uid;

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

  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((collection) => {
      const data = collection.docs.map((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        //console.log(postObject);
        return postObject;
      });
      setMyPosts(data);
    });

    return () => {
      unsubscribe();
    };
  }, [user, myPosts]);

  function deletePost(id) {
    console.log("Deleting " + id);
    // To delete that item, we filter out the item we don't want
    //setNotes(notes.filter((item) => item.id !== id));
    db.doc(id).delete();
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", {
            id: item.id,
          })
        }
      >
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
          <Text>{item.catAge}</Text>
          <TouchableOpacity onPress={() => deletePost(item.id)}>
            <Ionicons name="trash" size={16} color="#944" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    
    <View style={stylesheet.container}>
      <FlatList
        data={myPosts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
   
  );
}

const styles = StyleSheet.create({});
