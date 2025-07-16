// src/screens/main/Trade/AddTaskScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Button, Alert,
  ScrollView, ActivityIndicator, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { postTask } from '../../../api'; // <-- 引入 postTask

// 定义导航类型
type RootStackParamList = { AddTask: undefined; };
type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;


const AddTaskScreen = () => {
  const navigation = useNavigation<AddTaskScreenNavigationProp>();

  // State 管理
  const [type, setType] = useState('代取快递'); // 默认任务类型
  const [detail, setDetail] = useState('');
  const [reward, setReward] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    // 输入验证
    if (!detail.trim() || !reward.trim()) {
      Alert.alert('输入错误', '任务详情和酬劳为必填项。');
      return;
    }

    const numericReward = parseFloat(reward);
    if (isNaN(numericReward) || numericReward < 0) {
      Alert.alert('输入错误', '请输入有效的酬劳金额。');
      return;
    }

    setLoading(true);

    try {
      // 准备数据
      const newTaskData = { type, detail, reward: numericReward };
      
      // 准备 Token (与 AddItemScreen 逻辑相同)
      const TEMP_USER_TOKEN = '在这里粘贴你通过登录获取的JWT Token'; // <--- !!! 再次提醒：需要替换 !!!
      
      if (!TEMP_USER_TOKEN || TEMP_USER_TOKEN.includes('在这里粘贴')) {
          Alert.alert('认证失败', '无法找到用户认证令牌，请先登录。');
          setLoading(false);
          return;
      }

      // 调用 API
      await postTask(newTaskData, TEMP_USER_TOKEN);

      // 成功操作
      Alert.alert('发布成功', '您的跑腿任务已发布，等待有缘人接单！');
      navigation.goBack();

    } catch (error: any) {
      console.error("发布失败:", error);
      Alert.alert('发布失败', error.message || '发生未知错误，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>任务类型</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        // 以后这里可以换成一个选择器
      />
      
      <Text style={styles.label}>详细描述</Text>
      <TextInput
        style={styles.inputMultiline}
        placeholder="例如：西门菜鸟驿站，取件码 666-888，下午5点前送到三号宿舍楼..."
        value={detail}
        onChangeText={setDetail}
        multiline
      />
      
      <Text style={styles.label}>酬劳 (元)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={reward}
        onChangeText={setReward}
        keyboardType="decimal-pad"
      />
      
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button title="确认发布" onPress={handlePublish} color={Platform.OS === 'ios' ? '#fff' : '#007AFF'}/>
        )}
      </View>
    </ScrollView>
  );
};

// 复用 AddItemScreen 的样式即可
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 16, fontWeight: '500', marginBottom: 8, marginTop: 20, color: '#333'},
    input: { borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f9f9f9', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16 },
    inputMultiline: { borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f9f9f9', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
    buttonContainer: { marginTop: 40 }
});

export default AddTaskScreen;