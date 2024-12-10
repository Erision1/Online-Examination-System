<template>
    <div class="teacher-info-card">
        <h2>个人信息</h2>
        <form @submit.prevent="saveInfo">
            <div class="form_group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="teacher.name" required disabled>
            </div>
            <div class="form_group">
                <label for="gender">性别:</label>
                <select id="gender" v-model="teacher.gender" required>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </div>
            <div class="form_group">
                <label for="phone">手机号:</label>
                <input type="tel" id="phone" v-model="teacher.phone" required>
            </div>
            <div class="form_group">
                <label for="employeeId">工号：</label>
                <input type="text" id="employeeId" v-model="teacher.id" required>
            </div>
            <div class="form_group">
                <label for="college">学院:</label>
                <input type="text" id="college" v-model="teacher.college" required>
            </div>
            <div class="form_group">
                <label for="courses">教授课程:</label>
                <ul>
                    <li v-for="(course, index) in teacher.courses" :key="index">{{ course }}</li>
                </ul>
            </div>
            <button type="submit" class="btn btn-primary">保存</button>
        </form>
    </div>
</template>
  
<script setup>
// import { onMounted } from 'vue';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const teacher = authStore.user;

// 保存用户信息
async function saveInfo() {
  try {
    // const response = await axios.put('/api/teacher/update', teacher.value);
    authStore.updateUser(teacher.value);
    console.log(response.data);
    alert('保存成功');
  } catch (err) {
    console.error(err);
    alert('保存失败');
  }
}

</script>

<style scoped>
.teacher-info-card {
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
  width: 75px;
}

.form_group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form_group input[type="text"],
.form_group input[type="tel"],
.form_group select {
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

.btn-primary {
  position: relative;
  left: 25%;
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>