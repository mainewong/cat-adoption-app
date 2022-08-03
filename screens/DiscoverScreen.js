import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
const auth = firebase.auth();

const db = firebase.firestore();

export default function DiscoverScreen( {navigation} ) {

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
      unsubscribe();
    };
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
      onPress={() =>
        navigation.navigate("DiscoverDetails", {
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
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        
        <Card>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
          />
          <Text style={stylesheet.label}>{item.catName}</Text>
          <View style={[stylesheet.label, {flexDirection:"row"}]}>
            <Text style={{marginRight: 20}}>{(item.catAge) +" year old"}</Text>
            <Text>{item.breed}</Text>
          </View>
        </Card>
      </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={stylesheet.container}>
      <Text style={[stylesheet.title, {marginLeft: 10, marginVertical: 15}]}>Find your next bestfriend</Text>
      
      <FlatList
        data={allPosts}
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
    width: deviceWidth - 20,
    height: 150,
  },
});
