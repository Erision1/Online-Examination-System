<template>
  <div v-if="isOpen" class="edit-question-modal">
    <form @submit.prevent="saveQuestion">
      <h2>{{ question.id ? '编辑题目' : '添加题目' }}</h2>
      <div>
        <label for="type">题目类型:</label>
        <select id="type" v-model="question.type">
          <option value="单选题">单选题</option>
          <option value="多选题">多选题</option>
          <option value="判断题">判断题</option>
          <option value="填空题">填空题</option>
          <option value="主观题">主观题</option>
        </select>
      </div>

      <!-- 题目内容 -->
      <div>
        <label for="content">题目内容:</label>
        <textarea id="content" v-model="question.content" placeholder="题目内容" required></textarea>
      </div>

      <!-- 单选题和多选题的选项 -->
      <div v-if="question.type !== '4' && question.type !== '3'">
        <div v-for="(option, index) in question.options" :key="index">
          <label :for="`option-${index}`">选项 {{ index + 1 }}:</label>
          <input :id="`option-${index}`" v-model="option.text" placeholder="选项内容" required>
          <input v-if="question.type === '1'" type="checkbox" :checked="option.isCorrect" @change="option.isCorrect = $event.target.checked">
          <label v-if="question.type === '1'">正确答案</label>
        </div>
        <button v-if="question.type !== 'fill_in_the_blank'" @click="addOption">添加选项</button>
      </div>

      <!-- 填空题的空格 -->
      <div v-if="question.type === 'fill_in_the_blank'">
        <div v-for="(blank, index) in question.blanks" :key="index">
          <label :for="`blank-${index}`">空格 {{ index + 1 }}:</label>
          <input :id="`blank-${index}`" v-model="blank.answer" placeholder="标准答案" required>
        </div>
        <button @click="addBlank">添加空格</button>
      </div>

      <div>
        <label for="score">分数:</label>
        <input id="score" v-model.number="question.score" type="number" min="0" max="100" placeholder="分数" required>
      </div>

      <button type="submit">保存</button>
      <button @click="$emit('close')">取消</button>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  question: Object,
  isOpen: Boolean
});

const emits = defineEmits(['close', 'save']);

// 初始选项和空格数量
const defaultOption = { text: '', isCorrect: false };
const defaultBlank = { answer: '' };

// 选项和空格的响应式数据
const options = ref(props.question.options || []);
const blanks = ref(props.question.blanks || []);

// 同步options和blanks到question对象
watch(options, () => {
  props.question.options = options.value;
});
watch(blanks, () => {
  props.question.blanks = blanks.value;
});

const addOption = () => {
  options.value.push(defaultOption);
};

const addBlank = () => {
  blanks.value.push(defaultBlank);
};

const saveQuestion = () => {
  // 发出保存事件，并附带题目数据
  emits('save', { ...props.question, options: options.value, blanks: blanks.value, score: Number(props.question.score) });
  //将数据提交至后端，同时关闭弹窗

};
</script>

<style scoped>
.edit-question-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>