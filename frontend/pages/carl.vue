<template>
  <div>
    <navbar class="fixed top-0 z-50 w-screen" />
    <div class="h-screen flex flex-col">
        <div class="h-5/6 px-5 mt-20 overflow-auto">
            <div v-for="chat in chats" :key="chat.id" :class="'flex chat chat-' + (chat.sender == 'C.A.R.L' ? 'start' : 'end justify-end')">
                <div v-if="chat.loading" class="chat-bubble loading">
                    <div class="animate-pulse">Loading...</div>
                </div>
                <div v-else :class="'text-sm chat-bubble ' + (chat.sender == 'C.A.R.L' ? 'chat-bubble-primary' : '')" v-html="chat.message"></div>
            </div>
        </div>
        <div class="h-1/6">
            <chatbar />
        </div>
    </div>
  </div>
</template>

<script setup>
const chatStore = useChatStore();
const { chats } = storeToRefs(chatStore);
</script>