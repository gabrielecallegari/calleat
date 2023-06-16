import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppIntroSlider from "react-native-app-intro-slider";

export default function Main(){

    const stile = Platform.OS === 'ios' ? styles.ios : styles.android

    const [ nuovo , setNuovo ] = useState(true)

    const svan = useRef(new Animated.Value(1)).current

    const onDone = ()=>{
        Animated.timing(svan, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(()=>{setNuovo(false)});

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
                <Animated.View style={[{flex:1},{opacity: svan}]} >
                    <AppIntroSlider 
                    data={initialSlides} 
                    renderItem={Gallery} 
                    onDone={onDone} 
                    activeDotStyle={{backgroundColor: '#FF640D'}} 
                    renderNextButton={Next}
                    renderDoneButton={Done}
                    
                    />
                </Animated.View>
            }
            

            {!nuovo &&
                <SafeAreaView style={stile.home.main}>
                    <View style={stile.home.header.main}>
                        <View style={stile.home.header.title}>
                            <Text style={stile.home.header.titleText}>Hello,</Text>
                            <Text style={stile.home.header.titleText}>{window.user === undefined ? "User" : window.user}.</Text>
                            <Text style={stile.home.header.subtitleText}>What do you want to eat?</Text>
                        </View>

                        <View style={stile.home.header.profile}>
                            <Pressable style={{ marginTop: 10 ,borderRadius: 50, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderColor: '#FF640D', borderWidth: 2 }}>
                                <Image source={require('../assets/profile.png')} style={{}} />
                            </Pressable>
                        </View>
                        
                    </View>
                </SafeAreaView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    ios: {
        home:{
            main:{
                height:'100%',
                backgroundColor: 'white',
                marginLeft: 20,
                marginRight: 20,
            },

            header: {
                main: {
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                },

                titleText: {
                    fontSize: 50,
                    fontWeight: 600,
                    color: '#2F2E41',
                    letterSpacing: 5
                },

                subtitleText: {
                    fontSize: 20,
                    letterSpacing: 2,
                    marginTop: 10
                }
            }
        }
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