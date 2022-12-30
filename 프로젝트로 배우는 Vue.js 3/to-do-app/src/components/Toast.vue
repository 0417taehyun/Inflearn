<template>
  <div
    class="alert toast-box"
    :class="isSuccess === true ? 'alert-success' : 'alert-danger'"
    role="alert"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.toast-box {
  position: fixed;
  top: 3px;
  right: 5px;
}
</style>