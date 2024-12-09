import { defineStore } from 'pinia';

const baseURL = 'http://192.168.181.161:3566';
export const useExamInfoStore = defineStore('examInfo', {
  state: () => ({
    exams: [], // 存储所有考试的数据
    filteredExams: [], // 存储过滤后的考试数据
    hasResults: false, // 是否有搜索结果
    searchQuery: '', // 搜索输入框的内容
  }),
  actions: {
    async fetchExams() {
      try {
        const response = await fetch('${baseURL}/api/exams'); // 假设你的后端提供了一个获取所有考试数据的API
        this.exams = await response.json();
        this.filteredExams = this.exams; // 初始化时，显示所有考试的信息
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
    },
    async searchExamsByName(name) {
      this.searchQuery = name;
      if (!name) {
        this.filteredExams = this.exams; // 如果输入为空，显示所有考试的信息
        return;
      }
      try {
        // const response = await fetch(`${baseURL}/api/exams?name=${name}`); //后端提供了一个搜索考试数据的API
        // const data = await response.json();
        const data = 
        {
            "id": "exam123",
            "courseName": "Math",
            "results": [
              {
                "score": 85,
                "examDate": "2024-06-01",
                "duration": 120,
                "reattempt": true
              },
              {
                "score": 90,
                "examDate": "2024-06-15",
                "duration": 120,
                "reattempt": false
              }
            ]
        }
        this.filteredExams = data; // 更新过滤后的考试数据
        this.hasResults = data.results.length > 0; // 有搜索结果
      } catch (error) {
        console.error('Failed to search exams:', error);
        this.hasResults = false;
      }
    },
  },
  getters: {
    getExams: (state) => state.filteredExams, // 提供一个getter来获取过滤后的考试数据
  },
});

// 假设后端API返回的数据格式如下：
// {
//   "id": "exam123",
//   "courseName": "Math",
//   "results": [
//     {
//       "score": 85,
//       "examDate": "2024-06-01",
//       "duration": 120,
//       "reattempt": true
//     },
//     {
//       "score": 90,
//       "examDate": "2024-06-15",
//       "duration": 120,
//       "reattempt": false
//     }
//   ]
// }