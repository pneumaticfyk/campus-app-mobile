// src/screens/main/Trade/AddItemScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 引入我们封装的 API 函数
import { postItem } from '../../../api'; // 我们稍后会去创建这个函数

// 复用之前定义的导航类型
type RootStackParamList = {
  ItemList: undefined;
  AddItem: undefined;
  AddTask: undefined;
};
type AddItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddItem'>;


const AddItemScreen = () => {
  const navigation = useNavigation<AddItemScreenNavigationProp>();

  // --- State 管理 ---
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('其他'); // 暂时硬编码一个分类
  
  const [loading, setLoading] = useState(false); // 管理发布按钮的加载状态

  // --- 处理发布逻辑 ---
  const handlePublish = async () => {
    // 1. 基本的输入验证
    if (!name.trim() || !price.trim()) {
      Alert.alert('提示', '商品标题和价格不能为空！');
      return;
    }

    setLoading(true); // 开始加载

    try {
      // 2. 准备要发送到后端的数据
      const newItemData = {
        name,
        description,
        price: parseFloat(price), // 将价格字符串转换为数字
        category,
      };

      // 3. 调用 API 函数 (我们还没创建)
      await postItem(newItemData);

      // 4. 发布成功
      Alert.alert('成功', '您的商品已成功发布！');
      navigation.goBack(); // 返回到上一个页面 (商品列表)

    } catch (error) {
      // 5. 处理错误
      console.error(error);
      Alert.alert('失败', '商品发布失败，请稍后重试。');
    } finally {
      // 6. 结束加载
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>标题</Text>
      <TextInput
        style={styles.input}
        placeholder="请输入商品标题"
        value={name}
        onChangeText={setName} // 当文本变化时，更新 name state
      />
      
      <Text style={styles.label}>详情</Text>
      <TextInput
        style={styles.inputMultiline}
        placeholder="请输入商品详情 (品牌、新旧程度、交易地点等)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.label}>价格 (元)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* 我们暂时先不用分类选择器，用一个默认值 */}

      <View style={styles.buttonContainer}>
        {/* 如果正在加载，显示加载圈，否则显示按钮 */}
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button title="确认发布" onPress={handlePublish} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '500',
    marginBottom: 8, 
    marginTop: 20,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 40,
  }
});

export default AddItemScreen;