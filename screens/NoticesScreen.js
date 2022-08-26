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
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from "moment";
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
            color="white"
            size={20}
            style={[styles.icon, { marginRight: 25 }]}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  async function getData() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (user) {
      const unsubscribe = await db
        .collection("posts")
        .orderBy('created', 'desc')
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
    const currentDoc = await db.collection("posts").doc(id).get()
    const imageId = currentDoc.data().imageId
    await db.collection("posts").doc(id).delete()
    
    var desertRef = storageRef.child(imageId + ".png");

    // Delete the file
    desertRef.delete().then(() => {
      Alert.alert("Post deleted!");
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
    //navigation.navigate("home");
  }

  function renderItem({ item }) {
    const postDate = moment(item.created.toDate()).format('ll');
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
            paddingBottom: 10,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image style={[styles.image, {marginTop: 5 }]} source={{ uri: item.image }} />

          <View style={{ marginLeft: 15 }}>
            <Text style={[stylesheet.label, {marginTop: 5, fontSize: 18 }]}>{item.catName}</Text>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>
              <Entypo name="calendar" size={18} color="#52495B" />
              <Text style={[stylesheet.text, {marginLeft: 10 }]}>{item.catAge + " year-old"}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <FontAwesome5 name="cat" size={18} color="#52495B" />
              <Text style={[stylesheet.text, {marginLeft: 10, marginTop: 5}]}>{item.breed}</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => deletePost(item.id)}
              style={[stylesheet.colorOutlineButton, { width: 200 }]}
            >
              {/* <Ionicons name="trash" size={16} color="#944" /> */}
              <Text style={stylesheet.colorOutlineButtonText}>Mark as adopted</Text>
            </TouchableOpacity>
            <Text style={[stylesheet.text, {fontSize: 13, alignSelf: "flex-end", marginTop: 8 }]}>Posted on {postDate}</Text>
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
    width: 140,
    height: 140,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
