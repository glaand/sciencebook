<template>
    <h1 class="mb-4">
        <div class="flex">
            <div class="w-4/12">
                <input type="text" class="input input-bordered w-full max-w-xs" v-model="currentPage.title" @change="onTextChange" />
                <span v-if="isSaving" class="animate-pulse ml-4">Saving...</span>
            </div>
            <div class="w-8/12 flex justify-end">
                <button class="btn btn-error" @click="() => pageStore.deletePage(currentPage)">
                    <Icon name="mdi:bin"/>Delete Page
                </button>
            </div>
        </div>
    </h1>
    <quill-editor ref="quill" theme="snow" :content="currentPage.content" v-model:content="currentPage.content" contentType="html" @textChange="onTextChange"></quill-editor>
</template>

<script setup lang="ts">
const pageStore = usePageStore();
const { currentPage } = storeToRefs(pageStore);
const isSaving = ref(false);
const ignoreFirstChange = ref(true);

const onTextChange = useDebounce(async () => {
    if (ignoreFirstChange.value) {
        ignoreFirstChange.value = false;
        return;
    }
    isSaving.value = true;
    await pageStore.updatePage();
    isSaving.value = false;

}, 300);

</script>
