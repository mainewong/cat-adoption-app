import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Card,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
const auth = firebase.auth();
const db = firebase.firestore();

export default function NoticesScreen({ navigation, route }) {
  const [myPosts, setMyPosts] = useState([]);
  const [user, setUser] = useState("");

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

  // const user = auth.currentUser?.uid;

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

  async function getData() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (user) {
      const unsubscribe = await db
        .collection("posts")
        .onSnapshot((collection) => {
          const data = collection.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log(data);
          setMyPosts(data.filter((item) => item.uid === uid));
          //console.log(data.filter((item) => item.uid === uid))
        });

      return () => unsubscribe();
    }
  }

  async function deletePost(id) {
    await db.collection("posts").doc(id).delete();
    Alert.alert("Post deleted!");
    //navigation.navigate("home");
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
            justifyContent: "flex-start",
          }}
        >
          <Image style={styles.image} source={{ uri: item.image }} />

          <View style={{ marginLeft: 15 }}>
            <Text style={stylesheet.label}>{item.catName}</Text>
            <Text>{(item.catAge) +" year old"}</Text>
            <Text>{item.breed}</Text>
            <TouchableOpacity
            onPress={() => deletePost(item.id)}
            style={[stylesheet.button, {width: 180}]}
            >
              {/* <Ionicons name="trash" size={16} color="#944" /> */}
              <Text style={stylesheet.buttonText}>Mark as adopted</Text>
            </TouchableOpacity>
          </View>
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

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    width: 150,
    height: 150,
  },
});
