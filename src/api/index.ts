// src/api/index.ts
// 在安卓模拟器上，需要用 10.0.2.2 来访问你电脑的 localhost
const API_BASE_URL = 'http://47.108.153.193:3000/api';

// 新增：定义登录时需要发送的数据类型
export interface LoginData {
  username: string;
  password: string;
}


// 获取二手商品列表
export const getItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) {
    throw new Error('获取商品列表失败');
  }
  return await response.json();
};

// 获取跑腿任务列表
export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('获取任务列表失败');
  }
  return await response.json();
};

// 定义要发送的数据的类型
interface NewItemData {
  name: string;
  description: string;
  price: number;
  category: string;
}

// 发布新商品
export const postItem = async (itemData: NewItemData) => {
  // 注意：在真实的 App 中，token 应该从一个安全的地方 (如 AsyncStorage) 读取
  // 我们暂时先硬编码一个，你需要把它换成你登录后获取到的真实 Token
  const token = '你的JWT Token'; // <--- 在这里粘贴你登录后获得的 Token!

  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST', // 请求方法是 POST
    headers: {
      'Content-Type': 'application/json', // 告诉后端我们发送的是 JSON
      'x-auth-token': token, // 附上我们的“门禁卡”
    },
    body: JSON.stringify(itemData), // 将 JavaScript 对象转换为 JSON 字符串
  });

  if (!response.ok) {
    // 如果请求失败，也抛出错误
    const errorData = await response.json();
    throw new Error(errorData.message || '发布商品失败');
  }

  return await response.json();
};

// 定义发布新任务时需要发送的数据类型
interface NewTaskData {
  type: string;
  detail: string;
  reward: number;
}

// 定义从后端获取的任务数据类型
export interface TaskData {
  _id: string;
  type: string;
  detail: string;
  reward: number;
  status: string;
  user: string;
  createdAt: string;
}

// 发布新任务
export const postTask = async (taskData: NewTaskData, token: string): Promise<TaskData> => {
  if (!token) {
    throw new Error("未提供认证令牌 (Token)");
  }

  const response = await fetch(`${API_BASE_URL}/tasks`, { // <-- 注意 URL 是 /tasks
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '发布失败，且无法解析错误信息' }));
    throw new Error(errorData.message || '发布任务失败');
  }

  return await response.json();
};


// 新增：用户登录 API 函数
export const loginUser = async (data: LoginData): Promise<{token: string}> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '用户名或密码错误' }));
    throw new Error(errorData.message);
  }
  return await response.json();
}