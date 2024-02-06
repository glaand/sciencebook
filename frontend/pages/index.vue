<template>
  <div class="flex justify-center items-center h-screen flex-col text-center">
    <div class="w-full flex justify-center items-center text-center">
        <TruckIcon class="h-14 w-14 text-blue-500 mr-2" /><h1 class="text-5xl font-bold text-blue-500">Schattenwind</h1>
    </div>
    <div class="w-full py-5">
        <h2 class="text-3xl font-bold text-gray-300">Unleash Insights instantly: A Real-time Data Visualisation Tool</h2>
    </div>
    <div class="w-full">
        <div v-if="isConnected" class="flex justify-center items-center text-center">
            <CheckCircleIcon class="h-8 w-8 text-green-500 mr-2" /> Successfully connected to data source
        </div>
        <div v-if="!isConnected" class="flex justify-center items-center t">
            <select class="select select-bordered rounded-none rounded-l-lg" :disabled="isConnecting">
                <option selected>https://</option>
                <option>http://</option>
            </select>
            <input type="text" value="localhost:10000/ws" class="input input-bordered rounded-none rounded-r-lg" :disabled="isConnecting" />
            <div v-if="isConnecting">
                <span class="loading loading-ring loading-lg ml-2"></span>
            </div>
            <button v-if="!isConnecting && !isConnected" class="btn ml-2" @click="newConnection">New Connection</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon, TruckIcon } from '@heroicons/vue/24/outline'

const router = useRouter();

const isConnecting = ref(false);
const isConnected = ref(false);

const newConnection = () => {
    isConnecting.value = true;
    setTimeout(() => {
        isConnecting.value = false;
        isConnected.value = true;
        var audio = new Audio('/alert.mp3'); // path to file
        audio.play();
        setTimeout(() => {
            router.push('/example');
        }, 2000);
    }, 2000);
}
</script>
