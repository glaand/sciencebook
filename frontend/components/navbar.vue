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
                <button v-if="route.path !== '/'" class="btn btn-ghost hidden md:block" @click="() => navigateTo('/')">
                    <Icon name="solar:arrow-left-broken" class="h-8 w-8 text-base-500 mr-2" />
                    Go back to Home Screen
                </button>
                <button v-if="route.path !== '/'" class="btn btn-ghost md:hidden" @click="() => navigateTo('/')">
                    <Icon name="solar:arrow-left-broken" class="h-8 w-8 text-base-500 mr-1" />
                </button>
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost text-xl" @click="() => navigateTo('/')"><Icon name="mdi:academic-cap" class="h-8 w-8 text-base-500 mr-2" /> Sciencebook</a>
            </div>
            <div class="navbar-end">
               
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

const route = useRoute()

</script>