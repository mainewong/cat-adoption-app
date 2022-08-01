// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     TouchableOpacity,
//     Alert,
//   } from "react-native";
//   import React, { useState, useEffect } from "react";
//   import firebase from "../database/firebaseDB";
//   import { stylesheet } from "../styles/stylesheet";
//   import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//   //const db = firebase.firestore().collection("posts");
  
//   export default function EditScreen({ navigation, route }) {
//     const [id, setId] = useState("");
//     const [catName, setCatName] = useState("");
//     const [catAge, setCatAge] = useState("");
//     const [breed, setBreed] = useState("");
  
//     async function getPost() {
//       const id = route.params.id;
//       const catName = route.params.catName;
//       const catAge = route.params.catAge;
//       const breed = route.params.breed;
//       setId(id);
//       setCatName(catName);
//       setCatAge(catAge);
//       setBreed(breed);
//     }
  
//     useEffect(() => {
//       getPost();
//     }, []);
  
//     async function update() {
//       const editedPost = await firebase
//         .firestore()
//         .collection("posts")
//         .doc(id)
//         .update({
//           catName: catName,
//           catAge: catAge,
//           breed: breed,
//         });
//       navigation.navigate("MyNotices");
//     }
  
//     return (
//       <KeyboardAwareScrollView>
//         <View style={{ margin: 20 }}>
//           <Text style={[stylesheet.label, styles.text]}>Name</Text>
//           <TextInput
//             placeholder={catName}
//             style={stylesheet.input}
//             value={catName}
//             onChangeText={(input) => setCatName(input)}
//           />
//           <Text style={[stylesheet.label, styles.text]}>Age</Text>
//           <TextInput
//             style={stylesheet.input}
//             value={catAge}
//             onChangeText={(input) => setCatAge(input)}
//           />
//           <Text style={[stylesheet.label, styles.text]}>Breed</Text>
//           <TextInput
//             style={stylesheet.input}
//             value={breed}
//             onChangeText={(input) => setBreed(input)}
//           />
//           <TouchableOpacity style={stylesheet.button} onPress={update}>
//             <Text style={stylesheet.buttonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }
  
//   const styles = StyleSheet.create({});
  