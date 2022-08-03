import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ImagePicker from "react-native-image-picker";

const PostImagePicker = ({ image, onImagePicked }) => {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image]);

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an image", maxWdith: 800, maxHeight: 600 },
      (response) => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri);
          setSelectedImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={this.pickImageHandler} />
      </View>
    </View>
  );
};

export default PostImagePicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
});
