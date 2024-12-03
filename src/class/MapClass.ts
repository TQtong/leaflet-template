import L from 'leaflet'
import _ from 'lodash'
import BaseLayerClass from './BaseLayerClass'
import { BaseLayerEnum } from '../enums/MapConfigEnum'

import { MiniMap } from '../plugins/leaflet-minimap/Control.MiniMap'
import '../plugins/leaflet-minimap/Control.MiniMap.css'

let latitude = 0 // 纬度
let longitude = 0 // 经度

export default class MapClass {
  container: string // 地图容器
  map!:L.Map // 地图
  baseLayerClass:BaseLayerClass // 底图
  miniMap!:any // 鹰眼
  controlConfig // control 配置
  layers!:L.Control.Layers // overlays

  crs:L.CRS

  /**
   * @description: 初始化地图
   * @param {*} container 地图容器名称
   * @param {*} controlConfig 控制器配置
   */
  constructor(container: string, crs:L.CRS, controlConfig = null) {
    this.baseLayerClass = new BaseLayerClass()

    this.controlConfig = _.merge(
      {
        attribution: {
          position: 'bottomright',
          prefix: '经度: ' + longitude + '  纬度: ' + latitude,
        },
        scale: {
          position: 'bottomright',
          maxWidth: '100',
          imperial: false,
        },
        layers: {
          baseLayers: this.baseLayerClass.baseObj,
          overlays: null,
          options: {
            position: 'topleft',
          },
        },
      },
      controlConfig,
    )

    this.container = container
    this.crs = crs

    this.initMap()
  }

  /**
   * @description: 初始化地图
   * @return {*}
   */
  initMap() {
    const corner1 = L.latLng(-90, -180)
    const corner2 = L.latLng(90, 180)
    const bounds = L.latLngBounds(corner1, corner2)
    console.log(bounds)
    const map = L.map(this.container, {
      crs: this.crs,
      layers: [this.baseLayerClass.baseObj[BaseLayerEnum.GaoDeNormal]],
      center: { lng: 110.9, lat: 33.6586 },
      zoom: 8,
      // zoomDelta: 0.25, // 缩放按钮、键盘中的+/-键时图像的缩放级别
      // zoomSnap: 0.01, // 分数缩放
      // maxBounds: bounds,
      zoomControl: false,
      attributionControl: false,
      // wheelPxPerZoomLevel: 720, // 鼠标滚轮的缩放速度
      worldCopyJump: true, // 地图缩到最小后添加的元素能正常显示(无缝显示)
    })

    this.map = map

    this.setControl(this.controlConfig)

    this.setMiniMap()

    this.setEvents()
  }

  /**
   * @description: add map control
   * @param {*} options
   * @return {*}
   */
  private setControl(params:any) {
    const { baseLayers, overlays, options } = params.layers
    if (params.attribution) {
      L.control.attribution({ ...params.attribution }).addTo(this.map)
    }
    if (params.scale) {
      L.control.scale({ ...params.scale }).addTo(this.map)
    }

    if (params.layers) {
      this.layers = L.control.layers(baseLayers, overlays, options).addTo(this.map)
    }
  }

  /**
   * @description: 鹰眼视图
   * @return {*}
   */
  private setMiniMap() {
    const baselayer = new BaseLayerClass()
    this.miniMap = new MiniMap(baselayer.baseObj[BaseLayerEnum.GaoDeNormal], {
      toggleDisplay: true, // 是否显示最小化按钮
      position: 'bottomleft', // 位置
    }).addTo(this.map)

    this.baselayerchange((e) => {
      if (baselayer.baseObj[e.name]) {
        this.miniMap.changeLayer(baselayer.baseObj[e.name])
      }
    })
  }

  /**
   * @description: 设置默认监听事件
   * @return {*}
   */
  private setEvents() {
    // 监听地图上的鼠标移动事件
    this.mousemove((e:any) => {
      // 更新经纬度文本框的内容
      latitude = e.latlng.lat.toFixed(6)
      longitude = e.latlng.lng.toFixed(6)
      this.map.attributionControl.setPrefix(`经度: ${longitude}  纬度: ${latitude}`) // 更新 attribution
    })

    // this.click((e) => {
    //   // 更新经纬度文本框的内容
    //   latitude = e.latlng.lat.toFixed(6)
    //   longitude = e.latlng.lng.toFixed(6)
    //   this.map.attributionControl.setPrefix(
    //     `经度: ${longitude}  纬度: ${latitude}`
    //   ) // 更新 attribution
    //   L.popup([latitude, longitude], {
    //     content: `<p>经度: ${longitude} <br/>  纬度: ${latitude}</p>`
    //   }).openOn(this.map)
    // })
  }

  /**
   * @description: 监听底图切换
   * @param {*} callback
   * @return {*}
   */
  baselayerchange(callback:Function) {
    this.map.on('baselayerchange', (e) => {
      callback(e)
    })
  }

  /**
   * @description: mouse down
   * @param {*} callback
   * @return {*}
   */
  mousedown(callback:Function) {
    this.map.on('mousedown', (e) => {
      callback(e)
    })
  }

  /**
   * @description: mouse move
   * @param {*} callback
   * @return {*}
   */
  mousemove(callback:Function) {
    this.map.on('mousemove', (e) => {
      callback(e)
    })
  }

  /**
   * @description: mouse up
   * @param {*} callback
   * @return {*}
   */
  mouseup(callback:Function) {
    this.map.on('mouseup', (e) => {
      callback(e)
    })
  }

  /**
   * @description: mouse click
   * @param {*} callback
   * @return {*}
   */
  click(callback:Function) {
    this.map.on('click', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map move start
   * @param {*} callback
   * @return {*}
   */
  movestart(callback:Function) {
    this.map.on('movestart', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map moveing
   * @param {*} callback
   * @return {*}
   */
  move(callback:Function) {
    this.map.on('move', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map move end
   * @param {*} callback
   * @return {*}
   */
  moveend(callback:Function) {
    this.map.on('moveend', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map zoom start
   * @param {*} callback
   * @return {*}
   */
  zoomstart(callback:Function) {
    this.map.on('zoomstart', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map zooming
   * @param {*} callback
   * @return {*}
   */
  zoom(callback:Function) {
    this.map.on('zoom', (e) => {
      callback(e)
    })
  }

  /**
   * @description: map zoom end
   * @param {*} callback
   * @return {*}
   */
  zoomend(callback:Function) {
    this.map.on('zoomend', (e) => {
      callback(e)
    })
  }
}
