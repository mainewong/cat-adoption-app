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
  ScrollView
} from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import firebase from "../database/firebaseDB";
import { stylesheet } from "../styles/stylesheet";
import { COLORS } from "../constants/theme";
import { FontAwesome } from '@expo/vector-icons';
import FavouritesScreen from "./FavouritesScreen";
import ApplicationsScreen from "./ApplicationsScreen";
import ApplicationsReceivedScreen from "./ApplicationsReceivedScreen";
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
    //console.log(userId);
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
          //console.log(data);
          setProfile(data.filter((item) => item.email === email));
        });

      return () => unsubscribe();
    }
  }

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("SignInSignUp");
      //console.log("signed out");
      //setIsLoggedIn(false);
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

  function renderItem({ item }) {
    return (
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: item
              ? item.userImg ||
                "https://m.medigatenews.com/resources/img/add_user.png"
              : "https://m.medigatenews.com/resources/img/add_user.png",
          }}
        />
        <Text style={[stylesheet.textWhite, {fontWeight: "700"}]}>
          {item ? "@" + item.username || "No username recorded" : ""}
        </Text>
        <Text style={[stylesheet.textWhite, {fontSize: 25, marginTop: 5}]}>{item ? item.name || "No name recorded" : ""}</Text>
        <Text style={stylesheet.textWhite}>{item ? item.age + " years old" || "No age recorded" : ""}</Text>
        <Text style={stylesheet.textWhite}>{user}</Text>
      </View>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <ScrollView nestedScrollEnabled = {true}>
      <View data={profile} style={styles.profileView}>
        <FlatList
          data={profile}
          renderItem={renderItem}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
        {/* <Image style={styles.profilePic} source={require("../assets/user.jpg")} />
        <Text style={stylesheet.text}>{user}</Text> */}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ marginHorizontal: 5}}>
            <TouchableOpacity
              style={[stylesheet.outlineButton]}
              onPress={() =>
                navigation.navigate(
                  "EditProfile"
                  // , {
                  //   id: id,
                  //   userImg: userImg,
                  //   username: username,
                  //   age: age,
                  // }
                )
              }
            >
              <Text style={stylesheet.outlineButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 5}}>
            <TouchableOpacity onPress={handleSignOut} style={stylesheet.button}>
              <Text style={stylesheet.buttonText}>
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, height: 400, }}>    
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Your Favourites') {
            iconName = "heart" 
          } else if (route.name === 'Your Applications') {
            iconName = "check-square"
          } else if (route.name === 'Adoptions Applicants') {
            iconName = "envelope-open"
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={22} color={COLORS.red} />;
        },
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "white",
        tabBarInactiveTintColor: COLORS.purple,
        tabBarActiveTintColor: COLORS.red,
        tabBarIndicatorStyle: {backgroundColor: COLORS.yellow}
       
      })}>
          <Tab.Screen name="Your Favourites" component={FavouritesScreen} />
          <Tab.Screen name="Your Applications" component={ApplicationsScreen} />
          <Tab.Screen name="Adoptions Applicants" component={ApplicationsReceivedScreen} />
        </Tab.Navigator>
      </View>
      
      
      {/* <View>
        <Text style={stylesheet.title}>My favourites</Text>
        <FlatList
          data={allPosts}
          renderItem={renderPost}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
    </ScrollView>
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
    backgroundColor: COLORS.purple,
    paddingVertical: 30,
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
