import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Form, FormItem, Input, Select } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
import { PaginationType } from 'antd-formily-boost/Table';
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
                        paginaction: 'paginaction',
                        paginationProps: {
                            defaultPageSize: 10,
                            showQuickJumper: true,
                            showTotal: true,
                        },
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            x-component="Table.CheckboxColumn"
                            x-component-props={{
                                selectedIndex: '_checked',
                                selectRowByClick: true,
                            }}
                        />
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
        </Form>
    );
};
