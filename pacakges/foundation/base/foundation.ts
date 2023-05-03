import Logger from '../utils/logger'
import { noop } from 'lodash'

export type noopFunction = (...args: any) => any
// eslint-disable-next-line
export interface DefaultAdapter<P = Record<string, any>, S = Record<string, any>> {
  getProp(key: string): any
  getProps(): P
  getData(key: string): any
  getDatas(): S
  setData<K extends keyof S>(s: Pick<S, K>, callback?: any): void
  getCache(c: string): any
  getCaches(): any
  setCache(key: any, value: any): void
  emit(key: string, value: any): void
  on(key: string, callback?: any): void
}

class BaseFoundation<
  T extends Partial<DefaultAdapter<P, S>>,
  P = Record<string, any>,
  S = Record<string, any>
> {
  /** @return enum{css className} */
  /* istanbul ignore next */
  static get cssClasses() {
    // e.g. {ACTIVE: 'component--active'}
    return {}
  }

  /** @return enum{strings} */
  /* istanbul ignore next */
  static get strings() {
    //  e.g. {ARIA_ROLE: 'tablist'}
    return {}
  }
  /* istanbul ignore next */
  static get numbers() {
    //  e.g. {ANIMATION_DELAY_MS: 350}
    return {}
  }

  static get defaultAdapter() {
    return {
      getProp: noop,
      getProps: noop,
      getState: noop,
      getStates: noop,
      setState: noop,
      getCache: noop,
      setCache: noop,
      getCaches: noop,
      emit: noop,
      on: noop,
    }
  }

  _adapter!: T
  componentName: string
  _log!: Logger
  constructor(adapter: T, componentName?:string) {
    this._adapter = { ...BaseFoundation.defaultAdapter, ...adapter }
    this.componentName = componentName;
    this._log = new Logger(this.componentName)
  }

  getProp(key: string) {
    return this._adapter.getProp(key)
  }

  getProps(): any {
    return this._adapter.getProps() as any
  }

  getData(key: string) {
    return this._adapter.getData(key)
  }

  getDatas(): any {
    return this._adapter.getDatas()
  }

  setData<K extends keyof S>(states: Pick<S, K>, cb?: (...args: any) => void) {
    return this._adapter.setData({ ...states }, cb)
  }

  /* istanbul ignore next */
  getCaches() {
    return this._adapter.getCaches()
  }

  getCache(key: string) {
    return this._adapter.getCache(key)
  }

  setCache(key: string, value: any) {
    return key && this._adapter.setCache(key, value)
  }
  _isInProps(key: string) {
    // eslint-disable-line
    const props = this.getProps()
    return key in (props as any)
  }
  init(lifecycle?: any) {
    // 初始化的一些工作，比如注册事件
  }

  destroy() {
     // 注销的一些工作，比如事件
  }
  /* istanbul ignore next */
  log(text: string, ...rest: any) {
    this._log.log(text, ...rest)
  }
  /* istanbul ignore next */
  emit(key: string, value: any) {
    this._adapter.emit(key, value)
  }
  /* istanbul ignore next */
  on(key: string, cb?: (...args: any) => void) {
    this._adapter.on(key, cb)
  }
}
export default BaseFoundation
