import { createForm, onFieldInputValueChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
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
    },
    effects: () => {
        onFieldInputValueChange('data.*.name', (field) => {
            form.setFieldState('data.firstColumn', (state) => {
                if (field.value == 'disappear') {
                    state.visible = false;
                } else {
                    state.title = field.value;
                }
            });
        });
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
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array name="data" x-component="Table">
                    <SchemaField.Void>
                        <SchemaField.Void
                            name="firstColumn"
                            title="名字"
                            x-component="Table.Column"
                            x-component-props={{
                                width: '50%',
                            }}
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
                            x-component-props={{
                                width: '50%',
                            }}
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
    );
};
