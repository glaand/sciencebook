    <template>
    <section class="min-h-screen">
        <navbar />
        <div v-if="!loading">
            <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li v-for="item in timeline" :key="item.id">
                    <div class="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                    </div>
                    <div class="mb-10" :class="getClass(item.position)">
                    <time class="font-mono italic">{{ formatDatetime(item.createdAt) }}</time>
                    <div class="text-lg font-black">{{ item.title }}</div>
                    {{ item.content }}
                    </div>
                    <hr/>
                </li>
            </ul>
        </div>
        <div v-else class="flex items-center justify-center h-full flex-col h-min-screen gap-8">
            <div>
                <span class="loading loading-ball loading-xs"></span>
                <span class="loading loading-ball loading-sm"></span>
                <span class="loading loading-ball loading-md"></span>
                <span class="loading loading-ball loading-lg"></span>
            </div>
            <p class="text-xl p-4">Hang tight! I'm crafting your personalized notebook timeline - <i>C.A.R.L</i></p>
        </div>
    </section>
</template>

<script setup>
import moment from 'moment';

const pageStore = usePageStore();
const timeline = ref([]);
const loading = ref(true);
const formatDatetime = (datetime) => {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
};
const getClass = (position) => {
    if (position == 'start') {
        return 'timeline-start md:text-end';
    }
    else {
        return 'timeline-end';
    }
};
onMounted(async () => {
    timeline.value = await pageStore.getTimeline();
    loading.value = false;
});
</script>
