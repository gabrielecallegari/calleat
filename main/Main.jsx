import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppIntroSlider from "react-native-app-intro-slider";

export default function Main(){

    const [ nuovo , setNuovo ] = useState(true)

    const onDone = ()=>{
        setNuovo(false)
    }


    const initialSlides = [
        {
            image: require('../assets/firstslide.png'),
            title: 'Welcome to Bhook',
            text: 'Food delivery app that helps you to get the best dishes quickly and in time for your nearest restaurant.'
        },
        {
            image: require('../assets/secondslide.png'),
            title: 'Enjoy fast delivery',
            text: 'We offer 45 minutes delivery guarantee or the food will delivered for free.'
        },
        {
            image: require('../assets/thirdslide.png'),
            title: 'Order best dishes',
            text: 'Your order will be immediately collected and sent by our courler'
        },
    ]

    const Gallery = ({item}) => {
        return (
            <View style={styles.slidePanel.main} >
                <Image style={styles.slidePanel.image}  source={item.image}/>
                <Text style={styles.slidePanel.titolo} >{item.title}</Text>
                <Text style={styles.slidePanel.text} >{item.text}</Text>
            </View>
        )
    }

    function Next() {
        return <Text style={{color: '#FF640D', fontSize: 20, marginRight: 10, marginTop: 13, fontWeight: 500}}>Next</Text>
        
    }

    function Done() {
        return <Text style={{color: '#FF640D', fontSize: 20, marginRight: 10, marginTop: 13, fontWeight: 500}}>Done</Text>
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('olduser')
            if(value !== null) {
            setNuovo(true)
            }
        } catch(e) {
            // error reading value
            console.error(e);
        }
    }

    useEffect(()=>{
        getData()
    })

    
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            {nuovo && 
                <AppIntroSlider 
                data={initialSlides} 
                renderItem={Gallery} 
                onDone={onDone} 
                activeDotStyle={{backgroundColor: '#FF640D'}} 
                renderNextButton={Next}
                renderDoneButton={Done}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    ios: {
        
    },
    android: {
        
    },

    slidePanel : {
        main: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 20
        },
        image: {
            width: '100%',
            height: 200,
            resizeMode: 'contain',
        },

        titolo: {
            fontSize: 32,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 10
        },
        text: {
            fontSize: 17,
            fontWeight: 400,
            color: 'black',
            marginTop: 10,
            textAlign: 'center'
        }
    }
  });