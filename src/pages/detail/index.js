import { useLayoutEffect, useState } from 'react'
import {View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'

import {Entypo, AntDesign, Feather} from '@expo/vector-icons'

import { Ingredients } from '../../components/ingredients'
import { Instructions} from '../../components/instructions'

import {VideoView} from '../../components/video'

export function Detail(){
    const route  = useRoute();
    const navigation = useNavigation();

    const [showVideo, setShowVideo] =useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable onPress={ () => console.log('testando')}>
                    <Entypo
                        name='heart'
                        size={28}
                        color='#FF4141'
                    />
                </Pressable>
            )
        })
    }, [navigation, route.params?.data])

    function handleOpenVideo(){
        setShowVideo(true)
    }

    async function shareRecipe(){
        try{
            await Share.share()
        }catch(error){

        }
    }

    return (
        <ScrollView contentContainerStyle={{paddingBottom:14}}style ={ styles.container } showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.playIcon}>
                    <AntDesign name="playcircleo" size={60} color="#FAFAFA"/>
                </View>
                <Image source={{uri: route.params?.data.cover}}
                style={styles.cover}
                />
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredientsText}>Ingredientes ({route.params?.data.total_ingredients})</Text>
                </View>

                <Pressable onPress={shareRecipe}>
                    <Feather name='share-2' size={24} color='#121212'/>
                </Pressable>

            </View>

                {route.params?.data.ingredients.map((item) => (
                    <Ingredients key={item.id} data={item} />
                ))}

            <View style={styles.instructionsArea}>
                <Text style={styles.instructionsText}>Modo de preparo</Text>
            </View>

                {route.params?.data.instructions.map((item, index) => (
                    <Instructions key={item.id} data={item} index={index}/>
                ))}
    
            <Modal visible={showVideo} animationType='slide'>
                <VideoView
                handleClose={() => setShowVideo(false)}
                videoUrl={route.params?.data.video}
                />
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F9FF',
        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14
    },
    cover:{
        height: 200,
        borderRadius: 14,
        width: '100%'
    },
    playIcon:{
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 22,
        marginTop: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4
    },
    ingredientsText:{
        marginBottom: 14
    },
    headerDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14
    },
    instructionsArea:{
        backgroundColor: "#4cbe6c",
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        marginBottom: 14
    },
    instructionsText:{
        fontSize: 18,
        fontWeight: "500",
        color: '#FFF',
        marginRight: 8
    }
})