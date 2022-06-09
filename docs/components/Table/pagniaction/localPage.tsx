import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer, Schema } from '@formily/react';
import { Table } from 'antd-formily-boost';
import { PaginationType } from 'antd-formily-boost/Table';
import { Form, FormItem, Input, Select } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
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
let lastState: { data: DataType[]; paginaction: PaginationType } = observable({
    data: [],
    paginaction: {
        //包括当前在哪一页，以及每页的大小是多少，序号从1开始
        current: 1,
        pageSize: 10,
    },
});

for (var i = 0; i != 100; i++) {
    lastState.data.push({
        name: 'fish_' + i,
        age: i,
    });
}

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        //传递paginaction进去，注意，该数据要用observable包装的
                        paginaction: 'paginaction',
                        paginationProps: {},
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
                            title="年龄"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="age"
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
                {() => <div>{JSON.stringify(form.values.paginaction)}</div>}
            </FormConsumer>
        </Form>
    );
};
