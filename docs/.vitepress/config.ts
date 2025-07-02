import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@hank-it/ui',
  description: 'Documentation for the @hank-it/ui library',
  themeConfig: {

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/' },
        ]
      },
      {
        text: 'Services',
        collapsed: false,
        items: [
          {
            text: 'Requests',
            items: [
              { text: 'Basic Usage', link: '/services/requests/basic-usage' },
              { text: 'Exceptions', link: '/services/requests/exceptions' },
              { text: 'Bulk Requests', link: '/services/requests/bulk' }
            ]
          },
          {
            text: 'Laravel Integration',
            collapsed: true,
            items: [
              { text: 'Laravel Requests', link: '/services/laravel/requests' },
              { text: 'Laravel Pagination', link: '/services/laravel/pagination' }
            ]
          },
          { text: 'Pagination', link: '/services/pagination' },
          { text: 'Support', link: '/services/support' },
          { text: 'Persistence Drivers', link: '/services/persistence-drivers' }
        ]
      },
      {
        text: 'Vue',
        collapsed: false,
        items: [
          { text: 'State', link: '/vue/state/' },
          {
            text: 'Forms',
            link: '/vue/forms',
          },
          {
            text: 'Requests',
            link: '/vue/requests/',
            items: [
              { text: 'Usage with Composition API', link: '/vue/requests/composition' },
              { text: 'Loading States', link: '/vue/requests/loading' },
              { text: 'Error Handling', link: '/vue/requests/errors' }
            ]
          }
        ]
      },
      {
        text: 'Helpers',
        items: [
          { text: 'Utility Functions', link: '/helpers/' }
        ]
      }
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Services', link: '/services/requests/' },
      { text: 'Vue', link: '/vue/state/' },
      { text: 'GitHub', link: 'https://github.com/yourusername/hank-it-ui' }
    ]
  },
})