import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { stylesheet } from "../styles/stylesheet";

const FavouriteScreen = () => {
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>My Favourites</Text>
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({})