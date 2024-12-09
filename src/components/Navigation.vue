<template>
    <div class="navigation">
       <el-header class="el-header">
          <div class="left-content">
              <el-breadcrumb seprator="/" class="breadcrumb">
                  <el-breadcrumb-item to="`/${user.value.identity}/home` ">首页</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <h2>在线考试系统 -- {{ user.identity }}端</h2>
          <div class="user-info">
            <el-dropdown>
              <span class="el-dropdown-link">
                <!-- 个人信息图标，点击可以展示个人信息窗口 -->
                <el-icon ><avatar /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>        
          </div>
       </el-header>
       
    </div>
</template>
  
<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../store/useAuthStore'; // 引入store
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElBreadcrumb, ElBreadcrumbItem, ElIcon } from 'element-plus';
import { Avatar } from '@element-plus/icons-vue'; // 导入 Avatar 图标
import { useRouter } from 'vue-router'; // 引入路由

const router = useRouter();
const user = computed(() => useAuthStore().user || {
  identity: '老师' ,// 假设默认身份为教师
  username: '张三' ,// 假设未登录
}); // 从后端获取身份识别

// 登出功能
const loginout = () => {
  useAuthStore().logout();
  router.push('/');
};
</script>

<style scoped>
.el-header {
  width: 100%;
  background-color: #373d41;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.breadcrumb {
  margin-left: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #f2f2f2;
}

.el-avatar {
  margin-right: 10px;
}

.username {
  margin-right: 5px;
  color: #f2f2f2;
}

.el-dropdown-menu__item {
  cursor: pointer;
  color: #333;
}

.el-dropdown-menu__item:hover {
  background-color: #f9f9f9;
}
/* 响应式样式 */
@media (max-width: 768px) {
  .navigation {
    padding: 0 10px;
  }
}
</style>