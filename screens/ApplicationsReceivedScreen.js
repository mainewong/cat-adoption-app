import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    Card,
    Image,
    Linking,
  } from "react-native";
  import moment from "moment";
  import React, { useEffect, useState } from "react";
  import { stylesheet } from "../styles/stylesheet";
  import { FontAwesome } from "@expo/vector-icons";
  import { Entypo } from '@expo/vector-icons'; 
  import { MaterialIcons } from '@expo/vector-icons'; 

  import firebase from "../database/firebaseDB";
  import { collection, getDocs } from "firebase/firestore";
  import { Ionicons } from "@expo/vector-icons";
  import { FontAwesome5 } from '@expo/vector-icons'; 
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
      }, []);
  
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
      const number = item.applyContact
      const MY_URL = `https://wa.me/65${number}`;
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
  
            <View style={{ marginLeft: 15 }}>
              <Text style={stylesheet.label}>{item.catName}</Text>
              <Text style={stylesheet.text}>Applied {postDate}</Text>
              <Text style={[stylesheet.itemLabel, { marginTop: 20 }]}>Applicant's info</Text>

              <View style={{flexDirection: "row"}}>
                <FontAwesome name="id-card" size={18} color="#52495B" />
                <Text style={[stylesheet.text, {marginLeft: 10}]}>{item.applyName}</Text> 
              </View>

              <View style={{flexDirection: "row", marginTop: 5}}>
                <Entypo name="phone" size={20} color="#52495B" />
                <Text style={[stylesheet.text, {marginLeft: 10}]}>{item.applyContact}</Text>
              </View>
              
              <View style={{flexDirection: "row", marginTop: 5}}>
                <MaterialIcons name="apartment" size={20} color="#52495B" />
                <Text style={[stylesheet.text, {marginLeft: 10}]}>{item.houseType}</Text>
              </View>
              
              <TouchableOpacity style={[stylesheet.button, {flexDirection: "row", width: "85%"}]} onPress={() => Linking.openURL(MY_URL)}>
              <FontAwesome5 name="whatsapp" size={24} color="white" />
              <Text style={[stylesheet.buttonText, {marginLeft: 5 }]}>Contact applicant</Text>
              </TouchableOpacity>
            </View>
          </View>
      );
    }
  
    return (
      <View style={[stylesheet.container, {backgroundColor: "#fafafa" }]}>
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