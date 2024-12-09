<script setup>
import Navigation from '../components/Navigation.vue';
import Sidebar from '../components/Sidebar.vue';
import InfoCard from '../components/Teacher/InfoCard.vue';
// import Exam from '@/components/Student/Exam.vue'

</script>
<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <Navigation />
      </el-header>
      <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main class="el-main"><InfoCard/></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-main {
  background-color: #eef1f6;
}
.el-container {
  height: 100vh;
  width: 100vw;
}
.el-header {
  padding: 0;
  background-color: #373d41;
}
</style>