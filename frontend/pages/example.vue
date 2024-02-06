<template>
  <div>
    <div class="p-4 flex gap-4">
      <button class="btn">Hello daisyUI</button>
    </div>
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button class="btn btn-primary" @click="openWindow">
            Get Started
          </button>
        </div>
      </div>
    </div>
    <div class="p-10">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    <VueWinBox v-if="showPieChart" ref="wbRef" :options="options" @onmove="onMove">
      <Charts3DBar />
    </VueWinBox>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { VueWinBox } from 'vue-winbox'

const count = ref(0)
const wbRef = ref()
const showPieChart = ref(false)

//WinBox options
const options = {
  title: 'Current count: 0',
  class: 'modern',
}

setInterval(() => {
  count.value++
  wbRef.value?.winbox?.setTitle(`Current count: ${count.value}`)
}, 500)

const openWindow = () => {
  showPieChart.value = true
};

const ws = new WebSocket("ws://localhost:10000/ws");

ws.onopen = () => {
    console.log("WebSocket connection opened");
};

ws.onmessage = (event) => {
    console.log("HI")
    // Handle received data
    const data = new Float32Array(event.data);
    console.log("Received Data:", data);
};

ws.ondatachannel = ((dc) => {
    const channel = dc.channel;
    console.log('Got data channel', channel);
    channel.onmessage = ((message) => {
        console.log('Got message', message.data);
    })
})

ws.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
};
</script>