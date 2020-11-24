<template>
  <div class="container mx-auto">
    <div v-for="i in arr" :key="i" class="bg-gray-300">
      {{ i.content }}
      <input type="text" v-model="i.content">
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'HelloWorld',
  setup() {
    const arr = reactive([{
      content: '123'
    }, {
      content: '234'
    }])
    return { arr }
  }
}
</script>
