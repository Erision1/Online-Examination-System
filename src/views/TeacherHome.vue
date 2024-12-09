<script setup>
import Navigation from '@/components/Navigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import Notifications from '@/components/Notifications.vue';
import ExamClendar from '@/components/ExamClendar.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <Navigation />
      </el-header>
      <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main class="el-main"><Notifications />
          <ExamClendar /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  background-color: #373d41;
  height: 60px;
  padding: 0;
}

.el-main {
  background-color: #eef1f6;
}
.el-container {
  height: 100vh;
  width: 100vw;
}

</style>