import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import { stylesheet } from "../styles/stylesheet";
import { Checkbox, RadioButton } from "react-native-paper";

export default function ApplyScreen({ navigation, route }) {
  const id = route.params.id;
  const [value, setValue] = useState("yes");
  const [catName, setCatName] = useState("");
  const [postId, setPostId] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  function getDetails() {
    const postId = route.params.post.id;
    const catName = route.params.post.catName;
    setPostId(postId);
    setCatName(catName);
  }

  useEffect(() => {
    getDetails();
  }, []);

  const apply = () => {
    if ( value == "no") {
        alert("You are required to agree to the terms before we can process your application")
    } else 
    setShowApplyModal(true);
  };

  const closeModal = () => {
    setShowApplyModal(false);
    navigation.navigate("Profile");
  };
  return (
    <KeyboardAwareScrollView>
      <View style={[stylesheet.container, { padding: 20 }]}>
        <View style={{ width: "100%", marginVertical: 10 }}>
          <Text style={[stylesheet.label, styles.text]}>Cat</Text>
          <TextInput
            style={[stylesheet.input, {backgroundColor: "#e5e5e5"}]}
            value={catName}
            editable={false}
            //onChangeText={(input) => setBreed(input)}
          />
          <Text style={[stylesheet.label, styles.text]}>Your Full Name</Text>
          <TextInput
            style={stylesheet.input}
            //value={breed}
            //onChangeText={(input) => setBreed(input)}
          />
          <Text style={[stylesheet.label, styles.text]}>Contact Number</Text>
          <TextInput
            style={stylesheet.input}
            //value={breed}
            //onChangeText={(input) => setBreed(input)}
          />
        </View>
        <Text style={stylesheet.label}>
          Please read the following terms to before proceeding
        </Text>
        <Text style={{ marginVertical: 15 }}>
          1. House visit is a mandatory process before your adoption request can
          be accepted.
        </Text>
        <Text style={{ marginVertical: 15 }}>
          2. You are required to take all measures to ensure your cat is kept
          strictly and safely indoors? E.g. Meshing up window.
        </Text>
        <Text style={{ marginVertical: 15 }}>
          3. It is mandatory to neutur or spay cat when it is time to do so (if
          cat is currently not fixed).
        </Text>
        <Text style={{ fontWeight: "bold" }}>
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
          onPress={() => {
            apply();
          }}
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
                backgroundColor: "lightgrey",
                width: "90%",
                borderRadius: 20,
                padding: 30,
                alignItems: "center",
              }}
            >
              <Text style={stylesheet.title}>Application submitted!</Text>
              <Text style={{ textAlign: "center" }}>
                We have received your application, you will be contacted by the
                noticer within 2-3 working days!
              </Text>
              <TouchableOpacity style={[stylesheet.button, { width: "80%" }]}>
                <Text
                  style={stylesheet.buttonText}
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

const styles = StyleSheet.create({});
