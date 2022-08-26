import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesheet } from "../styles/stylesheet";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from "expo-image-picker";

//import ProfileImagePicker from "../components/ProfileImagePicker";

import uuid from "react-native-uuid";
import firebase from "../database/firebaseDB";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import { COLORS } from "../constants/theme";
import { ScrollView } from "react-native-gesture-handler";

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;

export default function EditProfileScreen({ navigation, route }) {
  //const [userImg, setUserImg] = useState("");
  const [userImg, setUserImg] = useState("");
  const [profile, setProfile] = useState({});
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState(null);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const getUser = async() => {
    const currentUser = await db
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);

  async function updateProfile() {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", userImg, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("download url: ", url);

          if( url == null && userImg ) {
            url = userImg;
          }

          const editedProfile = firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              age: userData.age,
              username: userData.username,
              name: userData.name,
              userImg: url,
            });
          
          Alert.alert("Profile edited!");
          navigation.navigate("account");
    
          blob.close();
          return url;
        });
      }
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUserImg(result.uri);
    }
  };

  return (
    <KeyboardAwareScrollView>
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "white", paddingVertical: 110 }}>
      <View style={imageUploaderStyles.container}>
        <Image
        source={{ uri: userImg }} style={{ width: 200, height: 200 }}
        />
        <Text>
        {userImg && (
          <Image source={{ uri: userData.userImg }} style={{ width: 200, height: 200 }} />
        )}
        </Text>

        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={pickImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{userData ? "Edit" : "Upload"} image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#333333" size={20} />
        <TextInput
          //data={ profile }
          placeholder="username"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.username : ''}
          onChangeText={(txt) => setUserData({...userData, username: txt})}
          style={[stylesheet.textInput, { marginLeft: 15 }]}
        />
      </View>
      <View style={styles.action}>
      <AntDesign name="idcard" size={24} color="#333333" />
        <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.name : ''}
          onChangeText={(txt) => setUserData({...userData, name: txt})}
          style={[stylesheet.textInput, { marginLeft: 10 }]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="calendar" color="#333333" size={20} />
        <TextInput
          placeholder="age"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.age : ''}
          onChangeText={(txt) => setUserData({...userData, age: txt})}
          style={[stylesheet.textInput, { marginLeft: 15 }]}
        />
      </View>
      {!uploading ? (
        <TouchableOpacity style={[stylesheet.button, { width: "70%", alignSelf: "center" }]} onPress={updateProfile}>
          <Text style={stylesheet.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgrey,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 30,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
