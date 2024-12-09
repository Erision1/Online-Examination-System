<script setup>
//获取所有考生的考试成绩信息
import { onMounted, ref, computed } from 'vue';
import { useExamInfoStore } from '../../store/useExamInfoStore';

const examInfoStore = useExamInfoStore();
const searchQuery = ref('');
const exams = computed(() => examInfoStore.exams);
const hasResults = computed(() => examInfoStore.hasResults);

const searchExamInfo = () => {
    examInfoStore.searchExamsByName(searchName.value);
}

const viewExamInfo = (exam) => {
    examInfoStore.viewExamInfo(exam);
}
</script>

<template>
    <div class="exam-list">
      <h2 class="title">考试列表</h2>
      <div class="search-header">
        <!--搜索考生姓名，显示对应考生的考试信息-->
        <input type="text" placeholder="请输入考生姓名" v-model="searchQuery" @input="searchExamInfo">
        <button @click="searchExamInfo">搜索</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>考生编号</th>
              <th>考生姓名</th>
              <th>考试科目</th>
              <th>考试分数</th>
              <th>考试时间</th>
              <th>操作</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="exam in exams" :key="exam.id">
              <td>{{ exam.studentId }}</td>
              <td>{{ exam.studentName }}</td>
              <td>{{ exam.subject }}</td>
              <td>{{ exam.score }}</td>
              <td>{{ exam.examTime }}</td>  
              <td><button @click="viewExamInfo(exam)">查看详情</button></td> 
            </tr>
            <tr v-if="!hasResults">
              <td colspan="6">没有找到相关考试信息</td>
            </tr>
          </tbody>       
        </table>
      </div>
    </div>
  </template>

<style scoped>
.exam-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
    margin: 20px;
    position: relative;
    left: 50%;
}
.search-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-header input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-header button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-header button:hover {
  background-color: #0056b3;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f2f2f2;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}
</style>
