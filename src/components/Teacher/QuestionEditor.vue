<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ref , computed, onMounted, watch } from 'vue';
import { useQuestionStore } from '@/store/useQuestionStore';
import { useRoute, useRouter } from 'vue-router';
import EditQuestionModal from '@/components/EditQuestionModal.vue'; 

const route = useRoute();
const router = useRouter();
const questionStore = useQuestionStore(); //引入store
const editModalOpen = ref(false);
const currentQuestion = ref({});


const questions = ref([]);

onMounted(async () => {
  const courseId = route.params.courseId;
  questions.value = await questionStore.fetchQuestionsByCourseId(courseId);
});

//计算总分
const totalScore = computed(() => 
questions.value.reduce((sum, question) => sum + question.score, 0));
//编辑题目
const editQuestion = (question) => {
    currentQuestion.value = { ...question };
    editModalOpen.value = true;
};
//删除题目
const deleteQuestion = (question) => {
    questionStore.deleteQuestion(question);
   //更新store中的questions
};
//添加题目
const addQuestion = () => {
    //打开添加的模态框
    const newQuestion = {
    id: questions.value.length + 1, // 简单的ID生成方式，实际应用中可能需要更复杂的ID生成机制
    type: '', // 题目类型
    content: '', // 题目内容
    answer: '', // 标准答案
    score: 0, // 分数
  };
  questionStore.addQuestion(newQuestion);
  currentQuestion.value = { ...newQuestion };
  editModalOpen.value = true; // 打开模态框
}


//保存考试
const saveExam = () => {
    //保存到store中
    questionStore.saveQuestion(currentQuestion.value);
}

//发布考试
const publishExam = () => {
    //发布到线上考试系统
    questionStore.publishQuestion(questions);
};

</script>

<template>
    <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <Navigation />
      </el-header>
      <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main class="el-main">
            <h1>考题管理</h1>
            <!--显示总分数和题目数-->
            <div class ="outline">
                <p>共：{{questions.length}} 道题，总分：{{totalScore}} 分</p>
            </div>
            <!--试题列表-->
            <div class="question-list">
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>试题类型</th>
                            <th>试题内容</th>
                            <th>标准答案</th>
                            <th>分数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(question, index) in questions" :key="question.id">
                            <td>{{index+1}}</td>
                            <td>{{question.type}}</td>
                            <td>{{question.content}}</td>
                            <td>{{question.answer}}</td>
                            <td><input v-model="question.score" type="number" min="0" max="100" ></td>
                            <td>
                                <button @click="editQuestion(question)">编辑</button>
                                <!--模态框组件-->
                                <EditQuestionModal :question="currentQuestion" :isOpen = "editModalOpen" @close="editModalOpen = false"/>
                                <button @click="deleteQuestion(question)">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--操作按钮-->
            <div class="actions">
                <button @click="addQuestion">添加试题</button>
                <button @click="saveExam">保存考试</button>
                <button @click="publishExam">发布考试</button>
            </div>
        </el-main>
      </el-container>
    </el-container>
    </div>
    
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: #f2f2f2;
}

td input[type="number"] {
  width: 60px;
  padding: 5px;
  margin-right: 10px;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
.actions {
  margin-top: 20px;
  text-align: right;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.edit-question-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>