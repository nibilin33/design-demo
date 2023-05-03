import { BASE_CLASS_PREFIX } from '../base/constants';
import { TabsProps } from './interface';

const cssClasses = {
    TABS: `${BASE_CLASS_PREFIX}-tabs`
};

const numbers = {
    DEFAULT_ACTIVE_KEY: 1,
};

const strings = {
    TYPE_MAP: ['line', 'card', 'button'],
    SIZE: ['small', 'medium', 'large'],
    POSITION_MAP: ['top', 'left']
};
const defaultProps: TabsProps = {
    onChange: () => undefined,
    onTabClick: () => undefined,
    size: 'large',
    tabPosition: 'top',
    type: 'line',
    tabList: []
};
export { cssClasses, numbers, strings, defaultProps };
