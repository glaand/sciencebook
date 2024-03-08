const showToast = ref(false); // Reactive variable to control toast visibility
const message = ref(""); // Reactive variable to store the message
const type = ref(""); // Reactive variable to store the type of toast

export default function useToast() {
  // Method to show the toast
  const show = (messageParam, typeParam) => {
    message.value = messageParam;
    type.value = typeParam;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000); // Hide the toast after 3 seconds
  };

  return {
    showToast: readonly(showToast),
    show,
    message,
    type,
  };
}
