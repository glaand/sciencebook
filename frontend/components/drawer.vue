<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" v-model="showDrawer" />
        <div class="drawer-content flex flex-col px-4 h-screen">
            <label for="my-drawer-2" class="btn btn-primary btn-sm drawer-button lg:hidden mb-4">Open drawer</label>
            <page v-if="currentPage" />
            <div v-else class="flex items-center justify-center h-full">
                <h2>Please select a page</h2>
            </div>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content justify-start">
                <button class="btn btn-block btn-outline text-base-content justify-start" @click="() => newPage()">
                    <Icon name="f7:plus-app" class="h-5 w-5" /> New page
                </button>
                <!-- Sidebar content here -->
                <button v-for="page in pages" :class="['btn justify-start my-2', currentPage && page.id == currentPage.id ? 'btn-active' : '']" @click="() => openPage(page)">{{ page.title }}</button>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import useToast from '~/composables/toast';
const pageStore = usePageStore();

const { show } = useToast();

const { pages, currentPage } = storeToRefs(pageStore);

const showDrawer = ref(false);

const newPage = async () => {
    await pageStore.newPage();
    show('New page created', 'info');
    showDrawer.value = false;
};

const openPage = (page) => {
    pageStore.setCurrentPage(page);
    showDrawer.value = false;
};

onMounted(async () => {
    pageStore.fetchPages();
});

</script>