import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTemperatureLow, faTemperatureHigh, faCloudRain, faWind } from '@fortawesome/free-solid-svg-icons';

const ForecastCard = ({ forecastData, onPress }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric' });
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>{formatDate(forecastData.dt_txt)}</Text>
                <Text style={styles.temp}>
                    <FontAwesomeIcon icon={faTemperatureLow} size={16} /> {forecastData.main.temp_min.toFixed(1)}°C -
                    <FontAwesomeIcon icon={faTemperatureHigh} size={16} /> {forecastData.main.temp_max.toFixed(1)}°C
                </Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.weather}>{forecastData.weather[0].description}</Text>
                <View style={styles.info}>
                    <FontAwesomeIcon icon={faCloudRain} size={16} style={styles.icon} />
                    <Text>{forecastData.rain ? `${forecastData.rain['3h']} mm` : 'No rain'}</Text>
                </View>
                <View style={styles.info}>
                    <FontAwesomeIcon icon={faWind} size={16} style={styles.icon} />
                    <Text>{forecastData.wind.speed} m/s</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 14,
    },
    details: {
        marginTop: 8,
    },
    weather: {
        fontSize: 14,
        marginBottom: 8,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
});

export default ForecastCard;
