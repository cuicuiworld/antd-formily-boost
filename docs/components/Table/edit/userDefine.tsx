import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer, Schema } from '@formily/react';
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
            name: 'fish',
            age: 123,
        },
        {
            name: 'edit_false',
            age: 456,
        },
        {
            name: 'dog',
            age: 789,
        },
    ],
});

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {},
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array name="data" x-component="Table">
                    <SchemaField.Void>
                        <SchemaField.Void
                            title="序号"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.Void x-component="Table.Index" />
                        </SchemaField.Void>
                        <SchemaField.Void
                            title="名字"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="name"
                                required={true}
                                x-component={'Input'}
                                x-decorator="FormItem"
                            />
                        </SchemaField.Void>

                        <SchemaField.Void
                            title="年龄"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="age"
                                required={true}
                                format={'number'}
                                x-component={'Input'}
                                x-decorator="FormItem"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            title="操作"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.Void
                                name="operation"
                                x-component={'Space'}
                            >
                                <SchemaField.Void
                                    x-component={'Table.MoveUp'}
                                    x-component-props={{
                                        title: '上移',
                                        icon: <span />,
                                    }}
                                />
                                <SchemaField.Void
                                    x-component={'Table.MoveDown'}
                                    x-component-props={{
                                        title: '下移',
                                    }}
                                />
                                <SchemaField.Void
                                    x-component={'Table.Remove'}
                                    x-component-props={{
                                        title: '删除',
                                        icon: <span />,
                                    }}
                                />
                            </SchemaField.Void>
                        </SchemaField.Void>
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component={'Table.Addition'}
                        x-component-props={{
                            title: '我要添加',
                            icon: <span />,
                            onClick: () => {
                                alert('onClick!');
                                lastState.data.push({
                                    name: 'who',
                                    age: 1000,
                                });
                            },
                        }}
                    ></SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>

            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer>
        </Form>
    );
};
