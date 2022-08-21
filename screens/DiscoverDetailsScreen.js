import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

const DiscoverDetailsScreen = (props) => {
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
      <View style={{ marginBottom: 30 }}>
        <Card style={{ margin: 20 }}>
          <Image
            style={{
              width: deviceWidth - 60,
              height: deviceWidth - 60,
              margin: 20,
              marginBottom: 5,
              alignSelf: "center",
            }}
            source={{ uri: post.image }}
          />
          <Text
            style={[
              stylesheet.title,
              { marginVertical: 15, textAlign: "center" },
            ]}
          >
            {post.catName}
          </Text>
        </Card>

        <View style={{ marginHorizontal: 20 }}>
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
            style={stylesheet.roundButton}
            onPress={() => navigation.navigate("ApplyScreen", { post: post })}
          >
            <Text>Adopt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DiscoverDetailsScreen;

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
