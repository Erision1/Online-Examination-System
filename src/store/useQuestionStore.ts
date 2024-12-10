import axios from "axios";
import { defineStore } from "pinia";
const MOCK_QUESTIONS = [
  {
    id: 1,
    content: "下面哪个不是计算机科学的研究方向？",
    options: ["人工智能", "机器学习", "数据挖掘", "软件工程"],
    answer: "软件工程",
    type: "1",
    score: 3,
  },
  {
    id: 2,
    content: "请你选出下列哪些是Vue3.0的亮点？",
    options: [
      "响应式系统",
      "TypeScript支持",
      "Composition API",
      "更加灵活的组件系统",
    ],
    answer: "响应式系统,TypeScript支持,Composition API",
    type: "2",
    score: 5,
  },
  {
    //判断题
    id: 3,
    content: "Java是一个面向对象编程语言?",
    options: ["是", "否"],
    answer: "是",
    type: "3",
    score: 2,
  },
  {
    //填空题
    id: 4,
    content:
      "请填入下列Java代码的正确输出:\nint a = 10;\nint b = 5;\nint c = a + b;\nSystem.out.println(c);",
    answer: "15",
    type: "4",
    score: 2,
  },
  {
    //主观题
    id: 5,
    content:
      "请你编写一段Java代码，实现客户端向服务器端发送请求，并接收服务器端响应，并打印响应内容。",
    type: "5",
    score: 10,
  },
];
export const useQuestionStore = defineStore("question", {
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
        console.error("Failed to fetch questions:", error);
      }
    },
    // 修改题目
    updateQuestion(question) {
      const index = this.questions.findIndex((item) => item.id === question.id);
      if (index !== -1) {
        this.questions.splice(index, 1, question);
      }
    },
    // 增加题目
    addQuestion(question) {
      this.questions.push(question);
    },
    // 删除题目
    deleteQuestion(question) {
      this.questions = this.questions.filter((item) => item.id !== question.id);
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
      question.status = "published";
      this.updateQuestion(question);
    },
  },
});
