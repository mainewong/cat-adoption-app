import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, } from "react";
import { Rating } from "react-native-ratings";
import { getCatBreedInfo } from "../api/BreedInfoApi";
import { stylesheet } from "../styles/stylesheet";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <View>
        <Text style={stylesheet.title}>{catBreed}</Text>
        {/* <TouchableOpacity style={stylesheet.button} onPress={getCat}>
          <Text>Get breed info</Text>
        </TouchableOpacity> */}
        <Text style={stylesheet.itemLabel}>Description</Text>
        {info.map((item) => {
          return <Text key={item}>{item.description}</Text>;
        })}
        <Text style={stylesheet.itemLabel}>Temperament</Text>
        {info.map((item) => {
          return <Text key={item}>{item.temperament}</Text>;
        })}
        <Text style={stylesheet.itemLabel}>Origin</Text>
        {info.map((item) => {
          return <Text key={item}>{item.origin}</Text>;
        })}
        <Text style={stylesheet.itemLabel}>Life Span</Text>
        {info.map((item) => {
          return <Text key={item}>{item.life_span} years</Text>;
        })}

        {/* RATINGS */}
        <Text style={stylesheet.itemLabel}>Affection Level</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.affection_level}
        />
        })}

        <Text style={stylesheet.itemLabel}>Child Friendly</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.child_friendly}
        />
        })}

        <Text style={stylesheet.itemLabel}>Dog Friendly</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.dog_friendly}
        />
        })}

        <Text style={stylesheet.itemLabel}>Energy Level</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.energy_level}
        />
        })}

        <Text style={stylesheet.itemLabel}>Intelligence</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.intelligence}
        />
        })}

        <Text style={stylesheet.itemLabel}>Shedding Level</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.shedding_level}
        />
        })}

        <Text style={stylesheet.itemLabel}>Social Needs</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.social_needs}
        />
        })}

        <Text style={stylesheet.itemLabel}>Vocalisation</Text>
        {info.map((item) => {
        return <Rating
          type='custom'
          ratingBackgroundColor='lightgrey'
          tintColor="#eeeeee"
          ratingColor="black"
          style={styles.ratingContainer}
          key={item}
          ratingCount={5}
          imageSize={30}
          readonly={true}
          startingValue={item.vocalisation}
        />
        })}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    alignSelf: "left",
  }
});
