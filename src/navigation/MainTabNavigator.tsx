// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TradeStackNavigator from './TradeStackNavigator'; 
import MessageListScreen from '../screens/main/Message/MessageListScreen';
import ProfileScreen from '../screens/main/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// 这是我们应用的主界面，包含三个底部 Tab
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Stack Navigator 自己会管理头部
      }}
    >
      <Tab.Screen name="交易" component={TradeStackNavigator} />
      <Tab.Screen 
        name="消息" 
        component={MessageListScreen} 
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Tab.Screen 
        name="个人中心" 
        component={ProfileScreen} 
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;