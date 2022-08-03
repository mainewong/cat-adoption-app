import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { stylesheet } from "../styles/stylesheet";
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from "../database/firebaseDB";
const db = firebase.firestore();


  const DiscoverDetailsScreen = ( props )  => {

    const navigation = useNavigation();
    //const route = useRoute();
  
    const [post, setPost] = useState({catName: "", catAge: ""});
    const getPostById = async (id) => {
      const dbRef = db.collection("posts").doc(id);
      const doc = await dbRef.get();
      const post = doc.data();
      setPost({
          ...post,
          id:doc.id,
      })
    };
  
    useEffect(() => {
      getPostById(props.route.params.id);
    }, []);
  
    return <View style={stylesheet.container}>
      <Image style={{ width: 350, height: 350, alignSelf: "center", borderRadius: 10 }}
               source={{ uri: post.image }} />
      <Text>{post.catName}</Text>
      <Text>{post.catAge}</Text>
      <Text>{post.breed}</Text>
      {/* <TouchableOpacity style={stylesheet.button}
          onPress={() =>
            //navigation.navigate("Edit")
            navigation.navigate("Edit", { post: post })
          }
        >
  
          <Text style={stylesheet.buttonText}>Edit Post</Text>
          
      </TouchableOpacity> */}
      
    </View>;
  
  
  };
  
  export default DiscoverDetailsScreen;
  
  const styles = StyleSheet.create({});
  