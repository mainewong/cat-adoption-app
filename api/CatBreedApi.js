import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const api_key = "live_YQT6KvLDMb4BG9QJ8P2HcSj3Jq1ctPVzk7ym7klhoR452CJQ5Ml1NgGKp9pqohBG"

// export async function getCatBreed(breed_name) {
//     const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breed_name}&${api_key}`
//     const response = await fetch(url);
//     console.log(await fetch(url))
//     if (!response.ok){
//         throw new Error('Failed to weather!')
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }

  export async function getCatBreed(breed_name) {
    const url = `https://api.thecatapi.com/v1/breeds`
    const response = await fetch(url);
    //console.log(await fetch(url))
    if (!response.ok){
        throw new Error('Failed to weather!')
    }
    const data = await response.json();
    const names = data.map(element=> element.name);
    //const catId = data.map(element=> element.id);
    console.log(names);
    //console.log(catId)
    return names;
  }