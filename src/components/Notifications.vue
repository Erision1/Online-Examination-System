<template>
  <el-card>
    <div slot="header">通知和公告</div>
    <el-timeline>
      <el-timeline-item timestamp="2024-06-05" placement="top">
        <el-card v-for="notification in notifications" :key="notification.title">
          <h4>{{ notification.title }}</h4>
          <p>{{ notification.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup>
import { ElCard, ElTimeline, ElTimelineItem } from 'element-plus';
import { ref } from 'vue';

//从后端读取数据
const notifications = ref([
  {
    title: '考试安排更新',  
    content: '数学考试时间调整为2024-06-15',
    time: '2024-06-05'
  }, 
  {
    title: '考试安排更新',
    content: '语文考试时间调整为2024-06-10',
    time: '2024-06-05'
  },
  {
    title: '系统维护',
    content: '系统正在维护，维护期间系统将无法使用，请耐心等待',
    time: '2024-06-05'
  }
  // 更多通知
]);
</script>

<style scoped>
.el-timeline {
  position: relative;
  top: 20px;
}
</style>