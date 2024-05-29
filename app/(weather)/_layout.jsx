import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Tabs } from 'expo-router';
import { faClock, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
const WeatherLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#CDCDE0",
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#8e63f1",
          borderTopWidth: 0,
          borderTopColor: "#232533",
          height: 84,
        },
        tabBarLabelStyle: {
          fontSize: 16,  // Increase the font size of the tab titles
          fontWeight: 'bold',  // Optional: Make the text bold
        },
      }} >
      <Tabs.Screen name="current" options={{
        headerShown: false, title: 'Current', tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faLocationCrosshairs} color={color} size={24} /> // Increase icon size here
        )
      }} />
      <Tabs.Screen name="forecast" options={{
        headerShown: false, title: 'Forecast', tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faClock} color={color} size={24} />
        )
      }} />
    </Tabs>
  );
};

export default WeatherLayout;
