<template>
  <div class="flex justify-center items-center h-screen flex-col text-center">
    <div class="w-full flex justify-center items-center text-center">
      <Icon name="mdi:academic-cap" class="h-14 w-14 text-base-content mr-2" />
      <h1 class="text-5xl font-bold text-base-content">Sciencebook</h1>
    </div>
    <div class="w-full py-5">
      <h2 class="text-3xl font-bold text-gray-300">
        Unleash Your Ideas, Organize Your Insights.
      </h2>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title my-2">Login</h2>
          <form @submit.prevent="handleLogin">
            <label class="input input-bordered flex items-center gap-2">
              <Icon name="mdi:user" class="w-4 h-4 opacity-70" />
              <input
                type="email"
                class="grow bg-transparent"
                placeholder="E-Mail"
                v-model="email"
              />
            </label>
            <label class="input input-bordered flex items-center gap-2 my-3">
              <Icon name="mdi:key" class="w-4 h-4 opacity-70" />
              <input
                type="password"
                class="grow bg-transparent"
                placeholder="Password"
                v-model="password"
              />
            </label>
            <div v-if="errorMessage" role="alert" class="alert alert-error my-3">
              <Icon name="mdi:alert" class="w-4 h-4 opacity-70" />
              <span>{{ errorMessage }}</span>
            </div>
            <button class="btn bg-base-content text-base-content" type="submit">
              <span
                v-if="loading"
                class="loading loading-ring loading-xl"
              ></span>
              <span class="text-base-300" v-else>Login</span>
            </button>
          </form>
        </div>
      </div>
      <div class="py-4 flex items-center gap-4">
        Theme
        <select v-model="theme" class="select select-primary md:w-full md:max-w-xs">
            <option disabled selected>Select Theme</option>
            <option v-for="theme in themes" :value="theme" :key="theme">
                <span class="uppercase">{{ theme }}</span>
            </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();
const themeStore = useThemeStore();
const { theme, themes } = storeToRefs(themeStore);

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw error;
    }
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>
