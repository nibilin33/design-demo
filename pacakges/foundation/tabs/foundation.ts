import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { noop } from 'lodash';

export interface TabsAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    collectPane: () => void;
    collectActiveKey: () => void;
    notifyTabClick: (activeKey: string, event?: any) => void;
    notifyChange: (activeKey: string) => void;
    setNewActiveKey: (activeKey: string) => void;
    getDefaultActiveKeyFromChildren: () => string;
}

class TabsFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<TabsAdapter<P, S>, P, S> {
    constructor(adapter: TabsAdapter<P, S>) {
        super({ ...adapter }, 'tabs');
    }

    init(): void {
        // this._adapter.collectPane();
        console.log(this);
    }

    destroy = noop;

    _notifyChange(activeKey: string): void {
        const { activeKey: stateActiveKey } = this.getDatas();
        if (stateActiveKey !== activeKey) {
            this._adapter.notifyChange(activeKey);
        }
    }

    handleTabClick = (activeKey: string, event: any) =>  {
        this._notifyChange(activeKey);
        this.handleNewActiveKey(activeKey);
        this._adapter.notifyTabClick(activeKey, event);
    }

    handleNewActiveKey = (activeKey: string) => {
        const { activeKey: stateActiveKey } = this.getDatas();
        console.log(stateActiveKey,activeKey,this.getDatas());
        if (stateActiveKey !== activeKey) {
            this._adapter.setNewActiveKey(activeKey);
        }
    }

    getDefaultActiveKey = () => {
        let activeKey;
        const props = this.getProps();
        if ('activeKey' in props) {
            activeKey = props.activeKey;
        } else if ('defaultActiveKey' in props) {
            activeKey = props.defaultActiveKey;
        } else {
            activeKey = this._adapter.getDefaultActiveKeyFromChildren();
        }
        return activeKey;
    }

    handleTabListChange = () =>  {
        this._adapter.collectPane();
    }

    handleTabPanesChange = () => {
        this._adapter.collectPane();
        this._adapter.collectActiveKey();
    }

    handlePrevent = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    }
}

export default TabsFoundation;
