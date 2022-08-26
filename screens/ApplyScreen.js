import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import { stylesheet } from "../styles/stylesheet";
import { Checkbox, RadioButton, useTheme } from "react-native-paper";
import RadioGroup from 'react-native-radio-buttons-group';
import firebase from "../database/firebaseDB";
import { COLORS } from "../constants/theme";

const db = firebase.firestore().collection("applications");


export default function ApplyScreen({ navigation, route }) {
//   const radioButtonsData = [{
//     id: '1', // acts as primary key, should be unique and non-empty string
//     label: 'Public Housing (HDB)',
//     value: 'Public Housing (HDB)'
//   }, {
//     id: '2',
//     label: 'Condominium',
//     value: 'Condominium'
//   }, {
//     id: '3',
//     label: 'Private Housing',
//     value: 'Private Housing'
//   },
// ]

  const id = route.params.id;
  const [user, setUser] = useState("")
  const [value, setValue] = useState("yes");
  //const [houseType, setHouseType] = useState(radioButtonsData);
  const [houseType, setHouseType] = useState("Public Housing (HDB)");
  const [catName, setCatName] = useState("");
  const [postId, setPostId] = useState("");
  const [catOwner, setCatOwner] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [applyName, setApplyName] = useState("");
  const [image, setImage] = useState("");
  const [applyContact, setApplyContact] = useState("")
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUser(user.uid);
  }, []);

  function getDetails() {
    const postId = route.params.post.id;
    const catName = route.params.post.catName;
    const catOwner = route.params.post.uid;
    const ownerUsername = route.params.post.username;
    const image = route.params.post.image;
    setPostId(postId);
    setCatName(catName);
    setCatOwner(catOwner);
    setOwnerUsername(ownerUsername);
    setImage(image);
  }

  useEffect(() => {
    getDetails();
  }, []);

  async function apply(PostID) {
    if ( value == "no") {
        alert("You are required to agree to the terms before we can process your application")
    } else 
    setShowApplyModal(true);

    const newPost = {
      uid: user,
      image,
      catName,
      postId,
      catOwner,
      ownerUsername,
      applyName,
      applyContact,
      houseType,
      created: firebase.firestore.Timestamp.now(),
    };
    db.add(newPost);
    //navigation.navigate("MyNotices");

    const post = await firebase.firestore().collection("posts").doc(PostID).get();
    const postData = post.data();
    const postApplyUid = postData.postAppliedBy;
    // const postLikesCount = postLikesUid.length;

    if (!postApplyUid.includes(user)) {
      await firebase.firestore()
        .collection("posts")
        .doc(PostID)
        .update({
          postAppliedBy: [user, ...postApplyUid],
        });
    } else {
      await firebase.firestore()
        .collection("posts")
        .doc(PostID)
        .update({
          postAppliedBy: postApplyUid.filter((uid) => uid !== user),
        });
    }
  };

  const closeModal = () => {
    setShowApplyModal(false);
    navigation.navigate("Profile");
  };

  function onPressRadioButton(radioButtonsArray) {
      setHouseType(radioButtonsArray);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={[stylesheet.container, { padding: 20 }]}>
        <View style={{ width: "100%", marginVertical: 10 }}>
        <Image style={styles.catRoundImg} source={{ uri: image }}/>
        <Text style={[stylesheet.text]}>Cat Name</Text>
          <TextInput
            style={[stylesheet.input, {backgroundColor: "#e5e5e5"}]}
            value={catName}
            editable={false}
            //onChangeText={(input) => setBreed(input)}
          />
          <Text style={[stylesheet.text, {marginTop: 10}]}>Your Full Name</Text>
          <TextInput
            style={stylesheet.input}
            //value={breed}
            onChangeText={(input) => setApplyName(input)}
          />
          <Text style={[stylesheet.text, {marginTop: 10}]}>Contact Number</Text>
          <TextInput
            style={stylesheet.input}
            //value={breed}
            onChangeText={(input) => setApplyContact(input)}
          />
        </View>

        <Text style={[stylesheet.text, {marginTop: 10}]}>House Type</Text>
        {/* <RadioGroup
            containerStyle={{ alignItems: "left" }}
            radioButtons={houseType} 
            onPress={onPressRadioButton}
        /> */}
         <RadioButton.Group
          onValueChange={(value) => setHouseType(value)}
          value={houseType}
        >
          <RadioButton.Item label="Public Housing (HDB)" value="Public Housing (HDB)" />
          <RadioButton.Item label="Condominium" value="Condominium" />
          <RadioButton.Item label="Private Housing" value="Private" />
        </RadioButton.Group>

        <Text style={[stylesheet.text, {marginTop: 10, fontWeight: "bold" }]}>
          Please read the following terms to before proceeding
        </Text>
        <Text style={[stylesheet.text, {marginTop: 10}]}>
          1. House visit is a mandatory process before your adoption request can
          be accepted.
        </Text>
        <Text style={[stylesheet.text, {marginTop: 10}]}>
          2. You are required to take all measures to ensure your cat is kept
          strictly and safely indoors? E.g. Meshing up window.
        </Text>
        <Text style={[stylesheet.text, {marginTop: 10}]}>
          3. It is mandatory to neutur or spay cat when it is time to do so (if
          cat is currently not fixed).
        </Text>
        <Text style={[stylesheet.text, {marginTop: 10, fontWeight: "bold" }]}>
          Do you agree to the terms?
        </Text>
        <RadioButton.Group
          onValueChange={(value) => setValue(value)}
          value={value}
        >
          <RadioButton.Item label="Yes" value="yes" />
          <RadioButton.Item label="No" value="no" />
        </RadioButton.Group>
        <TouchableOpacity
          style={[stylesheet.button, {marginTop: 10, width: "100%" }]}
          onPress={() => apply(postId)}
        >
          <Text style={stylesheet.buttonText}>Apply</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showApplyModal}
        >
          <View
            style={{
              flex: 1,
              background: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.lightbeige,
                borderWidth: 1,
                borderColor: COLORS.darkbeige,
                width: "90%",
                borderRadius: 20,
                padding: 30,
                alignItems: "center",
              }}
            >
              <Text style={stylesheet.title}>Application submitted!</Text>
              <Text style={[stylesheet.text, {marginTop: 5, textAlign: "center"}]}>
                We have received your application, you will be contacted within 2-3 working days!
              </Text>
              <TouchableOpacity style={[stylesheet.colorOutlineButton, { width: "80%" }]}>
                <Text
                  style={stylesheet.colorOutlineButtonText}
                  onPress={() => {
                    closeModal();
                  }}
                >
                  View applications
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  catRoundImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 20,
  }
});
