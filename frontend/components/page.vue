<template>
    <div class="h-3/4">
        <h1 class="mb-4">
            <div class="flex">
                <div class="w-8/12 join">
                    <input type="text" class="input input-xs input-bordered w-full max-w-xs join-item" v-model="currentPage.title" @input="onAutoSave" />
                    <button class="btn btn-outline btn-info btn-xs join-item" @click="() => savePage()">
                        <Icon name="material-symbols:save"/>Save Page
                    </button>
                    <span v-if="isSaving" class="animate-pulse ml-4">Saving...</span>
                </div>
                <div class="w-4/12 flex justify-end">
                    <button class="btn btn-error btn-xs" @click="() => deletePage()">
                        <Icon name="mdi:bin"/>Delete Page
                    </button>
                </div>
            </div>
            <div class="flex">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Auto save?</span> 
                        <input type="checkbox" checked="checked" class="checkbox checkbox-primary ml-3" v-model="autosave"/>
                    </label>
                </div>
            </div>
        </h1>
        <quill-editor ref="quill" theme="snow" :content="currentPage.content" v-model:content="currentPage.content" contentType="html" @textChange="onAutoSave"></quill-editor>
    </div>
</template>

<script setup lang="ts">
import useToast from '~/composables/toast';
const { show } = useToast();
const pageStore = usePageStore();
const { currentPage } = storeToRefs(pageStore);
const quill = ref(null);
const isSaving = ref(false);
const autosave = ref(false);

const savePage = async () => {
    isSaving.value = true;
    await pageStore.updatePage();
    isSaving.value = false;

};

const deletePage = async () => {
    if (confirm('Are you sure you want to delete this page?')) {
        await pageStore.deletePage(currentPage.value);
        show('Page deleted', 'success');
    }
};

const onAutoSave = () => {
    if (autosave.value) {
        // Debounce the save function
        clearTimeout(window['autoSaveTimeout']);
        window['autoSaveTimeout'] = setTimeout(() => {
            savePage();
        }, 300);
    }
};

watch(currentPage, (newPage, oldPage) => {
    if (newPage.content !== oldPage.content) {
        quill.value.setContents(newPage.content || '');
    }
});

</script>
