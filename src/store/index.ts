//便于全局管理使用
import { createPinia } from 'pinia';
import { useAuthStore } from './useAuthStore';
import { useCourseStore} from './useCourseStore';
import { useExamStore } from './useExamStore';
import { useExamInfoStore } from './useExamInfoStore';
import { useQuestionStore } from './useQuestionStore';

export const pinia = createPinia();

export { useAuthStore, useCourseStore, useExamStore, useExamInfoStore, useQuestionStore };
