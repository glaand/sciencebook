<template>
  <div>
    <navbar />
    <canvas
      id="wordcloudcanvas"
      ref="wordcloudcanvas"
      width="2000"
      height="800"
    ></canvas>
  </div>
</template>
<script setup>
import WordCloud from 'wordcloud'

const wordcloudcanvas = ref(null);

const pageStore = usePageStore();

onMounted(async () => {
  const canvas = wordcloudcanvas.value;
  const ctx = document.getElementById('wordcloudcanvas');
  // set canvas width and height to match parent container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const words = await pageStore.getAllWords();
  WordCloud(ctx, { list: words, weightFactor: 40, origin: [0,0]})
})
</script>
<style scoped>
#wordcloudcanvas {
  width: 100%; /* Set width to 100% of parent container */
  height: 100%; /* Set height to 100% of parent container */
}
</style>