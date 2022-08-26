import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Card,
  Image,
} from "react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
const auth = firebase.auth();
const db = firebase.firestore();

export default function ApplicationsScreen( {navigation} ) {
  const [myApplications, setMyApplications] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    //console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      //console.log("Running nav listener");
      getApplications();
    });
    getApplications();
    return removeListener;
  }, []);


  async function getApplications() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (user) {
      const unsubscribe = await db
        .collection("applications")
        .onSnapshot((collection) => {
          const data = collection.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log(data);
          setMyApplications(data.filter((item) => item.uid === uid));
          //console.log(data.filter((item) => item.uid === uid))
        });

      return () => unsubscribe();
    }
  }

  function renderApplications({ item }) {
    const postDate = moment(item.created.toDate()).format('lll')
    return (
        <View
          style={{
            padding: 10,
            paddingTop: 30,
            paddingBottom: 30,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image style={stylesheet.catIcon} source={{ uri: item.image }} />

          <View style={{ marginLeft: 15, justifyContent: "center" }}>
            <Text style={[stylesheet.label, { marginBottom: 5 }]}>{item.catName}</Text>
            <Text style={stylesheet.text}>Applied on: {postDate}</Text>
            <Text style={stylesheet.text}>Status: Application received</Text>
          </View>
        </View>
    );
  }

  return (
    <View style={[stylesheet.container, {backgroundColor: "#fafafa" }]}>
      <FlatList
        data={myApplications}
        renderItem={renderApplications}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
  </View>
  )
}



const styles = StyleSheet.create({})