import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../database/firebaseDB";
import { stylesheet } from "../styles/stylesheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const db = firebase.firestore();

export default function EditScreen({ navigation, route }) {
  const id = route.params.id;
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [postId, setPostId] = useState("");
  const [postData, setPostData] = useState(null);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  function getDetails() {
    const postId = route.params.post.id;
    const catName = route.params.post.catName;
    const catAge = route.params.post.catAge;
    const breed = route.params.post.breed;
    const image = route.params.post.image;
    setPostId(postId);
    setCatName(catName);
    setCatAge(catAge);
    setBreed(breed);
    setImage(image);
  }

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (id) {
      const unsubscribe = db.collection("posts").onSnapshot((collection) => {
        const data = collection.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(data);
      });
      return () => unsubscribe();
    }
    //}, [id]);
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

  async function updatePost() {
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

          const editedPost = firebase
            .firestore()
            .collection("posts")
            .doc(postId)
            .update({
              catName: catName,
              catAge: catAge,
              breed: breed,
              image: url,
            });
          Alert.alert("Post edited!");
          navigation.navigate("MyNotices");

          blob.close();
          return url;
        });
      }
    );
  }

  return (
    <KeyboardAwareScrollView>
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
        <TouchableOpacity style={stylesheet.button} onPress={updatePost}>
          <Text style={stylesheet.buttonText}>Save</Text>
        </TouchableOpacity>
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