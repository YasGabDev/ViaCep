import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//..importing the router
import router from '@/router/router.js'

//..use router before mounts the application
createApp(App).use(router).mount('#app')
