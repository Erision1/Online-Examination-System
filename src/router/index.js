import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store';

// 懒加载组件，提高初始加载速度
const StudentHome = () => import('../views/StudentHome.vue');
const TeacherHome = () => import('../views/TeacherHome.vue');
const TeacherCourseList = () => import('../views/TeacherCourse.vue');
const CourseQuestions = () => import('../components/Teacher/QuestionEditor.vue'); // 教师编辑课程的考题
const StudentCourseList = () => import('../components/Student/ExamCourseList.vue');
const ExamDetailPage = () => import('../components/ExamDetailPage.vue'); // 学生考试详情页面
const ExamInfo = () => import('../views/TeacherExamInfo.vue'); //老师看到所教课程的一个总览
const Login = () => import('../views/Login.vue');
const StudentExam = () => import('../views/StudentExam.vue');
const TeacherProfile = () => import('../views/TeacherProfile.vue');
const StudentProfile = () => import('../views/StudentProfile.vue');

const routes = [
  { path: '/', name: 'Login', component: Login }, // 登录页面
  {
    path: '/student',
    name: 'StudentHome',
    component: StudentHome,
    meta: { requiresAuth: true }, // 需要认证
  },
  {
    path: '/teacher',
    name: 'TeacherHome',
    component: TeacherHome,
    meta: { requiresAuth: true }, // 需要认证
  },
  { path: '/teacher/courses', 
    component: TeacherCourseList 
  },
  {
    path: '/teacher/courses/:id/questions',
    name: 'TeacherCourseQuestions',
    component: CourseQuestions,
    props: true, // 允许传递动态参数
  }, //教师点击课程查看对应的考题
  {
    path: '/student/courses',
    name: 'StudentCourseList',
    component: StudentCourseList,
  },
  {
    path: '/teacher/exams/:examId',
    name: 'ExamDetail',
    component: ExamDetailPage,
  }, //某个学生的考试详情页面
  { path: '/teacher/examinfo', component: ExamInfo }, //显示老师所教课程的一个考试总览
  { path: '/teacher/profile', name: 'TeacherProfile', component: TeacherProfile }, // 教师个人信息页面
  { path: '/student/profile', name: 'StudentProfile', component: StudentProfile }, // 学生个人信息页面
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  // 使用 store 中的认证状态
  const isAuthenticated = store.isLoggedIn;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;