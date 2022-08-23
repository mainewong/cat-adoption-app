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
  
  export default function ApplicationsReceivedScreen( {navigation} ) {
    const [applicationsReceived, setApplicationsReceived] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        //console.log("Setting up nav listener");
        // Check for when we come back to this screen
        const removeListener = navigation.addListener("focus", () => {
          //console.log("Running nav listener");
          getApplicationsReceived();
        });
        getApplicationsReceived();
        return removeListener;
      }, [user]);
  
    async function getApplicationsReceived() {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      setUser(uid)
  
      if (user) {
        const unsubscribe = await db
          .collection("applications")
          .onSnapshot((collection) => {
            const data = collection.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            //console.log(data);
            setApplicationsReceived(data.filter((item) => item.catOwner === uid));
            //console.log(data.filter((item) => item.uid === uid))
          });
  
        return () => unsubscribe();
      }
    }
  
    function renderApplicationsReceived({ item }) {
      const postDate = moment(item.created.toDate()).format('lll')
      return (
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
              <Text>Applied {postDate}</Text>
              <Text>Status: Pending</Text>
              <Text style={[stylesheet.itemLabel, { marginTop: 20 }]}>Your Application Info</Text>
              <Text>Full name: {item.applyName}</Text>
              <Text>Contact: {item.applyContact}</Text>
              <Text>House Type: {item.houseType}</Text> 
            </View>
          </View>
      );
    }
  
    return (
      <View style={stylesheet.container}>
        <FlatList
          data={applicationsReceived}
          renderItem={renderApplicationsReceived}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
        />
    </View>
    )
  }
  
  
  
  const styles = StyleSheet.create({})