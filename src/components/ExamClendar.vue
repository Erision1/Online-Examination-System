<template>
    <el-calendar>
      <template #dateCell="{data}">
        <div v-if="examSchedule[data.date]">
          <span :class="{'exam-day': true, 'today': isToday(data.date)}">
            {{ data.date | formatDate }}
            <el-tag size="mini">考试</el-tag>
          </span>
        </div>
        <div v-else :class="{'no-exam-day': true, 'today': isToday(data.date)}">
          {{ data.date | formatDate }}
        </div>
      </template>
    </el-calendar>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElCalendar, ElTag } from 'element-plus';
  import { format as formatDatetime } from 'date-fns';
  import { useAuthStore } from '../store';
  
  const { user } = useAuthStore;
  //需要完善
  const getExamsByUser = () => {
    // 根据用户信息获取考试日程
    // 假设返回值为 examSchedule
    if(user.identity === '老师') {
      
    } else if(user.identity ==='学生') {

    }
  };
const examSchedule = ref({
'2024-12-15': '数学考试',
'2024-12-01': '物理考试',
'2024-12-25': '化学考试', // 新增的化学考试
'2025-01-10': '生物考试', // 新增的生物考试
'2025-02-20': '英语考试', // 新增的英语考试
// 更多考试日程...
});
  const isToday = (date) => {
    const today = new Date();
    const examDate = new Date(date);
    return today.toISOString().slice(0, 10) === examDate.toISOString().slice(0, 10);
  };
  
  const formatDate = (value) => {
    return formatDatetime(value, 'yyyy-MM-dd');
  };
  </script>
  
  <style scoped>
  .exam-day {
    color: red;
  }
  .today {
    background-color: #f0f9ff;
  }
  .no-exam-day {
    color: gray;
  }
  </style>