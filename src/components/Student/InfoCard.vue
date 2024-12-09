<template>
    <div class="student-info-card">
      <h2>个人信息</h2>
      <form @submit.prevent="saveInfo">
        <div class="form-group">
          <label for="name">姓名:</label>
          <input type="text" id="name" v-model="student.name" required class="form-control" disabled>
        </div>
        <div class="form-group">
          <label for="gender">性别:</label>
          <select id="gender" v-model="student.gender" class="form-control" disabled>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="form-group">
          <label for="phone">手机号:</label>
          <input type="tel" id="phone" v-model="student.phone" required class="form-control">
        </div>
        <div class="form-group">
          <label for="studentId">学号：</label>
          <input type="text" id="studentId" v-model="student.id" class="form-control" disabled>
        </div>
        <div class="form-group">
          <label for="college">学院:</label>
          <input type="text" id="college" v-model="student.college" required class="form-control">
        </div>
        <div class="form-group">
          <label for="courses">课程:</label>
          <input type="text" id="courses" v-model="courseInput" placeholder="添加课程" class="form-control">
          <button type="button" @click="addCourse" class="btn btn-secondary">添加课程</button>
        </div>
        <div class="courses-list">
          <h3>已选课程:</h3>
          <ul>
            <li v-for="(course, index) in student.courses" :key="index">{{ course }}</li>
          </ul>
        </div>
        <button type="submit" class="btn btn-primary">保存</button>
      </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
    student: Object
});

const student = ref( props.student || {
    name: '张三',
    gender: '男',
    phone: '13612345678',
    id: '20210001',
    college: '信息科学与技术学院',
    courses: ['数据结构', '计算机网络', '操作系统'] 
});

const courseInput = ref('');
const emits = defineEmits(['update:student']);

function addCourse() {
  if (courseInput.value.trim() !== '') {
    student.value.courses.push(courseInput.value.trim());
    courseInput.value = ''; // 清空输入框
  }
}

function saveInfo() {
  axios.post('/api/students', student.value) //需要完善
   .then(res => {
      console.log(res);
      emits('update:student', student.value);
      alert('保存成功');
    })
   .catch(err => {
      console.error(err);
      alert('保存失败');
    });
};
</script>

<style scoped>
.student-info-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    margin: 20px;
    text-align: center;
}
form {
    position: relative;
    left: 20%;
}

label {
    width: 60px;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-control {
  width: 40%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

.btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  position: relative;
  left: 25%;
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.courses-list {
  margin-top: 20px;
}

.courses-list ul {
  list-style: none;
  padding: 0;
  border-top: 1px solid #eee;
  margin-top: 10px;
}
.courses-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s;
}

.courses-list li:hover { 
    width: 50%;   
    background-color: #f8f9fa;
}
</style>
