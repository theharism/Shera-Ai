import React, { useEffect } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';

const CheckInternet = ({ isConnected, setIsConnected }) => {

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        // Unsubscribe
        return () => {
            unsubscribe();
        }
    }, [])

    const checkConnection = () => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected)
        });
    }

    return (
        <>
            {isConnected ? null :
                (
                    <View style={styles.container}>
                        <Image
                            source={require('../../assets/animations/no_internet.gif')}
                            style={{ height: '30%', width: '30%', aspectRatio: 1, alignSelf: 'center', marginTop: 200 }}
                        />
                        <Text style={styles.nonet}>No Internet Connection</Text>
                        <TouchableOpacity
                            style={styles.reload}
                            onPress={() => {
                                checkConnection()
                            }}>
                            <Text style={{ color: 'white' }}>Reload</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    nonet: {
        fontSize: 20,
        fontWeight: '600',
        color: 'red',
        alignSelf: 'center',
        marginTop: 20
    },
    reload: {
        backgroundColor: 'white',
        height: 50,
        width: 200,
        alignSelf: 'center',
        marginTop: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default CheckInternet