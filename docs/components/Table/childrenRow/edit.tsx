import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer, observer } from '@formily/react';
import { Table } from 'antd-formily-boost';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
import React from 'react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
        Space,
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
                    count: 0,
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
            }}
        >
            <SchemaField.String
                title={'商品名称'}
                name="productName"
                required={true}
                x-component="Input"
                x-decorator={'FormItem'}
            />
        </SchemaField.Void>
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向name列
                refColumnName: 'address',
            }}
        >
            <SchemaField.String
                title={'数量'}
                name="count"
                required={true}
                format={'number'}
                x-component="Input"
                x-decorator={'FormItem'}
            />
        </SchemaField.Void>
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向操作列
                refColumnName: 'operation',
            }}
        >
            <SchemaField.Void x-component="Space">
                <SchemaField.Void x-component={'Table.MoveUp'} />
                <SchemaField.Void x-component={'Table.MoveDown'} />
                <SchemaField.Void x-component={'Table.Remove'} />
            </SchemaField.Void>
        </SchemaField.Void>
    </SchemaField.Void>
);

const productsChildrenRow = (
    <SchemaField.Void
        x-component="Table.ChildrenRow"
        x-component-props={{
            //递归的字段名
            childrenIndex: 'productors',
            defaultExpand: true,
        }}
    >
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向name列
                refColumnName: 'name',
            }}
        >
            <SchemaField.String
                title={'生产商'}
                name="productorName"
                required={true}
                x-component="Input"
                x-decorator={'FormItem'}
            />
        </SchemaField.Void>
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向address列
                refColumnName: 'address',
            }}
        >
            <SchemaField.Number
                //这个列不能用labelIndex，因为有effects
                default={0}
                title={'总数'}
                required={true}
                name="count"
                x-component="Input"
                x-decorator="FormItem"
                x-component-props={{
                    readOnly: true,
                    bordered: false,
                }}
            />
        </SchemaField.Void>
        <SchemaField.Void
            x-component="Table.Column"
            x-component-props={{
                //指向operation列
                refColumnName: 'operation',
            }}
        >
            <SchemaField.Void title="操作" x-component="Space">
                <SchemaField.Void
                    x-component={'Table.SubtreeAddition'}
                    x-component-props={{
                        title: '添加商品',
                        icon: <span />,
                    }}
                />
                <SchemaField.Void x-component={'Table.MoveUp'} />
                <SchemaField.Void x-component={'Table.MoveDown'} />
                <SchemaField.Void x-component={'Table.Remove'} />
            </SchemaField.Void>
        </SchemaField.Void>
        {itemsChildrenRow}
    </SchemaField.Void>
);
export default observer(() => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {},
        });
    }, []);
    //因为effect失效了，所以，只能用这种方法来实现
    //FIXME 这样的性能会差一点，每次对count的修改，会造成整个Table重新render
    for (let i = 0; i != lastState.data.length; i++) {
        let singleOrder = lastState.data[i];
        if (!singleOrder.productors) {
            continue;
        }
        for (let j = 0; j != singleOrder.productors.length; j++) {
            let singleProductor = singleOrder.productors[j];
            let result = 0;
            if (!singleProductor.items) {
                singleProductor.count = 0;
                continue;
            }
            for (let k = 0; k != singleProductor.items.length; k++) {
                result += parseInt(singleProductor.items[k].count + '');
            }
            singleProductor.count = result;
        }
    }
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
                            name="id"
                            title="序号"
                            x-component="Table.Column"
                        >
                            <SchemaField.Void x-component={'Table.Index'} />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="salesOrderId"
                            title="销售ID"
                            x-component="Table.Column"
                        >
                            <SchemaField.Number
                                name="salesOrderId"
                                required={true}
                                x-component="Input"
                                x-decorator={'FormItem'}
                            />
                        </SchemaField.Void>

                        <SchemaField.Void
                            name="name"
                            title="客户"
                            x-component="Table.Column"
                        >
                            <SchemaField.String
                                name="name"
                                required={true}
                                x-component="Input"
                                x-decorator={'FormItem'}
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="address"
                            title="地址"
                            x-component="Table.Column"
                        >
                            <SchemaField.String
                                name="address"
                                required={true}
                                x-component="Input"
                                x-decorator={'FormItem'}
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="operation"
                            title="操作"
                            x-component="Table.Column"
                        >
                            <SchemaField.Void title="操作" x-component="Space">
                                <SchemaField.Void
                                    x-component={'Table.SubtreeAddition'}
                                    x-component-props={{
                                        title: '添加生产商',
                                        icon: <span />,
                                    }}
                                />
                                <SchemaField.Void
                                    x-component={'Table.MoveUp'}
                                />
                                <SchemaField.Void
                                    x-component={'Table.MoveDown'}
                                />
                                <SchemaField.Void
                                    x-component={'Table.Remove'}
                                />
                            </SchemaField.Void>
                        </SchemaField.Void>
                        {productsChildrenRow}
                    </SchemaField.Void>
                    <SchemaField.Void x-component={'Table.Addition'} />
                </SchemaField.Array>
            </SchemaField>

            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer>
        </Form>
    );
});
