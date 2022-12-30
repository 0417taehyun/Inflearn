import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const toastMessage = ref("");
  const showToast = ref(false);
  const isSuccess = ref(false);
  const timeout = ref(0);
  onUnmounted(() => {
    clearTimeout(timeout.value);
  });
  const triggerToast = (message, status) => {
    showToast.value = true;
    toastMessage.value = message;
    isSuccess.value = status;
    timeout.value = setTimeout(() => {
      toastMessage.value = "";
      showToast.value = false;
      isSuccess.value = false;
    }, 2000);
  };

  return {
    isSuccess,
    toastMessage,
    showToast,
    triggerToast,
  };
};
