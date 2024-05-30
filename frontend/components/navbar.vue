<template>
    <div>
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><nuxt-link to="/">Homepage</nuxt-link></li>
                        <li><a @click="logout">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost text-xl" @click="() => navigateTo('/')"><Icon name="mdi:academic-cap" class="h-8 w-8 text-base-500 mr-2" /> Sciencebook</a>
            </div>
            <div class="navbar-end">
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
const supabase = useSupabaseClient()
const router = useRouter()

const themeStore = useThemeStore()
const { theme, themes } = storeToRefs(themeStore)

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

const route = useRoute()

</script>