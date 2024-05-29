import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import background from '../../assets/images/home_background.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWind, faLocationDot, faEye, faDroplet, faL } from '@fortawesome/free-solid-svg-icons'
import Compass from '../../components/compass'
import Weathercard from '../../components/card'


function getWindDirection(deg) {
    if (deg >= 337.5 || deg < 22.5) return 'N';
    if (deg >= 22.5 && deg < 67.5) return 'NE';
    if (deg >= 67.5 && deg < 112.5) return 'E';
    if (deg >= 112.5 && deg < 157.5) return 'SE';
    if (deg >= 157.5 && deg < 202.5) return 'S';
    if (deg >= 202.5 && deg < 247.5) return 'SW';
    if (deg >= 247.5 && deg < 292.5) return 'W';
    if (deg >= 292.5 && deg < 337.5) return 'NW';
}

const CurrentWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Request location permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                // Get current location coordinates
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // Fetch weather data based on current location coordinates
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        appid: '8bfe02f37a709411058126bffc4d3352', // Replace with your OpenWeatherMap API key
                        units: 'metric'
                    }
                });
                setWeather(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeather();
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

            <SafeAreaView className="w-full p-5" style={styles.container}>
                <View className="w-full bg-white/50 justify-start flex-col content-center p-3 rounded-md m-3">

                    <View className="flex-row justify-center">
                        <View className="justify-center content-center">
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#f02424", }} />
                        </View>
                        <Text className="text-center  text-2xl px-1">{weather.name} [{formatTimezone(weather.timezone)}]</Text>
                    </View>
                    <Text className="text-center font-bold text-6xl">{weather.main.temp}°</Text>
                    <Text className="text-center text-lg">{weather.weather[0].main}</Text>
                    <Text className="text-center text-m">H:{weather.main.temp_max}°    L:{weather.main.temp_min}°</Text>

                </View>

                <ScrollView horizontal={false} className="w-full flex-col">

                    <View className=" bg-white/50 flex-1 justify-start flex-col content-start p-3 rounded-md">
{/* 
                        <View className="bg-white rounded-lg shadow-lg px-3 m-2 ">
                            <View className="flex flex-row items-center mb-1 w-full">
                                <FontAwesomeIcon icon={faWind} style={{ color: "#000", fontSize: 24 }} />
                                <Text className="text-lg ml-2 ">Wind</Text>
                            </View>
                            <Text className="text-3xl font-bold text-center mb-2 w-full">{weather.wind.speed}m/s | {getWindDirection(weather.wind.deg)}</Text>

                            <Compass direction={weather.wind.deg} />
                        </View> */}

                        <Weathercard type="wind" value={{ speed: weather.wind.speed, deg: weather.wind.deg }} />
                        <Weathercard type="visibility" value={weather.visibility / 1000} />
                        <Weathercard type="humidity" value={weather.main.humidity} />

                        {/* 
                        <View className="bg-white rounded-lg shadow-lg px-3 m-2 ">
                            <View className="flex flex-row items-center mb-1 w-full">
                                <FontAwesomeIcon icon={faEye} style={{ color: "#000", fontSize: 24 }} />
                                <Text className="text-lg ml-2 ">Visiblity</Text>
                            </View>


                            <Text className="text-3xl font-bold text-center mb-2 w-full">{weather.visibility / 1000} km </Text>
                        </View> */}

                        {/* <View className="bg-white rounded-lg shadow-lg px-3 m-2 ">
                            <View className="flex flex-row items-center mb-1 w-full">
                                <FontAwesomeIcon icon={faDroplet} style={{ color: "#000", fontSize: 24 }} />
                                <Text className="text-lg ml-2 ">Humidity</Text>
                            </View>
                      

                            <Text className="text-3xl font-bold text-center mb-2 w-full">{weather.main.humidity}% </Text>
                        </View> */}

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
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
    },

    sectionTitle: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    }
});

function formatTimezone(offsetSeconds) {
    const hours = Math.abs(offsetSeconds / 3600);
    const minutes = Math.abs((offsetSeconds % 3600) / 60);
    const sign = offsetSeconds < 0 ? '-' : '+';

    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export default CurrentWeather;
