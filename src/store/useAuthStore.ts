// src/store/auth.ts
import { defineStore } from 'pinia';

//使用硬编码的方式
const MOCK_USERS = { 
  '11' : {
    username: '11', //登录账号时使用的用户名
    password: '123456', //登录账号时使用的密码
    identity: '学生', //身份
    name: '张三', //姓名
    phone: '13800138000', //手机号
    gender: '男', //性别
    college: '计算机科学与技术学院', //学院
    id:'20230001', //学号
    courses: []
  },
  '22' : {
    username: '22', //登录账号时使用的用户名
    password: '12345678', //登录账号时使用的密码
    identity: '老师', //身份
    phone: '13800138001', //手机号
    gender: '女', //性别
    college: '计算机科学与技术学院', //学院
    id:'20230002', //工号
    courses: [
      {
        id: 1,
        name: '数据结构',
        desription: '数据结构是计算机科学领域中研究如何存储、组织数据的数据结构的理论和方法。'
      },
      {
        id: 2,
        name: '计算机网络',
        desription: '计算机网络是指将地理位置不同的计算机系统连接起来，使得它们之间可以进行信息交换、资源共享和数据传输的计算机系统。'
      },
      {
        id: 3,
        name: '操作系统',
        desription: '操作系统是管理计算机硬件和软件资源的程序，是计算机系统的内核与基石。'
      }
    ]
  }
};
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async login(username: string, password: string, identity: string) {
      try {
        // const response = await axios.post('/api/login', { username, password, identity });
      
        // const { code, data, msg } = response.data;
        const user = MOCK_USERS[username];
        if (user && user.password === password) {
          // 如果用户名和密码匹配，可以认为登录成功
          this.user = user;
          this.isLoggedIn = true; // 设置登录状态为 true
          localStorage.setItem('authToken', username); // 将token存储在localStorage中
        } else {
          // 如果响应不符合预期，抛出错误
          throw new Error('登录失败，请检查用户名或密码');
        }
      } catch (error) {
        console.error(error);
        throw error; // 重新抛出错误，以便在组件中捕获并显示错误信息
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('authToken');
    },
    checkAuth() {
      // 检查localStorage中是否有token
      const token = localStorage.getItem('authToken');
      if (token) {
        // 如果有token，可以认为用户已登录
        this.isLoggedIn = true;
        // 这里可以设置用户信息，或者从API获取最新信息
      }
    },
    updateUser(username: string, updates: typeof MOCK_USERS['11']) {
      // 更新用户信息
      const user = MOCK_USERS[username];
      if (user) {
        Object.assign(user, updates);
      }
    }
  },
});