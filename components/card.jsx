import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWind, faEye, faDroplet } from '@fortawesome/free-solid-svg-icons';
import Compass from './compass';

const interpolateColor = (value, minValue, maxValue, colors) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    let color;
    if (ratio <= 0.5) {
        // Interpolate between the first and second color
        color = colors[0].map((channel, index) => {
            return Math.round(channel + 2 * ratio * (colors[1][index] - channel));
        });
    } else {
        // Interpolate between the second and third color
        color = colors[1].map((channel, index) => {
            return Math.round(channel + 2 * (ratio - 0.5) * (colors[2][index] - channel));
        });
    }
    return `rgb(${color.join(',')})`;
};

const getColor = (value, type) => {
    let color;
    const lightGreen = [144, 238, 144]; // Light green
    const lightYellow = [255, 255, 153]; // Light yellow
    const lightRed = [255, 182, 193]; // Light red

    if (type === 'wind') {
        color = interpolateColor(value.speed, 0, 20, [lightGreen, lightYellow, lightRed]); // Assuming maximum wind speed of 20 m/s
    } else if (type === 'visibility') {
        color = interpolateColor(value, 0, 10, [lightRed, lightYellow, lightGreen]); // Assuming maximum visibility of 10 km
    } else if (type === 'humidity') {
        if (value < 30) {
            color = interpolateColor(value, 0, 30, [lightRed, lightYellow, lightGreen]); // Red to Green for low humidity
        } else if (value <= 70) {
            color = interpolateColor(value, 30, 70, [lightGreen, lightYellow, lightGreen]); // Green to Yellow to Green for moderate humidity
        } else {
            color = interpolateColor(value, 70, 100, [lightGreen, lightYellow, lightRed]); // Green to Red for high humidity
        }
    }
    return color;
};


const WeatherCard = ({ type, value }) => {
    let icon, title, content;
    if (type === 'wind') {
        icon = faWind;
        title = 'Wind';
        content = (
            <>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{value.speed} m/s</Text>
                <Compass direction={value.deg} speed={value.speed} />
            </>
        );
    } else if (type === 'visibility') {
        icon = faEye;
        title = 'Visibility';
        content = (
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{value} km</Text>
        );
    } else if (type === 'humidity') {
        icon = faDroplet;
        title = 'Humidity';
        content = (
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{value}%</Text>
        );
    }

    const bgColor = getColor(value, type);

    return (
        <View style={{ backgroundColor: bgColor, borderRadius: 8, padding: 20, margin: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <FontAwesomeIcon icon={icon} style={{ color: "#000", fontSize: 24 }} />
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{title}</Text>
            </View>
            {content}
        </View>
    );
};

export default WeatherCard;
