import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
    // const router = useNavigation();

    return (
        <ImageBackground source={require('../assets/images/home_background.jpeg')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.jpeg')} style={styles.logo} />
                <Text style={styles.title}>WeatherWise</Text>
                <Text style={styles.subtitle}>Stay Informed, Stay Prepared</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.currentButton} onPress={() => router.push('/current')}>
                        <Text style={styles.buttonText}>Current Weather</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forecastButton} onPress={() => router.push('/forecast')}>
                        <Text style={styles.buttonText}>Weather Forecast</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        // color: '#e9eafa',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        color: '#154734',
        fontWeight: 500,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
    currentButton: {
        backgroundColor: '#e87500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    forecastButton: {
        backgroundColor: '#154734',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
