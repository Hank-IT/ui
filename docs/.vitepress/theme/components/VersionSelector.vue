<script setup lang="ts">
import { ref, onMounted } from 'vue'

const versions = ref<string[]>([])
const currentVersion = ref(getVersionFromPath() || 'latest')

function getVersionFromPath() {
  if (typeof window === 'undefined') return null
  return window.location.pathname.split('/')[2] || 'latest'
}

// Modified to load versions.json from the correct path
onMounted(async () => {
  try {
    // Use relative path to current location
    const res = await fetch('./versions.json', { cache: 'no-store' })

    if (!res.ok) {
      throw new Error(`Failed to fetch versions: ${res.status}`)
    }

    versions.value = await res.json()
  } catch (e) {
    console.error('Failed to load versions:', e)
    versions.value = ['latest']
  }
})

function onSelect(event: Event) {
  const selected = (event.target as HTMLSelectElement).value
  // Preserve the path after the version segment
  const pathParts = window.location.pathname.split('/')
  const rest = pathParts.slice(3).join('/') // after /ui/<version>/
  let newUrl = `/ui/${selected}/`
  if (rest) newUrl += rest
  newUrl += window.location.search + window.location.hash
  window.location.href = newUrl
}
</script>

<template>
  <div class="version-selector">
    <select :value="currentVersion" @change="onSelect" class="version-select">
      <option v-for="ver in versions" :key="ver" :value="ver">{{ ver }}</option>
    </select>
  </div>
</template>

<style scoped>
.version-selector {
  display: inline-flex;
  align-items: center;
  margin-right: 0.5em;
}

.version-select {
  padding: 0.25em 0.5em;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9em;
}
</style>