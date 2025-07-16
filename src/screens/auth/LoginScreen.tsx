// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api'; // 引入我们之前创建的 API 函数

const LoginScreen = () => {
  const { login } = useAuth(); // 从全局 Context 中获取 login 函数
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('提示', '请输入用户名和密码');
      return;
    }
    setIsLoading(true);
    try {
      // 步骤 1: 调用真实的后端 API 函数
      const response = await loginUser({ username, password });
      
      // 步骤 2: 从后端响应中获取 token
      const receivedToken = response.token;

      // 步骤 3: 调用全局的 login 函数，并将获取到的 token 字符串传递给它
      await login(receivedToken);

      // 登录成功后，AppNavigator 会自动侦测到 token 的变化并切换到主界面

    } catch (error: any) {
      Alert.alert('登录失败', error.message || '发生未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎回来！</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="用户名"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="密码"
        secureTextEntry
        style={styles.input}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="登录" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#fff' },
});

export default LoginScreen;