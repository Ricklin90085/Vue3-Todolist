<template>
  <div class="todolist mx-auto my-20 px-6 py-9 shadow-2xl rounded-xl bg-white dark:bg-blueGray-900">
    <h1 class="text-5xl font-bold mb-7 text-gray-700 dark:text-white">
      Todo List
    </h1>
    <div class="flex items-center mb-5 px-3 bg-gray-100 dark:bg-gray-600 rounded-full">
      <input
        v-model="todoContent"
        type="text"
        class="block w-full h-10 px-3 dark:text-gray-50 bg-transparent rounded-lg focus:outline-none"
        placeholder="Do something ..."
        @keyup.enter="addTodo"
      >
      <button class="text-black dark:text-white w-10 h-10 ml-3 focus:outline-none" @click="addTodo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
    <nav class="mb-6 font-semibold">
      <ul class="grid gap-x-8 grid-cols-3 text-center text-gray-700">
        <li
          :class="{ 'bg-gray-100': todoFilter === 'all', 'text-gray-800': todoFilter === 'all', 'dark:text-gray-100': todoFilter !== 'all' }"
          class="py-2 rounded-full transition-colors duration-150 cursor-pointer"
          @click="todoFilter = 'all'"
        >
          ALL
        </li>
        <li
          :class="{ 'bg-gray-100': todoFilter === 'onGoing', 'text-gray-800': todoFilter === 'onGoing', 'dark:text-gray-100': todoFilter !== 'onGoing' }"
          class="py-2 rounded-full transition-colors duration-150 cursor-pointer"
          @click="todoFilter = 'onGoing'"
        >
          On going
        </li>
        <li
          :class="{ 'bg-gray-100': todoFilter === 'completed', 'text-gray-800': todoFilter === 'completed', 'dark:text-gray-100': todoFilter !== 'completed' }"
          class="py-2 rounded-full transition-colors duration-150 cursor-pointer"
          @click="todoFilter = 'completed'"
        >
          Completed
        </li>
      </ul>
    </nav>
    <ul>
      <li
        v-for="todo in filterTodoList"
        :key="todo"
        class="todolist-item flex items-center px-5 py-3 rounded-xl"
      >
        <input v-model="todo.isDone" type="checkbox" class="todolist__checkbox-input hidden">
        <span
          class="todolist__checkbox relative inline-block w-5 h-5 mr-3 bg-white rounded-md cursor-pointer"
          @click="todo.isDone = !todo.isDone"
        />
        <input
          type="text"
          v-show="todo.isEdit"
          v-model="todo.content"
          class="w-4/6 border-b border-white bg-transparent focus:outline-none"
          @keyup.enter="todo.isEdit = false"
        >
        <span v-show="!todo.isEdit" :class="{ 'todolist-item__content--done': todo.isDone }" class="todolist-item__content">
          {{ todo.content }}
        </span>
        <div class="flex ml-auto">
          <button class="w-5 focus:outline-none" @click="todo.isEdit = !todo.isEdit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button class="w-5 ml-3 focus:outline-none" @click="deleteTodo(todo.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

export default {
  props: {
    initData: Object
  },
  setup(props) {
    const todoContent = ref('')
    const todoFilter = ref('all')
    let todoList = reactive({
        data: props.initData ? [...props.initData] : []
    })

    const filterTodoList = computed(() => {
      const filters = {
        all: todoList.data,
        onGoing: todoList.data.filter((todo) => {
            return todo.isDone === false
        }),
        completed: todoList.data.filter((todo) => {
            return todo.isDone === true
          })
      }

      return filters[todoFilter.value]
    })

    function addTodo() {
      if (todoContent.value === '') {
        return
      }
      todoList.data.push({
        id: todoList.data.length,
        content: todoContent.value,
        isDone: false,
        isEdit: false
      })
      todoContent.value = ''
    }

    function deleteTodo(id) {
      todoList.data = todoList.data.filter((todo) => {
        return todo.id !== id
      })
      console.log(todoList.data)
    }

    return { todoContent, todoFilter, todoList, filterTodoList, addTodo, deleteTodo }
  }
}
</script>

<style lang="scss">
  .todolist{
    width: 450px;
    &-item + &-item{
      margin-top: 20px;
    }
    &-item{
      &__content{
        position: relative;
        &::before{
          content: '';
            position: absolute;
            display: block;
            top: 50%;
            left: -2px;
            transform: translateY(-50%);
            width: 0%;
            height: 1px;
            background-color: #000;
            transition: width .3s;
        }
        &--done{
          &::before{
            width: 115%;
          }
        }
      }
      &:nth-child(4n+1) {
        @apply bg-red-300;
      }
      &:nth-child(4n+2) {
        @apply bg-teal-300;
      }
      &:nth-child(4n+3) {
        @apply bg-purple-300;
      }
      &:nth-child(4n+4) {
        @apply bg-yellow-300;
      }
    }
    .dark &-item{
      &:nth-child(4n+1) {
        @apply bg-red-400;
      }
      &:nth-child(4n+2) {
        @apply bg-teal-400;
      }
      &:nth-child(4n+3) {
        @apply bg-purple-400;
      }
      &:nth-child(4n+4) {
        @apply bg-yellow-400;
      }
    }
    &__checkbox{
      &-input:checked + &{
        &:before{
          width: 8px;
          transition: width .2s;
        }
        &:after{
          width: 13px;
          transition: width .2s .2s;
        }
      }
      &:before, &:after{
        content: '';
        position: absolute;
        width: 0px;
        height: 2px;
        border-radius: 2px;
        background-color: #334155;
        transform-origin: 0% 0%;
      }
      &:before{
        left: 4px;
        top: 9px;
        transform: rotate(45deg);
      }
      &:after{
        left: 7px;
        top: 15px;
        transform: rotate(308deg);
      }
    }
  }
</style>