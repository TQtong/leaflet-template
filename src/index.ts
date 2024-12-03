import L from 'leaflet'

import MapClass from "./class/MapClass";

export const init = (container: string) => {
  const leafletClass = new MapClass(container, L.CRS.EPSG3857)

  let oldPos, isDown = false

  leafletClass.mousedown((e) => {
    if (!leafletClass.map.scrollWheelZoom.enabled()) {
      isDown = true
      oldPos = e.latlng
    }
  })

  leafletClass.mousemove((e) => {
    if (isDown) {
      const lng = e.latlng.lng - oldPos.lng
      const center = leafletClass.map.getCenter()
      leafletClass.map.panTo([center.lat, center.lng - lng])
    }
  })

  leafletClass.mouseup((e) => {
    isDown = false
    oldPos = null
  })
}