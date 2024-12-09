<template>
    <div class="exam-detail">
      <h1>考试详情</h1>
      <div v-if="examDetails">
        <p>考生姓名: {{ examDetails.studentName }}</p>
        <p>课程名称: {{ examDetails.courseName }}</p>
        <ul>
          <li v-for="score in examDetails.scores" :key="score.examId"> 
            <p>考试时长: {{ score.duration }}</p>
            <p>考试日期: {{ score.date }}</p>
            <p>分数: {{ score.value }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>
  </template>
  
<script setup>
import { onMounted } from 'vue';
import { useExamStore } from '@/store/useExamStore';
import { useRoute } from 'vue-router';

const examStore = useExamStore();
const route = useRoute();

onMounted(async () => {
  const examId = route.params.examId;
  await examStore.fetchExamDetails(examId);
});
</script>