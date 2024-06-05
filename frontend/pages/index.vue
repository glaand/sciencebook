<template>
    <section class="min-h-screen">
        <navbar />
        <div class="flex flex-col items-center justify-center container mx-auto gap-3 p-4 mt-10 text-center">
            <h1 class="text-4xl font-bold">Welcome to Sciencebook👋</h1>
            <p class="text-lg">Which feature do you want to explore?</p>
        </div>
        <div class="flex flex-wrap items-center justify-center mx-auto gap-3 p-4">
            <div class="card w-full sm:w-80 glass">
                <figure><img src="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?q=80&w=1000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="car!"/></figure>
                <div class="card-body">
                    <h2 class="card-title">Notebook</h2>
                    <p>In this section you can take notes of your scientific experiments.</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-block" @click="() => navigateTo('/notebook')">Open my notebook</button>
                    </div>
                </div>
            </div>
            <!-- You can adjust the width classes for different screen sizes as needed -->
            <div class="card w-full sm:w-80 glass">
                <figure><img src="https://images.unsplash.com/photo-1485882318661-43c518feb279?q=80&w=1000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="car!"/></figure>
                <div class="card-body">
                    <h2 class="card-title">Timeline</h2>
                    <p>Discover your note timeline, crafted with <b>C.A.R.L's</b> help.</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-block" @click="() => navigateTo('/timeline')">Open Timeline</button>
                    </div>
                </div>
            </div>
            <!-- You can adjust the width classes for different screen sizes as needed -->
            <div class="card w-full sm:w-80 glass">
                <figure><img src="https://images.unsplash.com/photo-1506788941197-1cbf01bb8bc5?q=80&w=1000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="car!"/></figure>
                <div class="card-body">
                    <h2 class="card-title">Word Cloud</h2>
                    <p>The world cloud gives you insights about your text visually.</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-block" @click="() => navigateTo('/wordcloud')">See World Cloud</button>
                    </div>
                </div>
            </div>
            <div class="card w-full sm:w-80 glass">
                <figure><img src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="car!"/></figure>
                <div class="card-body">
                    <h2 class="card-title">C.A.R.L</h2>
                    <p>An AI Research assistant, which can give you personal insights.</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-block" @click="() => navigateTo('/carl')">Let's go!</button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="flex flex-col items-center justify-center container mx-auto gap-3 p-4 mt-10 text-center">
            <h1 class="text-4xl font-bold">Themes</h1>
            <p class="text-lg">Choose your favorite theme</p>
            <select v-model="theme" class="select select-primary md:w-full md:max-w-xs">
                <option disabled selected>Select Theme</option>
                <option v-for="theme in themes" :value="theme" :key="theme">
                    <span class="uppercase">{{ theme }}</span>
                </option>
            </select>
        </div>
    </section>
</template>

<script setup>
const themeStore = useThemeStore()
const { theme, themes } = storeToRefs(themeStore)
</script>

<style scoped>
img {
    width: 100%
}
</style>