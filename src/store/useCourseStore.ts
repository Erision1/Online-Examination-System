// src/stores/useCourseStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';
import { de } from 'element-plus/es/locale';

const MOCK_COURSES = {
  1: {
    id: 1,
    name: '计算机网络',
    description: '本课程主要介绍计算机网络的基础知识、协议、体系结构、安全、应用、网络管理、网络性能、网络优化、网络管理、网络安全、网络虚拟化、网络测试、网络管理、网络安全、网络虚拟化、网络测试等内容。',
},
  2: {
    id: 2,
    name: '数据库系统',
    description: '本课程主要介绍数据库系统的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  3: {
    id: 3,
    name: '操作系统',
    description: '本课程主要介绍操作系统的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  4: {
    id: 4,
    name: '计算机图形学',
    description: '本课程主要介绍计算机图形学的基础知识、算法、理论、技术、应用、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  5: {
    id: 5,
    name: '计算机多媒体技术',
    description: '本课程主要介绍计算机多媒体技术的基础知识、算法、理论、技术、应用、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  6: {
    id: 6,
    name: '计算机网络安全',
    description: '本课程主要介绍计算机网络安全的基础知识、协议、体系结构、安全、应用、网络管理、网络性能、网络优化、网络管理、网络安全、网络虚拟化、网络测试、网络管理、网络安全、网络虚拟化、网络测试等内容。',
},
  7: {
    id: 7,
    name: '计算机系统结构',
    description: '本课程主要介绍计算机系统结构的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  8: {
    id: 8,
    name: '计算机体系结构',
    description: '本课程主要介绍计算机体系结构的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  9: {
    id: 9,
    name: '计算机网络体系结构',
    description: '本课程主要介绍计算机网络体系结构的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
  10: {
    id: 10,
    name: '计算机网络技术',
    description: '本课程主要介绍计算机网络技术的概念、体系结构、原理、设计、实现、应用、维护、优化、管理、安全、测试、虚拟化、测试等内容。',
},
};


// const baseURL = 'http://192.168.181.161:3566';
export const useCourseStore = defineStore('courses', {
  state: () => ({
    courses: [{
      id: 0,
      name: '',
      description: '',
    }],
  }),
  actions: {
    async fetchMockCourses() {
      this.courses = Object.values(MOCK_COURSES);
      console.log('Mock courses:', this.courses);
    },
    async fetchCourses() {
      try {
        const authStore = useAuthStore();
        this.courses = authStore.user.courses;
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        this.courses = []; // 错误时设置为空数组
      }
    },
    // 可以添加更多 actions 来处理课程信息的更新、删除等
  },
});