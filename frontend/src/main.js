import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/main.css'
// Pour les icônes Nucleo ou FontAwesome, ajoute le lien CDN dans public/index.html si besoin
// <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">

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
