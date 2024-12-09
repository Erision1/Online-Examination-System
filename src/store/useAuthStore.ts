// src/store/auth.ts
import { defineStore } from 'pinia';
import axios from 'axios';

const baseURL = 'http://192.168.181.161:3566';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: {
      userid: '',
      username: '',
      name: '',
      identity: '',
      password: '',
      gender: '',
      phone: '',
      college: '',
      courses:[],
      id:''
    },
  }),
  actions: {
    async login(username: string, password: string, identity: string) {
      try {
        // const response = await axios.post(
        //   `${baseURL}/login`,
        //   { username, password, identity },
        // );
        // const { code, msg, data } = response.data; // 这里根据接口返回的格式来获取数据
        const { code, data, msg } = {
          "code": 100,
          "data": {
            "id": 123,
            "username": "wupengfei",
            "password": "11",
            "identity": "学生",
            "name": "张三",
            "gender": "男",
            "phone": 12345678901,
            "employeeId": 456,
            "college": "计算机科学与技术学院",
            "courses": "数据结构,计算机组成原理",
            "userId": 1111
          },
          "msg": "请求成功！！你今天也很棒！！！"
        };
        if (code == 100 && data && msg === "请求成功！！你今天也很棒！！！") {
          // 从响应中获取用户信息并更新状态
          this.user = {
            userid: data.id,
            username: data.username,
            identity: data.identity,
            password: data.password,
            gender: data.gender,
            name: data.name,
            phone: data.phone,
            college: data.college,
            // 如果有课程信息，则需要将字符串转为数组
            courses: data.courses === null ? [] : data.courses.split(','),
            // courses: data.courses.split(','),
            id: data.employeeId
          };
          console.log(this.user);
          this.isLoggedIn = true; // 设置登录状态为 true
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
  },
});