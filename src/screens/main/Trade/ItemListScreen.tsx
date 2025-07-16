// src/screens/main/Trade/ItemListScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 引入我们创建的组件和 API 函数
import ItemCard, { ItemData } from '../../../components/ItemCard';
import TaskCard, { TaskData } from '../../../components/TaskCard';
import { getItems, getTasks } from '../../../api';

// 定义页面模式的类型
type Mode = 'items' | 'tasks';

// 定义导航器的页面列表和参数类型
type RootStackParamList = {
  ItemList: undefined;
  AddItem: undefined;
  AddTask: undefined;
  // ItemDetail: { itemId: string };
};

// 为当前屏幕创建专门的导航属性类型
type ItemListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ItemList'>;

const ItemListScreen = () => {
  const navigation = useNavigation<ItemListScreenNavigationProp>(); // 获取导航“遥控器”

  // --- State 管理 ---
  const [mode, setMode] = useState<Mode>('items');
  const [items, setItems] = useState<ItemData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 数据获取 ---
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const itemsData = await getItems();
      const tasksData = await getTasks();
      setItems(itemsData);
      setTasks(tasksData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时执行一次数据加载
// 在 ItemListScreen.tsx 中修改 useEffect
useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        // 当屏幕被聚焦时 (比如从发布页返回时)，就重新加载数据
        console.log("ItemListScreen focused, reloading data...");
        loadData();
    });

    // 当组件卸载时，取消监听
    return unsubscribe;
}, [navigation]); // 依赖项数组中加入 navigation

  // --- 处理悬浮按钮点击事件 ---
  const handleFabPress = () => {
    if (mode === 'items') {
      navigation.navigate('AddItem');
    } else {
      navigation.navigate('AddTask');
    }
  };

  // --- 渲染函数 ---
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
    }
    if (error) {
      return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>加载失败: {error}</Text>
            <TouchableOpacity onPress={loadData} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>点击重试</Text>
            </TouchableOpacity>
        </View>
      );
    }
    
    if (mode === 'items') {
      return (
        <FlatList
          data={items}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={item => item._id}
          numColumns={2}
          key={'items_list'}
          onRefresh={loadData}
          refreshing={loading}
          contentContainerStyle={styles.listContainer}
        />
      );
    } else {
      return (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskCard task={item} />}
          keyExtractor={item => item._id}
          key={'tasks_list'}
          onRefresh={loadData}
          refreshing={loading}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[styles.segmentButton, mode === 'items' && styles.segmentButtonActive]}
          onPress={() => setMode('items')}
        >
          <Text style={[styles.segmentText, mode === 'items' && styles.segmentTextActive]}>二手交易</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, mode === 'tasks' && styles.segmentButtonActive]}
          onPress={() => setMode('tasks')}
        >
          <Text style={[styles.segmentText, mode === 'tasks' && styles.segmentTextActive]}>跑腿服务</Text>
        </TouchableOpacity>
      </View>
      
      {renderContent()}

      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  segmentControl: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  segmentButtonActive: {
    backgroundColor: 'white',
    margin: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  segmentText: {
    fontSize: 16,
    color: '#555',
  },
  segmentTextActive: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10, // 给列表左右留出一些边距
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { height: 2, width: 0 },
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
    // 调整加号位置使其居中
    lineHeight: 60, 
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default ItemListScreen;