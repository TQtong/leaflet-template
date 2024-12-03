import L from 'leaflet'
import { BaseLayerEnum } from '../enums/MapConfigEnum'

export default class BaseLayerClass {
  baseObj: any // 底图对象
  matrixIds: any // 底图矩阵ID
  token!: string // 底图token

  constructor() {
    this.baseObj = {}

    this.addGaoDeNormal(BaseLayerEnum.GaoDeNormal)
    this.addGaoDeSatellite(BaseLayerEnum.GaoDeSatellite)
    this.addTianDiTuNormal(BaseLayerEnum.TianDiTuNormal)
    this.addTianDiTuSatellite(BaseLayerEnum.TianDiTuSatellite)
    this.addTianDiTuTerrain(BaseLayerEnum.TianDiTuTerrain)
    this.addTencentNormal(BaseLayerEnum.TencentNormal)
    this.addOSMNormal(BaseLayerEnum.OSMNormal)
    this.addGoogleNormal(BaseLayerEnum.GoogleNormal)
    this.addGoogleSatellite(BaseLayerEnum.GoogleSatellite)
    this.addBaiduNormal(BaseLayerEnum.BaiduNormal)
    this.addBaiduSatellite(BaseLayerEnum.BaiduSatellite)
    this.addArcGISNormal(BaseLayerEnum.ArcGISNormal)
    this.addArcGISPurplishBlue(BaseLayerEnum.ArcGISPurplishBlue)
    this.addArcGISGray(BaseLayerEnum.ArcGISGray)
    this.addArcGISWarm(BaseLayerEnum.ArcGISWarm)
    this.addArcGISHydro(BaseLayerEnum.ArcGISHydro)
  }

  /**
   * @description: 移除指定的底图
   * @param {*} type
   * @return {*}
   */
  removeLayer(type: string) {
    const layer = this.baseObj[type]
    layer.clearLayers()
    this.baseObj[type] = null
    delete this.baseObj[type]
  }

  /**
   * @description: 设置地图转换类型
   * @param {*} crs 底图类型
   * @return {*}
   */
  private setCorrdType(crs = 'wgs84') {
    switch (crs) {
      case BaseLayerEnum.GaoDeNormal:
      case BaseLayerEnum.GaoDeSatellite:
      case BaseLayerEnum.TencentNormal:
      case BaseLayerEnum.TencentSatellite:
      case BaseLayerEnum.GoogleNormal:
      case BaseLayerEnum.GoogleSatellite:
      case BaseLayerEnum.ArcGISNormal:
      case BaseLayerEnum.ArcGISPurplishBlue:
      case BaseLayerEnum.ArcGISGray:
      case BaseLayerEnum.ArcGISWarm:
      case BaseLayerEnum.ArcGISHydro:
        crs = 'gcj02'
        break
      case BaseLayerEnum.BaiduNormal:
      case BaseLayerEnum.BaiduSatellite:
        crs = 'bd09'
        break
      default:
        break
    }
    return crs
  }

  /**
   * @description: 添加高德矢量地图
   * @param {*} options
   * @return {*}
   */
  private addGaoDeNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4'],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加高德影像地图
   * @param {*} options
   * @return {*}
   */
  private addGaoDeSatellite(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    // 影像
    const layer = L.tileLayer(
      'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4'],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    // 注记
    const annotion = L.tileLayer(
      'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4'],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加天地图矢量地图
   * @param {*} options
   * @return {*}
   */
  private addTianDiTuNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const key = options.key || 'f79de843f3fb70f2ed5425f7f1b73536'
    // 矢量
    const layer = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )
    // 注记
    const annotion = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加天地图影像地图
   * @param {*} options
   * @return {*}
   */
  private addTianDiTuSatellite(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const key = options.key || '174705aebfe31b79b3587279e211cb9a'
    // 影像
    const layer = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )
    // 注记
    const annotion = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加天地图地形地图
   * @param {*} options
   * @return {*}
   */
  private addTianDiTuTerrain(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const key = options.key || '174705aebfe31b79b3587279e211cb9a'
    // 地形
    const layer = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )
    // 注记
    const annotion = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maxZoom: 18,
          minZoom: 5,
          key: key,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加腾讯矢量地图
   * @param {*} options
   * @return {*}
   */
  private addTencentNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={-y}&type=vector&styleid=3',
      Object.assign(
        {
          subdomains: ['0', '1', '2', '3'],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加OSM地图
   * @param {*} options
   * @return {*}
   */
  private addOSMNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      Object.assign(
        {
          Subdomains: ['a', 'b', 'c'],
          maxZoom: 18,
          minZoom: 0,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加Google矢量地图
   * @param {*} options
   * @return {*}
   */
  private addGoogleNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加Google影像地图
   * @param {*} options
   * @return {*}
   */
  private addGoogleSatellite(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    // 影像
    const layer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )
    // 注记
    const annotion = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加百度矢量地图
   * @param {*} options
   * @return {*}
   */
  private addBaiduNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
          maxZoom: 18,
          minZoom: 5,
          tms: true, // 如果为true，则反转瓦片的Y轴编号(为TMS服务打开此选项)。
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加百度影像地图(注记显示有问题)
   * @param {*} options
   * @return {*}
   */
  private addBaiduSatellite(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    // 影像
    const layer = L.tileLayer(
      'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
          maxZoom: 18,
          minZoom: 5,
          tms: true,
        },
        options,
      ),
    )
    // 注记
    const annotion = L.tileLayer(
      'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020',
      Object.assign(
        {
          subdomains: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer, annotion])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加ArcGIS矢量地图
   * @param {*} options
   * @return {*}
   */
  private addArcGISNormal(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加ArcGIS蓝紫色地图
   * @param {*} options
   * @return {*}
   */
  private addArcGISPurplishBlue(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加ArcGIS灰色地图
   * @param {*} options
   * @return {*}
   */
  private addArcGISGray(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加ArcGIS暖色地图
   * @param {*} options
   * @return {*}
   */
  private addArcGISWarm(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 添加ArcGIS水系地图
   * @param {*} options
   * @return {*}
   */
  private addArcGISHydro(type: string, options = {} as any) {
    options.corrdType = this.setCorrdType(type)
    const layer = L.tileLayer(
      'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}',
      Object.assign(
        {
          subdomains: [],
          maxZoom: 18,
          minZoom: 5,
        },
        options,
      ),
    )

    const group = L.layerGroup([layer])
    this.baseObj[type] = group
  }

  /**
   * @description: 设置地图可以进行0-22的等级缩放
   * @return {*}
   */
  private setMatrixIds() {
    for (let i = 0; i < 22; ++i) {
      this.matrixIds[i] = {
        identifier: '' + i,
        topLeftCorner: new window.L.LatLng(90, -180),
      }
    }
  }

}
