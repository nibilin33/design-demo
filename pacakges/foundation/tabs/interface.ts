export type TabType = 'line' | 'card' | 'button';
export type TabSize = 'small' | 'medium' | 'large';
export type TabPosition = 'top' | 'left';

export interface PlainTab {
    disabled?: boolean;
    icon?: any;
    itemKey: string;
    tab?: any;
    closable?: boolean
}
export interface TabsProps {
    activeKey?: string;
    className?: string;
    collapsible?: boolean;
    contentStyle?: string;
    defaultActiveKey?: string;
    keepDOM?: boolean;
    lazyRender?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: (activeKey: string, e: Event) => void;
    size?: TabSize;
    style?: string;
    tabBarClassName?: string;
    tabBarStyle?: string;
    tabList?: PlainTab[];
    tabPosition?: TabPosition;
    type?: TabType;
    preventScroll?: boolean
}

export interface TabsState {
    activeKey: string;
    panes: Array<PlainTab>;
    prevActiveKey: string | null;
}