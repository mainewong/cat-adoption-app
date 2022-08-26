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
import { COLORS } from "../constants/theme";
import { AntDesign } from '@expo/vector-icons';


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
      {/* <View style={[stylesheet.myCard, stylesheet.shadowProp]}> */}
      <View>
        <Image
          style={{
            width: deviceWidth,
            height: 400,
            alignSelf: "center",
            borderRadius: 0,
          }}
          source={{ uri: post.image }}
        />
      </View>

      <View style={[stylesheet.myCard, stylesheet.shadowProp, {marginTop: -35}]}>
        <Text style={[stylesheet.title, { marginBottom: 10 }]}>{post.catName}</Text>
        <View>
          <Text style={stylesheet.itemLabel}>About Me</Text>
          <Text style={stylesheet.text}>{post.about}</Text>
        </View>
        <View style={{ margin: 0 }}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Gender</Text>
            <Text style={stylesheet.text}>{post.gender}</Text>
          </View>
          <View style={{ position: "absolute", left: 170 }}>
            <Text style={stylesheet.itemLabel}>Age</Text>
            <Text style={stylesheet.text}>{post.catAge + " year-old"}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Breed</Text>
            <Text style={stylesheet.text}>{post.breed}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View>
            <Text style={stylesheet.itemLabel}>Sterilization</Text>
            <Text style={stylesheet.text}>{post.sterilizeStatus}</Text>
          </View>
          <View style={{ position: "absolute", left: 170 }}>
            <Text style={stylesheet.itemLabel}>Vaccination</Text>
            <Text style={stylesheet.text}>{post.vaccinationStatus}</Text>
          </View>
        </View>
        <TouchableOpacity style={{marginTop: 20}} onPress={() =>
            navigation.navigate("Edit", { post: post })}>
              
          <Text style={[stylesheet.colorOutlineButtonText, {textAlign: "center"}]}><AntDesign name="edit" size={24} color="#EE574E" />Edit Details</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkbeige,
  },
  image: {
    justifyContent: "center",
    width: deviceWidth - 20,
    height: 150,
  },
});
