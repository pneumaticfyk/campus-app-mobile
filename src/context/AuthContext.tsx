// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>; // <--- 修改点：明确指出 login 接收一个 token 字符串
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error('从存储中加载 token 失败', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  // login 函数现在只负责处理 token，不再调用 API
  const login = async (newToken: string) => { // <--- 修改点：参数名改为 newToken，类型为 string
    try {
      setToken(newToken); // 更新 state
      await AsyncStorage.setItem('userToken', newToken); // 存储 token
    } catch (e) {
        console.error('存储 token 失败', e);
        throw e; // 向上抛出错误
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
        console.error('登出失败', e);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};