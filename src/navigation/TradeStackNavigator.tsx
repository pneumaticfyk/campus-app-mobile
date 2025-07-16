// src/navigation/TradeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// 引入这个 Stack 需要管理的所有屏幕
import ItemListScreen from '../screens/main/Trade/ItemListScreen';
import AddItemScreen from '../screens/main/Trade/AddItemScreen';
import AddTaskScreen from '../screens/main/Trade/AddTaskScreen';
// 以后还可以引入详情页
// import ItemDetailScreen from '../screens/main/Trade/ItemDetailScreen';

const Stack = createStackNavigator();

const TradeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 标题居中
      }}
    >
      {/* 第一个屏幕是默认显示的页面 */}
      <Stack.Screen 
        name="ItemList" 
        component={ItemListScreen}
        // 我们可以为这个特定页面隐藏它自己的头部，因为它有自定义的切换器
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddItem"
        component={AddItemScreen}
        options={{ title: '发布二手物品' }} // 设置页面标题
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ title: '发布跑腿任务' }}
      />
      {/* 
      <Stack.Screen 
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{ title: '商品详情' }}
      /> 
      */}
    </Stack.Navigator>
  );
};

export default TradeStackNavigator;