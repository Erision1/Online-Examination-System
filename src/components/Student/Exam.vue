<template>
    <div class="exam-page">
        <header>
            <h1>考试试卷</h1>
            <p>考试说明: {{ examDetails }}</p>
            <p>考试名称: {{ examName }} | 考试时长: {{ examDuration }}分钟</p>
            <p>剩余时间：{{ timeLeft }}</p>
        </header>
        <main>
            <ul class="question-list">
            <li v-for="(question, index) in questions" :key="index" class="question-item">
                <p>{{ index + 1 }}. {{ question.content }}</p>
                <div v-if="question.type === 'single'">
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        <label :for="`option-${index}-${optionIndex}`">
                            <input
                            type="radio"
                            :id="`option-${index}-${optionIndex}`"
                            :value="option.value"
                            v-model="selectedAnswers[question.id]"
                            />
                            {{ option.text }}
                        </label>
                    </div>
                </div>
                <div v-if="question.type ==='multiple'">
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                        <label :for="`option-${index}-${optionIndex}`">
                            <input
                            type="checkbox"
                            :id="`option-${index}-${optionIndex}`"
                            :value="option.value"
                            v-model="selectedAnswers[question.id]"
                            />
                            {{ option.text }}
                        </label>
                    </div>
                </div>
                <div v-if="question.type === 'fill'">
                    <input type="text" v-model="selectedAnswers[question.id]">
                </div>
            </li>
            </ul>
            <button @click="submitExam">交卷</button>
        </main>
        <footer v-if="hasSubmitted">
            <p>你的得分：{{ score }}分</p>

        </footer>
    </div>
</template>
  
<script setup>
import { useExamStore } from '@/store/useExamStore';
import { computed,onMounted } from 'vue';

const examStore = useExamStore();

onMounted(() => {
    examStore.fetchQuestions();
    examStore.startExam();
});

const timeLeft = computed(() => {
    const now = new Date();
    const diff  = examStore.examEndTime - now.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}分${seconds}秒`;
});

const examName = computed(() => examStore.examName);
const examDetails = computed(() => examStore.examDetails);
const examDuration = computed(() => examStore.examDuration);
const questions = computed(() => examStore.questions);
const submitExam = () => {
    examStore.submitExam(selectedAnswers);
};
</script>
  
<style scoped>
.exam-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}
h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
}
header {
    margin-bottom: 20px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
header p {
  margin: 5px 0;
}
main {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  padding: 20px;
}
.question-list {
  list-style: none;
  padding: 0;
}
.question-item {
  margin-bottom: 20px;
}
.question-item p {
  margin-bottom: 10px;
}
input[type="radio"],
input[type="checkbox"],
input[type="text"] {
  margin-right: 10px;
  accent-color:#007bff;
}
input[type="radio"] {
  border-radius: 50%; /* 单选按钮圆形样式 */
}
input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  margin-top: 5px;
}
button {
  display: block;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  left: 50%;
}
button:hover {
  background-color: #0056b3;
}
footer {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    text-align: center;
}

footer p {
  margin: 5px 0;
}

</style>