// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import VersionSelector from './components/VersionSelector.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register global components
    app.component('VersionSelector', VersionSelector)
  }
}
