import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  //const route = useRoute();

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
      <Image
        style={{
          width: deviceWidth,
          height: 350,
          alignSelf: "center",
          borderRadius: 0,
        }}
        source={{ uri: post.image }}
      />
      <View style={{ margin: 20 }}>
        
        <Text style={[stylesheet.title, { marginVertical: 20 }]}>
          {post.catName}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Gender</Text>
            <Text>xxx</Text>
          </View>
          <View>
            <Text style={stylesheet.itemLabel}>Age</Text>
            <Text>{post.catAge + " year old"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Breed</Text>
            <Text>{post.breed}</Text>
          </View>
          <View>
            <Text style={stylesheet.itemLabel}>Health</Text>
            <Text>xxx</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={stylesheet.itemLabel}>Sterilized</Text>
          <Text>xxx</Text>
        </View>
        <View>
          <Text style={stylesheet.itemLabel}>About Me</Text>
          <Text>xxx</Text>
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
});
