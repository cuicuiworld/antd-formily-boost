import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
import React from 'react';
import { Button } from 'antd';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
        Space,
        Button,
    },
});

let lastState = observable({
    data: [
        {
            familyName: 'fish',
            lastName: 'go',
            age: 123,
        },
        {
            familyName: 'cat',
            lastName: 'go2',
            age: 456,
        },
        {
            familyName: 'dog',
            lastName: 'go3',
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
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        bordered: true,
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            title="名字"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.Void
                                title="姓"
                                x-component="Table.Column"
                                x-component-props={{}}
                            >
                                <SchemaField.String
                                    name="familyName"
                                    required={true}
                                    x-component={'Input'}
                                    x-decorator="FormItem"
                                />
                            </SchemaField.Void>
                            <SchemaField.Void
                                title="名"
                                x-component="Table.Column"
                                x-component-props={{}}
                            >
                                <SchemaField.String
                                    name="lastName"
                                    required={true}
                                    x-component={'Input'}
                                    x-decorator="FormItem"
                                />
                            </SchemaField.Void>
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
                                    name="edit"
                                    title="编辑"
                                    x-component={'Button'}
                                    x-component-props={{
                                        type: 'link',
                                    }}
                                />
                                <SchemaField.Void
                                    name="delete"
                                    title="删除"
                                    x-component={'Button'}
                                    x-component-props={{
                                        type: 'link',
                                    }}
                                />
                            </SchemaField.Void>
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
