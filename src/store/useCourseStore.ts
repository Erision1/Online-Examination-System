// src/stores/useCourseStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const baseURL = 'http://192.168.181.161:3566';
export const useCourseStore = defineStore('courses', {
  state: () => ({
    courses: [{
      id: 0,
      name: '',
      description: '',
    }],
  }),
  actions: {
    async fetchCourses() {
      try {
        const authStore = useAuthStore();
        const userid = authStore.user.userid;
        const identity = authStore.user.identity;
        let response = null;
        if(identity === '老师') {
            // response = await axios.get(`${baseURL}/course/teacher_courses/${userid}`);    
            response = [
              {
                "course_id": 1,
                "course_name": "语文",
                "course_description": "中国语文"
              },
              {
                "course_id": 2,
                "course_name": "数学",
                "course_description": "重在培养学生的思维"
              }
            ]
            
        } else if(identity === '学生') {
            response = await axios.get(`${baseURL}/course/student_courses/${userid}`);         
        }
        console.log(response.data);
        this.courses = response || [];
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        this.courses = []; // 错误时设置为空数组
      }
    },
    // 可以添加更多 actions 来处理课程信息的更新、删除等
  },
});