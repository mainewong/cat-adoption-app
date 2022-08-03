import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebaseDB";
import { stylesheet } from "../styles/stylesheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImageUploader from "../components/ImageUploader";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const db = firebase.firestore().collection("posts");

export default function CreateScreen({ navigation, props }) {
  const [user, setUser] = useState("");
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUser(user.uid);
  }, []);

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
      setImage(result.uri);
    }
  };

  // Monitor route.params for changes and add items to the database
  async function savePost() {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
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
          blob.close();
          return url;
        });
      }
    );

    const newPost = {
      uid: user,
      catName: catName,
      catAge: catAge,
      breed: breed,
      image: image,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.add(newPost);
    Alert.alert("Post published!");
    navigation.navigate("MyNotices");
  }

  return (
    <KeyboardAwareScrollView>
      {/* <PostImagePicker image={props.image} onImagedPicked={setPostImage} /> */}
      {/* <ImageUploader/> */}

      {/* <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      <Button title="Pick an image from camera roll" onPress={pickImage} /> */}

      <View style={imageUploaderStyles.container}>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={pickImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={[stylesheet.label, styles.text]}>Name</Text>
        <TextInput
          style={stylesheet.input}
          value={catName}
          onChangeText={(input) => setCatName(input)}
        />
        <Text style={[stylesheet.label, styles.text]}>Age</Text>
        <TextInput
          style={stylesheet.input}
          value={catAge}
          onChangeText={(input) => setCatAge(input)}
        />
        <Text style={[stylesheet.label, styles.text]}>Breed</Text>
        <TextInput
          style={stylesheet.input}
          value={breed}
          onChangeText={(input) => setBreed(input)}
        />

        {!uploading ? (
          <TouchableOpacity style={stylesheet.button} onPress={savePost}>
            <Text style={stylesheet.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="#000" />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 10,
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