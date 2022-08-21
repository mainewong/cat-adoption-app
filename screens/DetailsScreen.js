import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Card,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  //const route = useRoute();

  //const [post, setPost] = useState({ catName: "", catAge: "" });
  const [post, setPost] = useState({ catName: "", catAge: "" });
  const getPostById = async (id) => {
    const dbRef = db.collection("posts").doc(id);
    const doc = await dbRef.get();
    const post = doc.data();
    setPost({
      ...post,
      id: doc.id,
    });
  };

  useEffect(() => {
    getPostById(props.route.params.id);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[stylesheet.myCard, stylesheet.shadowProp]}>
        <Image
          style={{
            width: deviceWidth - 80,
            height: 300,
            alignSelf: "center",
            borderRadius: 5,
          }}
          source={{ uri: post.image }}
        />
        <Text
          style={[stylesheet.title, { marginTop: 20, textAlign: "center" }]}
        >
          {post.catName}
        </Text>
      </View>

      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Gender</Text>
            <Text>{post.gender}</Text>
          </View>
          <View style={{ position: "absolute", left: 170 }}>
            <Text style={stylesheet.itemLabel}>Age</Text>
            <Text>{post.catAge + " year old"}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Breed</Text>
            <Text>{post.breed}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Sterilization</Text>
            <Text>{post.sterilizeStatus}</Text>
          </View>
          <View style={{ position: "absolute", left: 170 }}>
            <Text style={stylesheet.itemLabel}>Vaccination</Text>
            <Text>{post.vaccinationStatus}</Text>
          </View>
        </View>
        <View>
          <Text style={stylesheet.itemLabel}>About Me</Text>
          <Text>{post.about}</Text>
        </View>

        <TouchableOpacity
          style={stylesheet.button}
          onPress={() =>
            //navigation.navigate("Edit")
            navigation.navigate("Edit", { post: post })
          }
        >
          <Text style={stylesheet.buttonText}>Edit Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: "center",
    width: deviceWidth - 20,
    height: 150,
  },
});
