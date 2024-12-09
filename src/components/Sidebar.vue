<template>
  <el-aside class="el-aside">
    <el-menu class="el-menu-vertical-demo" text-color="#fff" :default-active="defaultActive" background-color="#333744" @select="handleSelect">
      <!-- 没有子菜单的 -->
      <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">
        <dynamic-icon :icon="item.icon" />
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
svg {
  width:18px;
  height:18px;
  margin-right:5px;
}
.el-menu{
  border-right:none;
  h3{
      position: relative;
      top: 10px;
      left: -20px;
      line-height:48px;
      color:#fff;
      text-align:center;
  }
}
.el-aside{
width: 200px;
height:100%;
background-color:#333744;
color:#fff;
font-size:14px;
font-weight:bold;
text-align:center;
}
.dynamic-icon {
width: 18px;
height: 18px;
margin-right: 5px;
}

.el-menu-item, .el-sub-menu__title {
display: flex;
align-items: center;
justify-content: flex-start;
color: #fff;
}

.el-menu-item:hover, .el-sub-menu__title:hover {
background-color: #4a4e59;
}

.el-menu-item.is-active, .el-sub-menu__title.is-active {
background-color: #4a4e59;
}
</style>

<script setup>
import { computed } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';
import { House, Notebook, Memo, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import DynamicIcon from './DynamicIcon.vue';
import { useAuthStore } from '@/store';

const router = useRouter();
const store = useAuthStore();
const user = computed(() => store.user);

const menu = computed(() => {
  const teacherItems = [
    { label: '首页', path: '/teacher', icon: House },
    { label: '个人中心', path: '/teacher/profile', icon: User },
    { label: '教授课程', path: '/teacher/courses', icon: Notebook },
    { label: '考试情况', path: '/teacher/examInfo', icon: Memo },
  ];
  const studentItems = [
    { label: '首页', path: '/student', icon: House },
    { label: '个人中心', path: '/student/profile', icon: User },
    { label: '考试', path: '/student/courses', icon: Notebook },
  ];
  return user.value.identity === '老师' ? teacherItems : studentItems;
});

const handleSelect = (index) => {
  // 导航到选择的菜单项
  router.push(index);
};

// 如果未找到路径返回至首页
const defaultActive = computed(() => {
  const path = router.currentRoute.value.path;
  const foundItem = menu.value.find(item => item.path === path);
  return foundItem ? foundItem.path : (user.value.identity === '老师' ? '/teacher' : '/student');
});
</script>