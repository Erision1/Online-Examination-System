<template>
    <!--显示导航栏-->
    <div class="course-list-container">
        <!--显示课程列表-->
        <main class="course-list"> 
            <h1>教授课程</h1>
            <div class="search-box">
                <el-input
                placeholder="搜索课程..."
                prefix-icon="el-icon-search"
                v-model="searchQuery"
                clearable
                ></el-input>
            </div>
            <!--显示课程列表,使用表格进行展示-->
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>课程名称</th>
                        <th>课程描述</th> 
                        <th>操作</th>                        
                    </tr>                    
                </thead>
                <tbody>
                    <tr v-for="(course, index) in filteredCourses" :key="course.id" >
                        <td>{{ index + 1 }}</td>
                        <td>{{ course.name }}</td>
                        <td>{{ course.description }}</td>
                        <td><button @click="() => router.push({ name: `teacher/course/${course.id}/questions` })">查看考题</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination-container">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="courses.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            ></el-pagination>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useCourseStore } from '@/store/useCourseStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ElInput, ElPagination } from 'element-plus';
const router = useRouter();
const courseStore = useCourseStore();

//在组件挂载后立即获取课程列表
onMounted(() => {
    courseStore.fetchCourses();
});
// const courses = computed(() => courseStore.courses);
// 创建一个默认的课程列表
const courses = ref([{
    id: 1,
    name: 'Vue基础',
    description: '这是一门关于Vue的课程'
},
{
    id: 2,
    name: 'React基础',
    description: '这是一门关于React的课程'
}]);

const searchQuery = ref('');
const pageSize = ref(10);
const currentPage = ref(1);

const filteredCourses = computed(() => {
  return Array.isArray(courses.value) 
    ? courses.value.filter((course) => {
      return course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
             course.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    })
    : [];
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};
</script>

<style scoped>
.search-box {
  margin: 20px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.course-list-container {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.course-list {
  width: 100vw;
  height: 100vh;
  max-width: 800px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

h1 {
    text-align: center;
    margin: 20px;
    color: #333;
    font-size: 24px;
    font-weight: 500;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
thead {
  background-color: #f2f2f2;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  color: #555;
  font-weight: 500;
}

.course-row:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.question-button {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.question-button:hover {
  background-color: #66b1ff;
}
</style>    