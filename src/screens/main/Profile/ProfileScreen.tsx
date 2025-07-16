// src/screens/main/Profile/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
// 我们不再需要 getUserProfile，所以删除了对应的 import

interface UserProfile {
  username: string;
}

const ProfileScreen = () => {
  const { logout, token } = useAuth(); // 从 Context 获取 logout 函数和 token
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // 真实的应用会用 token 去请求后端 /api/users/me 接口获取用户信息
    // 例如：const profile = await getUserProfile(token); setUserProfile(profile);
    //
    // 作为简化，我们暂时只显示一个静态名字
    // 未来可以把从 token 解码出的用户名或直接请求到的用户名放在这里
    setUserProfile({ username: '校园小卖部用户' }); 
  }, [token]); // 当 token 变化时，可以重新获取信息

  const handleLogout = () => {
    Alert.alert(
      "退出登录",
      "您确定要退出当前账号吗？",
      [
        { text: "取消", style: "cancel" },
        { text: "确定", onPress: () => logout(), style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 用户信息区 */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.username}>
          {userProfile ? userProfile.username : '加载中...'}
        </Text>
      </View>

      {/* 功能列表 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>我的帖子</Text>
          <Text style={styles.arrow}>{'>'}</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>已完成的交易</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>信用积分</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 退出登录按钮 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  profileHeader: { backgroundColor: 'white', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e0e0', marginBottom: 10 },
  username: { fontSize: 20, fontWeight: 'bold' },
  menuContainer: { marginTop: 20 },
  menuItem: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuItemText: { fontSize: 16 },
  arrow: { fontSize: 16, color: '#ccc' },
  logoutButton: { backgroundColor: '#e74c3c', borderRadius: 8, margin: 20, marginTop: 40, padding: 15, alignItems: 'center' },
  logoutButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;