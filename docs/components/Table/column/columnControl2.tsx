import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Button } from 'antd';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import React from 'react';

const form = createForm({
    initialValues: {
        data: [
            {
                name: 'fish',
                age: 123,
            },
            {
                name: 'cat',
                age: 456,
            },
            {
                name: 'dog',
                age: 789,
            },
        ],
        column_config: {} as any,
    },
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
    },
});

export default () => {
    const onClick = () => {
        const columnConfig = form.values.column_config;
        if (!columnConfig.firstColumn) {
            columnConfig.firstColumn = {
                'x-visible': true,
            };
        }
        columnConfig.firstColumn['x-visible'] =
            !columnConfig.firstColumn['x-visible'];
    };
    return (
        <Space direction="vertical" size={10} style={{ display: 'flex' }}>
            <div>
                <Form form={form} feedbackLayout="terse">
                    <SchemaField>
                        <SchemaField.Array
                            name="data"
                            x-component="Table"
                            x-component-props={{
                                columnConfig: 'column_config',
                            }}
                        >
                            <SchemaField.Void>
                                <SchemaField.Void
                                    name="firstColumn"
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
            </div>
            <Space direction={'horizontal'}>
                <Button onClick={onClick} type="primary">
                    Toggle第一列
                </Button>
            </Space>
        </Space>
    );
};
