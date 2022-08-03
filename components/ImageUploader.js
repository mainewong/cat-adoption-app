import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

export default function ImagePickerExample() {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const uploadImage = async () => {
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
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {!uploading ? (
        <Button title="upload" onPress={uploadImage} />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </View>
  );
}
