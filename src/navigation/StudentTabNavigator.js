import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LecturesScreen from '../../src/screens/students/LecturesScreen';
import TimetableScreen from '../../src/screens/students/TimetableScreen';
import NoticeBoardScreen from '../../src/screens/students/NoticeBoardScreen';
import FeeDetailsScreen from '../../src/screens/students/FeeDetailsScreen';
import ProjectsScreen from '../../src/screens/students/ProjectsScreen';
import ProfileScreen from '../../src/screens/students/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const StudentTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Lectures': iconName = 'play-circle-outline'; break;
          case 'Timetable': iconName = 'calendar-outline'; break;
          case 'NoticeBoard': iconName = 'notifications-outline'; break;
          case 'Fees': iconName = 'card-outline'; break;
          case 'Projects': iconName = 'folder-outline'; break;
          case 'Profile': iconName = 'person-circle-outline'; break;
          default: iconName = 'ellipse-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#00965f',
      tabBarInactiveTintColor: '#164758',
      tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
    })}
  >
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Lectures" component={LecturesScreen} />
    <Tab.Screen name="Timetable" component={TimetableScreen} />
    <Tab.Screen name="NoticeBoard" component={NoticeBoardScreen} />
    <Tab.Screen name="Fees" component={FeeDetailsScreen} />
    <Tab.Screen name="Projects" component={ProjectsScreen} />
  </Tab.Navigator>
);

export default StudentTabNavigator;
