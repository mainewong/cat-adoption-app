import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesheet } from "../styles/stylesheet";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
const auth = firebase.auth();

const db = firebase.firestore()

export default function DiscoverScreen() {
  const [allPosts, setAllPosts] = useState([]);

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

        setAllPosts(data);
      });

    return () => {
      unsubscribe()
    }
  }, [])

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
        <Text>{item.catAge}</Text>
        <Text>{item.breed}</Text>
        
      </View>
    );
  }


  return (
    <View style={stylesheet.container}>
      
      <FlatList
        data={allPosts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({})