import {
    createForm,
    onFieldInputValueChange,
    onFormMount,
} from '@formily/core';
import { createSchemaField, FormConsumer, observer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { PaginationType } from 'antd-formily-boost/Table';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import { useMemo } from 'react';
import { batch, observable } from '@formily/reactive';
import { useEffect } from 'react';
import React from 'react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
    },
});

type DataType = {
    name: string;
    age: number;
};
const sleep = (timeout: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout);
    });
};
let globalState: { data: DataType[]; paginaction: PaginationType } = observable(
    {
        data: [],
        paginaction: {
            current: 1,
            pageSize: 10,
        },
    },
);

export default () => {
    const fetch = async () => {
        const tableField = form.query('data').take();
        tableField.componentProps.loading = true;
        await sleep(300);
        tableField.componentProps.loading = false;
        const total = 1000;
        const begin =
            (globalState.paginaction.current - 1) *
            globalState.paginaction.pageSize;
        const end =
            begin + globalState.paginaction.pageSize < total
                ? begin + globalState.paginaction.pageSize
                : total;
        let result: any[] = [];
        for (var i = begin; i < end; i++) {
            result.push({
                name: 'fish_' + i,
                time: new Date().toLocaleString(),
            });
        }
        batch(() => {
            //后端分页的特点是多了一个total属性，必须要设置该属性
            //设置了paginaction的total值的都是后端分页模式
            globalState.paginaction.total = total;
            globalState.data = result;
        });
    };
    const form = useMemo(() => {
        return createForm({
            values: globalState,
            effects: () => {
                onFieldInputValueChange(
                    'paginaction.*(current,pageSize)',
                    () => {
                        fetch();
                    },
                );
            },
        });
    }, []);

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        paginaction: 'paginaction',
                        paginationProps: {
                            //默认的分页数量
                            defaultPageSize: 10,
                            //是否显示快速跳页
                            showQuickJumper: true,
                            //是否显示总数
                            showTotal: true,
                        },
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            title="名字"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="name"
                                x-component={'Input'}
                                x-component-props={{
                                    readOnly: true,
                                    bordered: false,
                                }}
                            />
                        </SchemaField.Void>

                        <SchemaField.Void
                            title="时间"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="time"
                                x-component={'Input'}
                                x-component-props={{
                                    readOnly: true,
                                    bordered: false,
                                }}
                            />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer>
        </Form>
    );
};
