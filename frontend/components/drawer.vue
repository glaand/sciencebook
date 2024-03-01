<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col px-4 h-screen">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden mb-4">Open drawer</label>
            <page v-if="currentPage" />
        </div> 
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <button class="btn btn-block btn-outline btn-info" @click="() => pageStore.newPage()">
                    <Icon name="f7:plus-app" class="h-5 w-5" /> New page
                </button>
                <!-- Sidebar content here -->
                <li v-for="page in pages"><button :class="['btn btn-xs', currentPage && page.id == currentPage.id ? 'btn-active' : '']" @click="() => pageStore.setCurrentPage(page)">{{ page.title }}</button></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePageStore } from '~/stores/pageStore';
const pageStore = usePageStore();

const { pages, currentPage } = storeToRefs(pageStore);

onMounted(() => {
    pageStore.fetchPages();
});

</script>