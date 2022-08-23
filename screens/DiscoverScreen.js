import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import firebase from "../database/firebaseDB";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../database/firebaseDB";
//const auth = firebase.auth();
import moment from "moment";

const db = firebase.firestore();

export default function DiscoverScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(auth.currentUser.uid);
      } else {
        navigation.navigate("SignInSignUp");
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((collection) => {
      const data = collection.docs.map((doc) => {
        // console.log(doc.data().uid);

        var postObject = {
          ...doc.data(),
          id: doc.id,
        };

        db.collection('users').doc(doc.data().uid).get().then(userDoc => {
          postObject.user = userDoc.data().username;
        })

        console.log(postObject);

        return postObject;
      });

      setAllPosts(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // like and unlike article and count total article likes
  async function likePost(PostID) {
    const post = await db.collection("posts").doc(PostID).get();
    const postData = post.data();
    const postLikesUid = postData.postLikedBy;
    const postLikesCount = postLikesUid.length;

    if (!postLikesUid.includes(userID)) {
      await db
        .collection("posts")
        .doc(PostID)
        .update({
          postLikedBy: [userID, ...postLikesUid],
        });
    } else {
      await db
        .collection("posts")
        .doc(PostID)
        .update({
          postLikedBy: postLikesUid.filter((uid) => uid !== userID),
        });
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    const response = await allPosts;
    setRefreshing(false);
  }

  function renderItem({ item }) {
    //const postDate = moment(item.created.toDate()).startOf("hour").fromNow();
    const postDate = moment(item.created.toDate()).startOf("min").fromNow();

    //checking if the current user has liked the article or not to change icon
    const postLikesUid = item.postLikedBy;
    const postLikesCount = postLikesUid.length;
    const isLiked = postLikesUid.includes(userID);

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
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: "#ccc",
            //borderBottomWidth: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Card>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            >
              <View>
                <Text>
                  <Image
                    style={styles.userIcon}
                    //source={require("../assets/user.jpg")}
                   // source={{ uri: item.userImg }}
                   source={{
                    uri: item
                      ? item.userImg ||
                        "https://m.medigatenews.com/resources/img/add_user.png"
                      : "https://m.medigatenews.com/resources/img/add_user.png",
                  }}
                  />
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
                <Text>{item.username}</Text>
              </View>
            </View>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={{ margin: 10 }}>
              <Text style={stylesheet.label}>{item.catName}</Text>
              <View style={[stylesheet.label, { flexDirection: "row" }]}>
                <Text style={[stylesheet.smallLabel, { marginRight: 20 }]}>
                  {item.catAge + " year old"}
                </Text>
                <Text style={stylesheet.smallLabel}>{item.breed}</Text>
              </View>
              <Text>Posted {postDate}</Text>
              {/* <TouchableOpacity onPress={() => likePost( item.id )}>
                  <Ionicons name="heart-outline" size={24} />          
               </TouchableOpacity> */}
              <TouchableOpacity onPress={() => likePost(item.id)}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={24}
                />
                <Text>{postLikesCount} likes</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={stylesheet.container}>
      {/* <Text style={[stylesheet.title, { marginLeft: 10, marginVertical: 15 }]}>
        Find your next bestfriend
      </Text> */}

      <FlatList
        data={allPosts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      />
    </View>
  );
}

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    width: deviceWidth - 20,
    height: 200,
  },
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 75,
  },
});
