import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// import '@/assets/css/nucleo-icons.css'
// import '@/assets/css/nucleo-svg.css'
// import '@/assets/scss/ac-kit.scss'

import 'aos/dist/aos.css'
import AOS from 'aos'
import materialKit from '@/material-kit'

// Toast notifications
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(materialKit)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})

AOS.init()

app.mount('#app')
