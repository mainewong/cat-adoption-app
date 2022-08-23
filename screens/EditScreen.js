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
import uuid from "react-native-uuid";
import SelectDropdown from "react-native-select-dropdown";
import { getCatBreed } from "../api/CatBreedApi";

const db = firebase.firestore();

export default function EditScreen({ navigation, route }) {
  const id = route.params.id;
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [postId, setPostId] = useState("");
  const [postData, setPostData] = useState(null);
  const [image, setImage] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [sterilizeStatus, setSterilizeStatus] = useState("");
  const [imageId, setImageId] = useState(uuid.v4());
  const [breedList, setBreedList] = useState([])
  const [uploading, setUploading] = useState(false);

  function getDetails() {
    const postId = route.params.post.id;
    const catName = route.params.post.catName;
    const catAge = route.params.post.catAge;
    const breed = route.params.post.breed;
    const gender = route.params.post.gender;
    const about = route.params.post.about;
    const image = route.params.post.image;
    const vaccinationStatus = route.params.post.vaccinationStatus;
    const sterilizeStatus = route.params.post.sterilizeStatus;
    setPostId(postId);
    setCatName(catName);
    setCatAge(catAge);
    setAbout(about);
    setGender(gender);
    setBreed(breed);
    setImage(image);
    setVaccinationStatus(vaccinationStatus);
    setSterilizeStatus(sterilizeStatus);
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
    
    const ref = firebase.storage().ref().child(imageId + ".png");
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
              catName,
              catAge,
              breed,
              gender,
              about,
              vaccinationStatus,
              sterilizeStatus,
              image: url,
              imageId,
            });
          Alert.alert("Post edited!");
          navigation.navigate("MyNotices");

          blob.close();
          return url;
        });
      }
    );
  }

  async function getCat(){
    const res = await getCatBreed(breed);
    setBreedList(res);
    console.log(res);
  }

  useEffect(() => {
   getCat()
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={imageUploaderStyles.container}>
        <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />

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
        {/* BASIC INFO */}
        <Text style={[stylesheet.itemLabel, { marginTop: 20 }]}>
            BASIC INFO
          </Text>
          <Text style={[stylesheet.label, styles.text]}>Name</Text>
          <TextInput
            style={stylesheet.input}
            placeholder="Name"
            value={catName}
            onChangeText={(input) => setCatName(input)}
          />
          <Text style={[stylesheet.label, styles.text]}>Age</Text>
          <TextInput
            placeholder="Age"
            style={stylesheet.input}
            value={catAge}
            onChangeText={(input) => setCatAge(input)}
          />
          <Text style={[stylesheet.label, styles.text]}>Breed</Text>
          <SelectDropdown
            buttonStyle={stylesheet.dropdown1BtnStyle}
            data={breedList}
            onSelect={(selectedItem, index) => {
              setBreed(selectedItem)
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <Text style={[stylesheet.label, styles.text]}>Gender</Text>
          <SelectDropdown
            buttonStyle={stylesheet.dropdown1BtnStyle}
            data={["Male", "Female"]}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <Text style={[stylesheet.label, styles.text]}>About the cat</Text>
          <TextInput
            multiline
            numberOfLines={3}
            style={[stylesheet.input, { height: 65 }]}
            placeholder="Character, temperament etc."
            value={about}
            onChangeText={(input) => setAbout(input)}
            autoCorrect={true}
          />

          {/* HEALTH  */}
          <Text style={[stylesheet.itemLabel, { marginTop: 20 }]}>HEALTH</Text>
          <Text style={[stylesheet.label, styles.text]}>
            Vaccination Status
          </Text>
          <SelectDropdown
            buttonStyle={stylesheet.dropdown1BtnStyle}
            data={["Vaccinated", "Non-vaccinated"]}
            onSelect={(selectedItem, index) => {
              setVaccinationStatus(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />

          <Text style={[stylesheet.label, styles.text]}>Sterilized</Text>
          <SelectDropdown
            buttonStyle={stylesheet.dropdown1BtnStyle}
            data={["Sterilized", "Non-Sterilized"]}
            onSelect={(selectedItem, index) => {
              setSterilizeStatus(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        {/* <Text style={[stylesheet.label, styles.text]}>Name</Text>
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
        /> */}
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
    height: 180,
    width: 180,
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