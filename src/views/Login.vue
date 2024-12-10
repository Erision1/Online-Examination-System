<template>
  <div id="login">
    <div class="container"> <!--背景-->
            <div class="form-wrapper">
                <div class="header">登录</div>
                <!--登陆选择-->
                <form @submit.prevent="login" method="post">
                    <label for="username">用户名：</label>
                    <input v-model="username" type="text" id="username" name="username" placeholder="请输入用户名" required> <!--数据绑定-->
                    <label for="password">密码：</label>
                    <input v-model="password" type="password" id="password" name="password" placeholder="请输入密码" required>
                    <label for="identity">身份：</label>
                    <select v-model="identity" id="identity" name="identity" required >
                        <option value="学生">学生</option>
                        <option value="老师">教师</option>
                    </select>
                    <button class="login" type="submit" title="登录">登录</button>
                    <p v-if="errorMessages" class="error-message">{{ errorMessages }}</p> <!-- 显示错误信息 --> 
                </form>     
            </div>
        </div>

  </div>  
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const store = useAuthStore();
const router = useRouter();
const username = ref(''); 
const password = ref('');
const identity = ref('学生');
const errorMessages = ref('');

const login = async () => {
  if (!username.value || !password.value) {
    errorMessages.value = '用户名或密码不能为空！';
    return;
  }
  try {
    // await store.login('/api/login', username.value, password.value, identity.value);
    await store.login(username.value, password.value, identity.value);
    if (store.isLoggedIn) {
      ElMessage.success('登录成功！');
      router.push(identity.value === '学生' ? '/student' : '/teacher');
    } else {
      errorMessages.value = '登录失败，请重试！';
    }
  } catch (error) {
    errorMessages.value = error.message || '登录请求失败';
  }
};
</script>

<style scoped>
form {
    width: 50%;
    /* justify-content: flex-end; */
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 25%;
    left: 25%;
}
.container {
  height: 100vh;
  width: 100vw; /*使背景占满整个窗口*/
  position: relative;
  z-index: 10;
  background-image: linear-gradient(to right, #87ceeb, #b0e0e6); /*渐变色背景*/
}
.form-wrapper {
  top: 25%;
  left: 35%;
  white-space: pre-wrap;
  height: 400px;
  width: 350px;
  /* background-position: center; */
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  position: absolute;
  left: 40%;
  top: 10%;
}
input,
label {
  font-size: 15px;
  margin: 5px;
}
input {
  line-height: 20px;
}
input :active{
  outline: none;
}
.login {
  color: #fff;
  left: 25%;
  position: relative;
  border-radius: 2px;
  background-image: linear-gradient(to right, #87ceeb, #b0e0e6); /*渐变色背景*/
  line-height: 35px;
  width: 75px;
  text-align: center;
  font-size: 15px;
  margin: 10px;
  border: none;
}
select#identity {
    height: 26px;
    position: relative;
    top: 5px;
    width: 80px;
}
.error-message {
  position: relative;
  left: 15%;
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>