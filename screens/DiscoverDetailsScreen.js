import {
  StyleSheet,
  Text,
  View,
  Share,
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
import { auth } from "../database/firebaseDB";
import { COLORS } from "../constants/theme";
const db = firebase.firestore();
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const DiscoverDetailsScreen = (props) => {
 
  const current = firebase.auth().currentUser;
  const userID = current.uid
  console.log(userID + "userID");

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

  const postedBy = post.uid
  //console.log(postedBy)

  const options = {
    message:
      "Hey! Help " +
      post.catName +
      " find a forever home! "
  };
  const onShare = async () => {
    try {
      const result = await Share.share(options);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <Card style={{ margin: 20, backgroundColor: COLORS.yellow }}>
          <Image style={{ width: deviceWidth - 60, height: deviceWidth - 60, margin: 20, marginBottom: 5, alignSelf: "center"}}
            source={{ uri: post.image }}/>
          <Text style={[ stylesheet.title, { marginTop: 10, marginBottom: 4, textAlign: "center", color: "white" }]}>
            {post.catName}
          </Text>
          <Text style={[ stylesheet.smallLabel, { textAlign: "center", marginBottom: 15, color: "white" }]}>{post.gender}, {post.catAge + " years old"}</Text>
        </Card>

        <View style={{ marginHorizontal: 20 }}>

          <View style={{ marginBottom: 15 }}>
            <Text style={stylesheet.itemLabel}>About Me</Text>
            <Text style={stylesheet.text}>{post.about}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View>
              <Text style={stylesheet.itemLabel}>Breed</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("BreedInfo", { post: post })}
              >
                <Text style={ { color: COLORS.grey} }>{post.breed} <Entypo name="info-with-circle" size={20} color="#453854" /></Text>
                
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View>
              <Text style={stylesheet.itemLabel}>Sterilization</Text>
              <Text style={stylesheet.text}>{post.sterilizeStatus}</Text>
            </View>
            <View style={{ position: "absolute", left: 170 }}>
              <Text style={stylesheet.itemLabel}>Vaccination</Text>
              <Text style={stylesheet.text}>{post.vaccinationStatus}</Text>
            </View>
          </View>
          

          <View>
            <Text style={[stylesheet.itemLabel, {marginTop: 15}]}>Listed by</Text>
            <Image style={styles.userIcon}
              source={{
              uri: post
                ? post.userImg ||
                  "https://m.medigatenews.com/resources/img/add_user.png"
                : "https://m.medigatenews.com/resources/img/add_user.png",
            }}
            />
            <Text style={stylesheet.text}>{post.username}</Text>
          </View>

          {userID == postedBy ? 
            null : (
            <TouchableOpacity
              style={stylesheet.roundButton}
              onPress={() => navigation.navigate("ApplyScreen", { post: post })}
            >
              <Text style={stylesheet.buttonText}>Adopt</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={stylesheet.shareButton} onPress={onShare}>
            <FontAwesome5 name="share" size={24} color="#453854" />
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
    backgroundColor: "white",
  },
  image: {
    justifyContent: "center",
    width: deviceWidth - 20,
    height: 150,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 75,
  },
});
