<template>
    <div class="common-layout">
      <el-container width="100vw" height="100vh">
          <el-header class="el-header">
            <Navigation />
          </el-header> 
          <el-container>
            <el-aside width="200px">
              <Sidebar /> 
            </el-aside> 
            <el-main class="el-main"> <!--编写主页部分-->
              <div class="course-list-container">
                <main class="course-list">
                  <h1>课程</h1>
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
                                <th>分数</th>
                                <th>操作</th>                        
                            </tr>                    
                        </thead>
                        <tbody>
                            <tr v-for="(course, index) in filteredCourses" :key="course.id" >
                                <td>{{ index + 1 }}</td>
                                <td>{{ course.name }}</td>
                                <td>{{ course.desprition }}</td>
                                <td>
                                    <span v-if="course.score"> {{ course.score }}</span> <!--显示分数-->
                                    <span v-else> -- </span> <!--未开始考试的课程分数显示---->
                                </td>
                                <td>
                                    <button v-if="course.score === 0" @click="() => showExam(course.id)">开始考试</button>
                                    <button v-if="course.score" @click="() => showExam(course.id)">重考</button>
                                </td>
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
            </el-main>
        </el-container>
      </el-container>
    </div>
    
</template>

<script setup>
import { useCourseStore } from '@/store/useCourseStore';
import Navigation from '../Navigation.vue';
import Sidebar from '../Sidebar.vue';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { ElInput, ElPagination } from 'element-plus';

const router = useRouter();
const courseStore = useCourseStore();
//向后端请求学生的课程列表
// //在组件挂载后立即获取课程列表
// onMounted(() => {
//     courseStore.fetchCourses();
// });
// const courses = computed(() => courseStore.courses);

const courses = ref([{
    id: 1,
    name: 'Vue基础',
    desprition: '这是一门关于Vue的课程',
    score: 80
},
{
    id: 2,
    name: 'React基础',
    desprition: '这是一门关于React的课程',
    score: 0
}]);

const searchQuery = ref('');
const pageSize = ref(10);
const currentPage = ref(1);

const filteredCourses = computed(() => {
  return courses.value.filter((course) => {
    return course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           course.desprition.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

function showExam(id) {
    router.push({ name: 'exam', params: { id } });
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eef1f6;
}
.el-container {
  height: 100vh;
  width: 100vw;
}
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
