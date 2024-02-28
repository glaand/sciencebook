<template>
  <div class="flex justify-center items-center h-screen flex-col text-center">
    <div class="w-full flex justify-center items-center text-center">
        <AcademicCapIcon class="h-14 w-14 text-blue-500 mr-2" /><h1 class="text-5xl font-bold text-blue-500">Sciencebook</h1>
    </div>
    <div class="w-full py-5">
        <h2 class="text-3xl font-bold text-gray-300">Unleash Your Ideas, Organize Your Insights.</h2>
    </div>
    <div class="w-full flex justify-center">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title my-2">Login</h2>
                <form @submit.prevent="handleLogin">
                  <label class="input input-bordered flex items-center gap-2">
                    <UserIcon class="w-4 h-4 opacity-70" />
                    <input type="email" class="grow" placeholder="E-Mail" v-model="email" />
                  </label>
                  <label class="input input-bordered flex items-center gap-2 my-3">
                      <KeyIcon class="w-4 h-4 opacity-70" />
                      <input type="password" class="grow" placeholder="Password" v-model="password" />
                  </label>
                  <button class="btn btn-primary" type="submit">
                      <span v-if="loading" class="loading loading-ring loading-xl"></span>
                      <span v-else>Login</span>
                  </button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { 
    AcademicCapIcon,
    UserIcon,
    KeyIcon
} from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    router.push('/')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

</script>
