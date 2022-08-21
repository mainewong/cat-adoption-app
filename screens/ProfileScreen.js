import { useNavigation } from "@react-navigation/core";
import React, { useContext, createContext, useState, useEffect } from "react";
import { LogInContext } from "../context/LoginContext";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import firebase from "../database/firebaseDB";
import { stylesheet } from "../styles/stylesheet";
const auth = firebase.auth();
const db = firebase.firestore();

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [userImg, setUserImg] = useState("");

  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    setUserId(userId);
    console.log(userId)
  }, []);

  // useEffect(() => {
  //   const user = firebase.auth().currentUser;
  //   const email = user.email;
  //   setUser(email);
  // }, []);

  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged((user) => {
  //     if (user)
  //       navigation.navigate("Profile", { id: user.id, email: user.email });
  //     else navigation.navigate("SignInSignUp");
  //   });
  // }, []);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user)
        navigation.navigate("Profile", { id: user.id, email: user.email });
      else navigation.navigate("SignInSignUp");
    });
  }, []);

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getData();
    });
    getData();
    return removeListener;
  }, [user]);

  async function getData() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    setUser(email);

    if (user) {
      const unsubscribe = await db
        .collection("users")
        .onSnapshot((collection) => {
          const data = collection.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(data);
          setProfile(data.filter((item) => item.email === email));
        });

      return () => unsubscribe();
    }
  }

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("SignInSignUp");
      //console.log("signed out");
      setIsLoggedIn(false);
    });
    // .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((collection) => {
      const data = collection.docs.map((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };

        // console.log(postObject);

        return postObject;
      });

      setAllPosts(data.filter((item) => item.postLikedBy.includes(userId)));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function renderPost({ item }) {
    const postDate = moment(item.created.toDate()).startOf("hour").fromNow();

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
                    source={require("../assets/user.jpg")}
                  />
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
                <Text>User</Text>
              </View>
            </View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
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
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: item
              ? item.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <Text style={stylesheet.text}>
          {item ? "@" + item.username || "@" + "username" : ""}
        </Text>
        <Text style={stylesheet.text}>{item ? item.age || "age" : ""}</Text>
        <Text style={stylesheet.text}>{user}</Text>
      </View>
    );
  }

  return (
    <View>
      <View data={profile} style={styles.profileView}>
        <Text style={stylesheet.title}>Profile</Text>
        <FlatList
          data={profile}
          renderItem={renderItem}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
        {/* <Image style={styles.profilePic} source={require("../assets/user.jpg")} />
        <Text style={stylesheet.text}>{user}</Text> */}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <TouchableOpacity
            style={[stylesheet.button]}
            onPress={() =>
              navigation.navigate("EditProfile"
              // , {
              //   id: id,
              //   userImg: userImg,
              //   username: username,
              //   age: age,
              // }
              )
            }
          >
            <Text style={stylesheet.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={stylesheet.button}>
            <Text onPress={handleSignOut} style={stylesheet.buttonText}>
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={stylesheet.title}>My favourites</Text>
        <FlatList
          data={allPosts}
          renderItem={renderPost}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <Text style={stylesheet.title}>My applications</Text>
        {/* insert applications */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingVertical: 50,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
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

const deviceWidth = Math.round(Dimensions.get("window").width);
