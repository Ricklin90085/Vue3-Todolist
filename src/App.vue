<template>
  <div class="flex container mx-auto py-5">
    <button :class="{ 'text-white': isDarkMode, 'text-gray-700': !isDarkMode }" class="relative w-10 h-10 ml-auto focus:outline-none" @click="toggleDarkMode">
      <svg :class="{ 'scale-100': isDarkMode, 'scale-0': !isDarkMode }" class="absolute top-0 transform transition-transform duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg :class="{ 'scale-100': !isDarkMode, 'scale-0': isDarkMode }" class="absolute top-0 transform transition-transform duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  </div>
  <TodoList class="transition-colors duration-150" :init-data="todoData" />
</template>

<script>
import { ref, reactive } from 'vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  },
  setup() {
    const todoData = reactive([{
      id: 0,
      content: 'Something...',
      isDone: false,
      isEdit: false
    }])
    let isDarkMode = ref(false)

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('html').classList.add('dark')
      isDarkMode.value = true
    } else {
      document.querySelector('html').classList.remove('dark')
      isDarkMode.value = false
    }

    function toggleDarkMode() {
      isDarkMode.value = !isDarkMode.value
      if (isDarkMode.value) {
        document.querySelector('html').classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.querySelector('html').classList.remove('dark')
        localStorage.theme = 'light'
      }
    }

    return { todoData, isDarkMode, toggleDarkMode }
  }
}
</script>
