import { createApp } from 'vue'
import './style.less'
import Application from './App.vue'
import router from './router'
// import wtf from 'wtf-ui'
import wtf from './packages'
import preview from './components/preview.vue'
import 'highlight.js/styles/vs.css'
import highlight from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import highlightPlugin from '@highlightjs/vue-plugin'

highlight.registerLanguage('xml', xml);

const app = createApp(Application)
app.use(router)
app.use(wtf)
app.use(highlightPlugin)
app.component('preview', preview)
app.mount('#app')
