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
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <button class="btn btn-block btn-outline btn-info btn-sm" @click="() => newPage()">
                    <Icon name="f7:plus-app" class="h-5 w-5" /> New page
                </button>
                <!-- Sidebar content here -->
                <li v-for="page in pages"><button :class="['btn btn-xs', currentPage && page.id == currentPage.id ? 'btn-active' : '']" @click="() => openPage(page)">{{ page.title }}</button></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import useToast from '~/composables/toast';
import { usePageStore } from '~/stores/pageStore';
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