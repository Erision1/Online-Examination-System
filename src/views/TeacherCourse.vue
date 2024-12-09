<script setup>
import Navigation from '@/components/Navigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import CourseList from '@/components/Teacher/CourseList.vue';
</script>
<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <Navigation />
      </el-header>
      <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main class="el-main"><CourseList /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  padding: 0;
  background-color: #373d41;
}
.el-main {
  background-color: #eef1f6;
}
.el-container {
  height: 100vh;
  width: 100vw;
}

</style>