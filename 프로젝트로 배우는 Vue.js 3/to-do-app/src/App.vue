<template>
  <div class="name"> {{ name }} </div>
  <div class="name"> {{ student }} </div>
  <button class="btn btn-primary" v-on:click="updateName">Click me</button>  
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const name = ref("Test");
    const student = reactive({id: -1})
    const updateName = () => {
      name.value = "Taehyun Lee";
      student.id = 201602719;
    }
    return {
      name,
      student,
      updateName,
    };
  }
}
</script>

<style>
  .name {
    color: blue;
  }
</style>
