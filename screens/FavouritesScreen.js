import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from "moment";
import { Card } from "react-native-paper";
import { stylesheet } from '../styles/stylesheet';
import { auth } from '../database/firebaseDB';
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

export default function FavouritesScreen( {navigation} ) {
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    setUserId(userId);
    //console.log(userId);
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((collection) => {
      const data = collection.docs.map((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };

        // console.log(postObject);

        return postObject;
      });

      setAllPosts(data.filter((item) => item.postLikedBy.includes(userId)));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function renderPost({ item }) {
    const postDate = moment(item.created.toDate()).startOf("hour").fromNow();

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DiscoverDetails", {
            id: item.id,
          })
        }
      >
        <View
          style={{
            padding: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: "#ccc",
            //borderBottomWidth: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Card>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            >
              <View>
                <Text>
                  <Image
                    style={styles.userIcon}
                    source={require("../assets/user.jpg")}
                  />
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
                <Text>User</Text>
              </View>
            </View>
            <Image
              style={ styles.image }
              source={{ uri: item.image }}
            />
            <View style={{ margin: 10 }}>
              <Text style={stylesheet.label}>{item.catName}</Text>
              <Text style={[stylesheet.smallLabel, { marginRight: 20 }]}>
                  {item.catAge + " year old"}
                </Text>
              
              {/* <TouchableOpacity onPress={() => likePost( item.id )}>
                  <Ionicons name="heart-outline" size={24} />          
               </TouchableOpacity> */}
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
        <FlatList
          data={allPosts}
          renderItem={renderPost}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
        />
      
    </View>
  )
}
const deviceWidth = Math.round(Dimensions.get("window").width);

const favImg = (deviceWidth-40) / 2
const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    width: favImg ,
    height: favImg ,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 75,
  },
});


