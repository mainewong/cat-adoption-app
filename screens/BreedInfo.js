import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, } from "react";
import { Rating } from "react-native-ratings";
import { getCatBreedInfo } from "../api/BreedInfoApi";
import { stylesheet } from "../styles/stylesheet";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../constants/theme";

export default function BreedInfo({ navigation, route }) {

  const [postId, setPostId] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [info, setInfo] = useState([]);

  const id = route.params.id;

  function getBreed() {
    const postId = route.params.post.id;
    const catBreed = route.params.post.breed;
    setPostId(postId);
    setCatBreed(catBreed);
    //console.log(catBreed)
  }

  useEffect(() => {
    getBreed();
  }, []);

  async function getCat() {
    const breeds = await getCatBreedInfo(catBreed);
    //console.log(breeds);
    setInfo(breeds);  
  }

  useEffect(() => {
    getCat();
  }, [catBreed]);

  return (
    <ScrollView>
      <View style={[stylesheet.container, {alignItems: "center", padding: 30 }]}>
        <Text style={stylesheet.title}>{catBreed}</Text>
        {/* <TouchableOpacity style={stylesheet.button} onPress={getCat}>
          <Text>Get breed info</Text>
        </TouchableOpacity> */}
        {info.map((item) => {
          return <Text style={{fontSize: 16, textAlign: "center", marginTop: 5, color: COLORS.grey }} key={item}>{item.description}</Text>;
        })}
        <Text style={[stylesheet.itemLabel, { marginTop: 15 }]}>Temperament</Text>
        {info.map((item) => {
          return <Text style={{fontSize: 16, textAlign: "center", marginTop: 0, color: COLORS.grey }} key={item}>{item.temperament}</Text>;
        })}
        <Text style={[stylesheet.itemLabel, { marginTop: 15 }]}>Origin</Text>
        {info.map((item) => {
          return <Text style={{fontSize: 16, textAlign: "center", marginTop: 0, color: COLORS.grey }} key={item}>{item.origin}</Text>;
        })}
        <Text style={[stylesheet.itemLabel, { marginTop: 15 }]}>Life Span</Text>
        {info.map((item) => {
          return <Text style={{fontSize: 16, textAlign: "center", marginTop: 0, color: COLORS.grey }} key={item}>{item.life_span} years</Text>;
        })}

        {/* RATINGS */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="hand-heart" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Affection Level</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.affection_level}
            />
            })}
          </View>
          
          <View style={styles.iconContainer}>
            <FontAwesome name="child" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Child Friendly</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.child_friendly}
            />
            })}
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="dog" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Dog Friendly</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.dog_friendly}
            />
            })}
          </View>

          <View style={styles.iconContainer}>
          <FontAwesome5 name="bolt" size={30} color="#EE574E" />
          <Text style={stylesheet.itemLabel}>Energy Level</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.energy_level}
            />
            })}
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="brain" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Intelligence</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.intelligence}
            />
            })}
          </View>

          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="volleyball" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Shedding Level</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.shedding_level}
            />
            })}
          </View>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconContainer}>
            <FontAwesome name="users" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Social Needs</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.social_needs}
            />
            })}
          </View>

          <View style={styles.iconContainer}>
            <Ionicons name="volume-medium" size={30} color="#EE574E" />
            <Text style={stylesheet.itemLabel}>Vocalisation</Text>
            {info.map((item) => {
            return <Rating
              type='custom'
              ratingBackgroundColor='lightgrey'
              tintColor="white"
              ratingColor="#FDA946"
              style={styles.ratingContainer}
              key={item}
              ratingCount={5}
              imageSize={25}
              readonly={true}
              startingValue={item.vocalisation}
            />
            })}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    alignSelf: "center",
    marginHorizontal: 25,
  },
  iconContainer: {
    marginTop: 25,
    alignItems: "center"
  }
});
