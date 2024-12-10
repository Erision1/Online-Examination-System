import axios from "axios";
import { defineStore } from "pinia";
const MOCK_QUESTIONS = {
  1: [
    // 单选题
    {
      id: 1,
      content: "HTTP协议通常使用哪个TCP端口进行通信？",
      options: ["21", "22", "23", "80"],
      answer: "80",
      type: "单选题",
      score: 2,
    },
    // 多选题
    {
      id: 2,
      content: "以下哪些是JavaScript的数据类型？",
      options: ["Number", "String", "Boolean", "Undefined"],
      answer: "Number,String,Boolean,Undefined",
      type: "多选题",
      score: 4,
    },
    // 判断题
    {
      id: 3,
      content: "JavaScript中的全局对象是window吗？",
      options: ["是", "否"],
      answer: "是",
      type: "判断题",
      score: 3,
    },
    // 填空题
    {
      id: 4,
      content: "请填入下列JavaScript代码的正确输出：\nlet x = 'Hello';\nlet y = x + ' World';\nconsole.log(y);",
      answer: "Hello World",
      type: "填空题",
      score: 3,
    },
    // 主观题
    {
      id: 5,
      content: "描述一下在JavaScript中，如何实现深拷贝和浅拷贝，并给出相应的代码示例。",
      type: "主观题",
      score: 5,
    },
  ],
  2: [
    {
      id: 6,
      content: "Python中的列表和元组有什么区别？",
      options: ["列表可变，元组不可变", "列表不可变，元组可变", "两者都可变", "两者都不可变"],
      answer: "列表可变，元组不可变",
      type: "多选题",
      score: 3,
    },
    // 多选题
    {
      id: 7,
      content: "以下哪个是Python的内置数据结构？",
      options: ["数组", "列表", "字典", "集合"],
      answer: "列表,字典,集合",
      type: "多选题",
      score: 4,
    },
    // 判断题
    {
      id: 8,
      content: "Python中的'if'语句后面必须跟什么符号？",
      options: ["冒号(:)", "分号(;)", "逗号(,)", "星号(*)"],
      answer: "冒号(:)",
      type: "单选题",
      score: 2,
    },
    // 填空题
    {
      id: 9,
      content: "请填入下列Python代码的正确输出：\nx = [1, 2, 3]\ny = x[1]\nprint(y)",
      answer: "2",
      type: "填空题",
      score: 3,
    },
    // 主观题
    {
      id: 10,
      content: "请描述Python中的装饰器是什么，并给出一个装饰器的示例代码。",
      type: "主观题",
      score: 5,
    },
  ],
  3: [
    // 单选题
    {
      id: 11,
      content: "在Java中，哪个关键字用于定义一个类？",
      options: ["interface", "class", "struct", "type"],
      answer: "class",
      type: "单选题",
      score: 3,
    },
    // 多选题
    {
      id: 12,
      content: "Java中，哪些是访问修饰符？",
      options: ["public", "private", "protected", "static"],
      answer: "public,private,protected",
      type: "多选题",
      score: 4,
    },
    // 判断题
    {
      id: 13,
      content: "Java中的'final'关键字可以修饰类、方法和变量。",
      options: ["是", "否"],
      answer: "是",
      type: "判断题",
      score: 3,
    },
    // 填空题
    {
      id: 14,
      content: "请填入下列Java代码的正确输出：\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = a + 5;\n        System.out.println(b);\n    }\n}",
      answer: "15",
      type: "填空题",
      score: 3,
    },
    // 主观题
    {
      id: 15,
      content: "请描述Java中的异常处理机制，并给出一个try-catch语句的示例。",
      type: "主观题",
      score: 5,
    },
  ],
};
export const useQuestionStore = defineStore("question", {
  state: () => ({
    questions: [], //存储题目的数组
  }),
  actions: {
    // 根据课程id获取题目列表
    async fetchQuestionsByCourseId(courseId) {
      try {
        // const response = await axios.get(`/api/questions/${courseId}`);
        // this.questions = response.data;
        // return this.questions;
        this.questions = MOCK_QUESTIONS[courseId];
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
