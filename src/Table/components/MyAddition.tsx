import { useArray } from './Context';
import React from 'react';
import { Button } from 'antd';

export type MyAdditionProps = {
    onClick?: () => {};
    title?: string;
    icon?: React.ReactNode;
    defaultValue?: any;
    method?: 'push' | 'unshift';
};
const MyAddition: React.FC<MyAdditionProps> = ({
    onClick,
    icon,
    title,
    defaultValue,
    method = 'push',
    ...rest
}) => {
    const array = useArray();
    const _onClick = onClick
        ? onClick
        : () => {
              const defaultVal =
                  defaultValue !== undefined && defaultValue !== null
                      ? defaultValue
                      : {};
              if (method === 'push') {
                  array.push(defaultVal);
              } else {
                  array.unshift(defaultVal);
              }
          };
    let _icon = icon ? icon : <span />;
    let _title = title || '';
    return (
        <Button onClick={_onClick} icon={_icon} block type="dashed" {...rest}>
            {_title}
        </Button>
    );
};

export default MyAddition;
