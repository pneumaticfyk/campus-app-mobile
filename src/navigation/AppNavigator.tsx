// src/navigation/AppNavigator.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext'; // 引入我们创建的 hook

import MainTabNavigator from './MainTabNavigator'; // 引入主界面
import LoginScreen from '../screens/auth/LoginScreen'; // 引入登录界面
// import RegisterScreen from '../screens/auth/RegisterScreen'; // 为以后注册页面做准备

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, isLoading } = useAuth(); // 从全局状态中获取 token 和初始加载状态

  // 如果正在从手机存储中读取 token，显示一个全屏的加载动画
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          // 如果 token 存在 (已登录), 则渲染主应用界面
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
        ) : (
          // 如果 token 不存在 (未登录), 则渲染登录界面
          <Stack.Screen name="Auth" component={LoginScreen} />
          // 以后可以把注册页面也加到这个 Auth 堆栈里
          // <Stack.Screen name="Register" component={RegisterScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;