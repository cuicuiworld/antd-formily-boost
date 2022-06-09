import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from 'antd-formily-boost';
import { Form, FormItem, Input, Select } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
import { Field } from '@formily/core';
import React from 'react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
    },
});

let lastState = observable({
    data: [
        {
            salesOrderId: 10001,
            name: 'fish',
            address: 'fish_address',
            productors: [
                {
                    productorName: 'company_1',
                    items: [
                        {
                            productId: 20001,
                            productName: 'product_1',
                            count: 10,
                        },
                        {
                            productId: 20002,
                            productName: 'product_2',
                            count: 20,
                        },
                    ],
                },
                {
                    productorName: 'company_2',
                    items: [
                        {
                            productId: 20001,
                            productName: 'product_3',
                            count: 30,
                        },
                        {
                            productId: 20002,
                            productName: 'product_4',
                            count: 40,
                        },
                    ],
                },
            ],
        },
        {
            salesOrderId: 10002,
            name: 'cat',
            address: 'cat_address',
            productors: [
                {
                    productorName: 'company_3',
                    items: [
                        {
                            productId: 20001,
                            productName: 'product_5',
                            count: 50,
                        },
                        {
                            productId: 20002,
                            productName: 'product_6',
                            count: 60,
                        },
                    ],
                },
                {
                    productorName: 'company_4',
                    items: [
                        {
                            productId: 20001,
                            productName: 'product_7',
                            count: 70,
                        },
                        {
                            productId: 20002,
                            productName: 'product_8',
                            count: 80,
                        },
                    ],
                },
            ],
        },
    ],
});

const itemsChildrenRow = (
    <SchemaField.Void
        x-component="Table.ChildrenRow"
        x-component-props={{
            //递归的字段名
            childrenIndex: 'items',
        }}
    >
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向name列
                refColumnName: 'name',
                labelIndex: 'productName',
            }}
        />
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向name列
                refColumnName: 'address',
            }}
        >
            <SchemaField.String
                name="count"
                required={true}
                x-component="Input"
                x-decorator={'FormItem'}
            />
        </SchemaField.Void>
    </SchemaField.Void>
);

const productorsChildrenRow = (
    <SchemaField.Void
        x-component="Table.ChildrenRow"
        x-component-props={{
            //递归的字段名
            childrenIndex: 'productors',
            //点击行的时候展开
            expandRowByClick: true,
            defaultExpand: true,
        }}
    >
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向name列
                refColumnName: 'name',
                labelIndex: 'productorName',
            }}
        />
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向address列
                refColumnName: 'address',
            }}
        >
            <SchemaField.String
                //这个列不能用labelIndex，因为有effects
                name="count"
                x-component="Input"
                x-component-props={{
                    readOnly: true,
                    bordered: false,
                }}
            />
        </SchemaField.Void>
        {itemsChildrenRow}
    </SchemaField.Void>
);
export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {
                onFieldReact('data.*.productors.*.count', (field) => {
                    const fieldNormal = field as Field;
                    let items = field.query('.items').value();
                    let result = 0;
                    if (items) {
                        for (let i = 0; i != items.length; i++) {
                            result += parseInt(items[i].count);
                        }
                    }
                    fieldNormal.value = result;
                });
            },
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array name="data" x-component="Table">
                    <SchemaField.Void>
                        <SchemaField.Void
                            x-component="Table.CheckboxColumn"
                            x-component-props={{
                                selectedIndex: '_checkbox',
                            }}
                        />
                        <SchemaField.Void
                            name="salesOrderId"
                            title="销售ID"
                            x-component="Table.Column"
                            x-component-props={{
                                labelIndex: 'salesOrderId',
                            }}
                        />

                        <SchemaField.Void
                            name="name"
                            title="客户"
                            x-component="Table.Column"
                            x-component-props={{
                                labelIndex: 'name',
                            }}
                        />
                        <SchemaField.Void
                            name="address"
                            title="地址"
                            x-component="Table.Column"
                            x-component-props={{
                                labelIndex: 'address',
                            }}
                        />
                        {productorsChildrenRow}
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer>
        </Form>
    );
};
