import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firebase from "../database/firebaseDB";
import { stylesheet } from '../styles/stylesheet';


const CreateScreen = () => {
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>Create Screen</Text>
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({})