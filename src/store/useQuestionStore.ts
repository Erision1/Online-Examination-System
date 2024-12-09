import axios from 'axios';
import { defineStore } from 'pinia';

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [], //存储题目的数组
    
  }),
  actions: {
    // 根据课程id获取题目列表
    async fetchQuestionsByCourseId(courseId) {
      try {
        const response = await axios.get(`/api/questions/${courseId}`);
        this.questions = response.data;
        return this.questions;
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    },
    // 修改题目
    updateQuestion(question) {
        const index = this.questions.findIndex(item => item.id === question.id);
        if (index!== -1) {
            this.questions.splice(index, 1, question);
        }
    },
    // 增加题目
    addQuestion(question) {
        this.questions.push(question);
    },
    // 删除题目
    deleteQuestion(question) {
       this.questions = this.questions.filter(item => item.id!== question.id);
    },
    //保存题目至服务器端
    saveQuestion(question) {
        if (question.id) {
            this.updateQuestion(question);
        } else {    
            this.addQuestion(question);
        }
    },
    //发布题目，需要完善
    publishQuestion(question) {
        question.status = 'published';
        this.updateQuestion(question);
    }
  },
});