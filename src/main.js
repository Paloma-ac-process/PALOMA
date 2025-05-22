import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// Nucleo Icons
import '@/assets/css/nucleo-icons.css'
import '@/assets/css/nucleo-svg.css'
import '@/assets/scss/ac-kit.scss'

import 'aos/dist/aos.css'
import AOS from 'aos'
import materialKit from '@/material-kit'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(materialKit)

AOS.init()

app.mount('#app')
