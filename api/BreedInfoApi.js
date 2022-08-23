import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const api_key = "live_YQT6KvLDMb4BG9QJ8P2HcSj3Jq1ctPVzk7ym7klhoR452CJQ5Ml1NgGKp9pqohBG"

  export async function getCatBreedInfo(catBreed) {
    const url = `https://api.thecatapi.com/v1/breeds/search?q=${catBreed}`
    const response = await fetch(url);
    //console.log(await fetch(url))
    if (!response.ok){
        throw new Error('Failed to weather!')
    }
    const data = await response.json();
    // console.log(data)
   // const description = data.map(element=> element.description);
    return data
    
  }