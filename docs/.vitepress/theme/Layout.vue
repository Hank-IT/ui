<script setup>
import DefaultTheme from 'vitepress/theme'
import VersionSelector from './components/VersionSelector.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <VersionSelector />
    </template>
  </Layout>
</template>