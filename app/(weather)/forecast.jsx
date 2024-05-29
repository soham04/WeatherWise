import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Config from 'react-native-config';
import background from '../../assets/images/home_background.jpeg';
import ForecastCard from '../../components/forecastCard'; // Import the ForecastCard component
import * as Location from 'expo-location';


const apiKey = Config.API_KEY;

const WeatherForecast = () => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // Request location permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                // Get current location coordinates
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;


                // console.log(apiKey);
                const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        appid: '8bfe02f37a709411058126bffc4d3352', // Replace with your OpenWeatherMap API key
                        units: 'metric'
                    }
                });

                // console.log(response);
                setForecast(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchForecast();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error: {error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <ImageBackground source={background} style={styles.background}>

            <SafeAreaView className="w-full p-5" style={styles.container} >
                <View className="bg-white/50 p-5 border-2 border-black rounded-lg">
                    <Text style={styles.title} >5-Day Weather Forecast</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View className="bg-white/50 w-full p-5 rounded-md">
                        {forecast.list.map((item, index) => (
                            <ForecastCard key={index} forecastData={item} onPress={() => handleForecastPress(item)} />

                        ))}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    scrollContainer: {
        alignItems: 'center',
        // margin:1,
        // padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 16,
    },
    forecastItem: {
        width: '100%',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
});

export default WeatherForecast;
