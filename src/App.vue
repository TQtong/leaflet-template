<script setup lang="ts">
import { onMounted } from 'vue'

import { init } from './index'

onMounted(() => {
  init('map')
})

</script>

<template>
  <div id="leaflet-container">
    <div id="map"></div>
  </div>
</template>

<style scoped lang="scss">
#leaflet-container {
  position: relative;
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
