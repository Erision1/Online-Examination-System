// src/stores/useExamStore.js
import { defineStore } from 'pinia';
export const useExamStore = defineStore('exam', {
  state: () => ({
    examDetails: "期中考试", //考试详情
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    correctAnswers: [],
    examDuration: 60,
    score: 0,
    totalQuestions: 0,
    hasSubmitted: false,
    startTime: null,
    endTime: null,
    timer:null,
  }),
  actions: {
    async fetchQuestions() {
      // 假设后端提供了获取考题的API
      // const response = await fetch('/api/exam/questions');
      // this.questions = response.json();
      this.totalQuestions = this.questions.length;
      this.correctAnswers = this.questions.map(question => question.answer);
    },
    startExam() {
        this.startTime = new Date();
        this.endTime = new Date(this.startTime.getTime() + this.examDuration * 60000); //毫秒数
        this.timer = setInterval(() => this.checkTimeLeft(), 1000); //每秒钟检查一次时间
        this.selectedAnswers = new Array(this.totalQuestions).fill(null); //初始化答案数组
    },
    checkTimeLeft() {
        if(new Date() > this.endTime) {
            this.submitExam();
            clearInterval(this.timer);
        }
    },
    selectAnswer(questionIndex, answer) {
      this.selectedAnswers[questionIndex] = answer;
    },
    submitExam() {
      this.hasSubmitted = true;
      clearInterval(this.timer);
      this.score = this.questions.reduce((total, question, index) => {
        return total + (this.selectedAnswers[index] === question.answer? 1 : 0);
      }, 0);    
    },
    async fetchExamDetails(examId) {
        try {
          // const response = await fetch(`/api/exams/${examId}`);
          // this.examDetails = response.json();
          
       } catch (error) {
          console.error('Failed to fetch exam details:', error);
        }
      },
  },
});