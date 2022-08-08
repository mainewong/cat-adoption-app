import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
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
} from 'react-native';

import uuid from 'react-native-uuid';
import firebase from "../database/firebaseDB";

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;


export default function ProfileImagePicker() {
    return(
        <Text>Picker</Text>
    )
}

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
});