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
import uuid from "react-native-uuid";
import SelectDropdown from "react-native-select-dropdown";
import { getCatBreed } from "../api/CatBreedApi";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const db = firebase.firestore().collection("posts");

export default function CreateScreen({ navigation, props }) {
  const [user, setUser] = useState("");
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [sterilizeStatus, setSterilizeStatus] = useState("");
  const [imageId, setImageId] = useState(uuid.v4());
  const [uploading, setUploading] = useState(false);
  const [postLikedBy, setPostLikedBy] = useState([]);
  const [postAppliedBy, setPostAppliedBy] = useState([]);
  const [userData, setUserData] = useState(null);
  const [breedList, setBreedList] = useState([])
  // const [breedId, setBreedId] = useState("")

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

  // get user data to store username and userImg
  const getUser = async() => {
    const user = firebase.auth().currentUser;
    const currentUser = await firebase.firestore()
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

  // Monitor route.params for changes and add items to the database
  async function savePost() {
    //const imageUri = await url;

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

    //const ref = firebase.storage().ref().child(new Date().toISOString());
    setImageId(uuid.v4());
    const ref = firebase
      .storage()
      .ref()
      .child(imageId + ".png");
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

          const newPost = {
            uid: user,
            catName,
            catAge,
            breed,
            // breedId,
            gender,
            about,
            vaccinationStatus,
            sterilizeStatus,
            image: url,
            imageId,
            postLikedBy,
            postAppliedBy,
            username: userData.username,
            userImg: userData.userImg,
            created: firebase.firestore.Timestamp.now(),
          };
          db.add(newPost);
          Alert.alert("Post published!");
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
      <View style={{ marginBottom: 20 }}>
        <View style={imageUploaderStyles.container}>
          <View
            style={{ justifyContent: "flex-start", width: "40%", margin: 20 }}
          >
            {/* put image uploader here */}
            <View style={{ backgroundColor: "lightgrey", borderRadius: 10 }}>
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150 }}
              />

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
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              width: "45%",
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <Text>Tips:</Text>
            <Text>
              Use an image that fully show that face of the cat to attract more potential adopters!
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 20 }}>
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
          {/* <Text style={[stylesheet.label, styles.text]}>Breed</Text>
          <TextInput
            style={stylesheet.input}
            placeholder="Breed"
            value={breed}
            onChangeText={(input) => setBreed(input)}
          /> */}
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

          {!uploading ? (
            <TouchableOpacity style={stylesheet.button} onPress={savePost}>
              <Text style={stylesheet.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
          {/* <TouchableOpacity style={stylesheet.button} onPress={getCat}>
              <Text style={stylesheet.buttonText}>get cat breed</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});

const imageUploaderStyles = StyleSheet.create({
  container: {
    //elevation: 2,
    //backgroundColor: "black",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 0,
  },
  uploadBtnContainer: {
    opacity: 0.5,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: "30%",
    padding: 5,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
