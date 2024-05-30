<template>
    <div class="card h-full w-full bg-base-300 rounded-none">
        <div class="card-body w-full flex justify-center p-4">
            <div class="join w-full h-full">
                <textarea ref="textarea" class="textarea input-bordered join-item w-full h-full textarea-sm" placeholder="Please write your text" v-model="message" @keydown="handleKeydown"/>
                <button class="btn join-item btn-neutral h-full bg-base text-base" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const chatStore = useChatStore();

const message = ref("");
const textarea = ref(null);

const sendMessage = () => {
    const msg = message.value;
    message.value = "";
    textarea.value.focus();
    chatStore.sendMessage(msg);
};

const handleKeydown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
};
</script>
