import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';
import { cssClasses, defaultProps } from '@mainto/ui-foundation/tabs/constants.js';
import TabsFoundation, { TabsAdapter } from '@mainto/ui-foundation/tabs/foundation.js';
import cls from 'classname';

@Component({
  tag: 'himo-tabs',
  styleUrl: 'tabs.css',
  shadow: true,
})
export class Tabs {

  foundation: TabsFoundation<Record<string, any>, Record<string, any>>;
  @Event() tabClick: EventEmitter<any>;
  @Event() change: EventEmitter<any>;
  @Prop() type: string = defaultProps.type;
  @Prop() size: string = defaultProps.size;
  @Prop() className: string = defaultProps.className;
  @Prop() tabList: Array<any> = defaultProps.tabList;
  @State() activeKey: string = defaultProps.activeKey;
  componentWillLoad() {
    this.foundation  = new TabsFoundation({
      notifyTabClick: (activeKey, event) => {
        this.tabClick.emit({activeKey,event});
      },
      notifyChange: activeKey => {
        this.change.emit({activeKey});
      },
      getDatas: () : any => {
        return {
          'activeKey': this.activeKey
        };
      },
      getProps: () => {
        return {};
      },
      setNewActiveKey: activeKey => {
        this.activeKey = activeKey;
      },
    } as TabsAdapter);
  }
  componentDidLoad() {
    this.foundation._log.log(this.activeKey);
  }
  onClick = (event) => {
    const { dataset } = event.target;
    this.foundation.handleTabClick(dataset.itemkey, event);
  }
  render() {
    const tabList = this.tabList.map(item => {
      const activeCls = cls({
        'himo-tabs--active': this.activeKey === item.itemKey,
      });
      return (
        <div onClick={this.onClick} class={activeCls} data-itemkey={item.itemKey}>
          {item.tab}
        </div>
      );
    });
    const tabPanes = this.tabList.map(item => {
      const activeCls = cls({
        'himo-tabs-panel': true,
        'himo-tabs-panel--active': this.activeKey === item.itemKey,
      });
      return (
        <div class={activeCls}>
          <slot name={item.itemKey}></slot>
        </div>
      );
    });
    return (
      <div class={cssClasses.TABS}>
        {tabList}
        {tabPanes}
      </div>
    );
  }
}
