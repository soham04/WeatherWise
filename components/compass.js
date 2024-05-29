import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const Compass = ({ direction, speed }) => {
    // Calculate the rotation angle for the arrow
    const rotation = direction; // Adjust by -90 to make 0 degrees point north

    return (
        <View style={styles.container}>
            <Svg height="200" width="200" viewBox="0 0 200 200">
                <Circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" fill="none" />
                <Line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="10"
                    stroke="red"
                    strokeWidth="5"
                    transform={`rotate(${rotation}, 100, 100)`}
                />
                {/* <Text x="100" y="20" fontSize="20" fill="black" textAnchor="middle">N</Text>
                <Text x="180" y="105" fontSize="20" fill="black" textAnchor="middle" dy="5">E</Text>
                <Text x="100" y="190" fontSize="20" fill="black" textAnchor="middle" dy="5">S</Text>
                <Text x="20" y="105" fontSize="20" fill="black" textAnchor="middle" dy="5">W</Text>
                <Text x="100" y="100" fontSize="24" fill="black" textAnchor="middle" dy="8">{speed} m/s</Text> */}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    // label: {
    //     fontSize: 18,
    //     marginBottom: 10,
    // },
});

export default Compass;
