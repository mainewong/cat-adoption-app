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

const db = firebase.firestore().collection("users");

const EditProfileScreen = () => {
  return (
    <View>
      <Text>EditProfileScreen</Text>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({})