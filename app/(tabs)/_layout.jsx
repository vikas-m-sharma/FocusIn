import { StatusBar } from 'expo-status-bar';
import { Tabs } from "expo-router";
import { Image, Text, View, Animated } from "react-native";
import { icons } from '../../constants';
import { useState } from "react";

const TabIcon = ({ icon, color, name, focused }) => {
    const scale = useState(new Animated.Value(1))[0];
    
    // Apply smooth spring animation
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 7, // Adjust for a more refined bounce effect
      useNativeDriver: true,
    }).start();
  
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 8 }}>
        <Animated.View
          style={{
            transform: [{ scale }],
            backgroundColor: focused ? "#FFA00120" : "transparent",
            padding: 10, // Reduced padding for smaller icons
            borderRadius: 20, // Adjusted border radius for smaller background shape
            shadowColor: focused ? "#FFA001" : "#2A2B3D",
            shadowOpacity: focused ? 0.25 : 0.15,
            shadowRadius: focused ? 8 : 4,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Image
            source={icon}
            resizeMode="contain"
            style={{ tintColor: color, width: 24, height: 24 }} // Reduced icon size
          />
        </Animated.View>
        <Text
          style={{
            color: color,
            fontSize: 11, // Reduced font size for text
            fontWeight: focused ? "600" : "400",
            marginTop: 4, // Reduced spacing between icon and text
            letterSpacing: 0.4,
            textTransform: "capitalize",
          }}
        >
          {name}
        </Text>
      </View>
    );
  };
  
  const TabLayout = () => {
    return (
      <>
        <StatusBar style="light" />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#1C1C2D",
              borderTopWidth: 1,
              borderTopColor: "#2A2B3D",
              height: 70, // Reduced height for a more compact layout
              paddingBottom: 10, // Reduced padding at the bottom
              elevation: 8,
            },
          }}
        >
          <Tabs.Screen
            name="timetable"
            options={{
              title: "Timetable",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.timetable} color={color} name="Timetable" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="message"
            options={{
              title: "Message",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.message} color={color} name="Message" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="blogs"
            options={{
              title: "Blogs",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.blogs} color={color} name="Blogs" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="ebook"
            options={{
              title: "Ebook",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.ebook} color={color} name="Ebook" focused={focused} />
              ),
            }}
          />
        </Tabs>
      </>
    );
  };
  
  export default TabLayout;
  