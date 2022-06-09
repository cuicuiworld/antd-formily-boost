import { useArray, useArrayIndex, useArrayRecursive } from './Context';
import React, { MouseEvent } from 'react';
import { getDataInIndex } from '../util';

export type MySubtreeAdditionProps = {
    onClick?: (data: any) => {};
    title?: string;
    icon?: React.ReactNode;
    defaultValue?: any;
};
const MySubtreeAddition: React.FC<MySubtreeAdditionProps> = (props) => {
    const array = useArray();
    const index = useArrayIndex();
    const recurIndex = useArrayRecursive();

    const onClick = (e: MouseEvent<any>) => {
        e.preventDefault();
        if (!recurIndex) {
            return;
        }
        const data = getDataInIndex(array.value, index);
        if (!data) {
            return;
        }
        if (!data.hasOwnProperty(recurIndex)) {
            data[recurIndex] = [];
        }
        if (props.onClick) {
            //传递onClick的数据
            props.onClick(data[recurIndex]);
        } else {
            const defaultVal =
                props.defaultValue !== undefined && props.defaultValue !== null
                    ? props.defaultValue
                    : {};
            data[recurIndex].push(defaultVal);
        }
    };
    let icon = props.icon ? props.icon : <span />;
    let title = props.title;
    return (
        <a onClick={onClick}>
            {icon} {title}
        </a>
    );
};

export default MySubtreeAddition;
