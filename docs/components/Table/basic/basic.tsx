import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Form, FormItem, Input, Select } from '@formily/antd';
import React, { useEffect, useMemo } from 'react';
import { observable } from '@formily/reactive';
import 'antd/dist/antd.compact.css';

const SchemaField = createSchemaField({
    components: {
        RecursiveArrayTable: Table,
        FormItem,
        Input,
        Select,
        Table,
    },
});

let lastState = observable({
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
});

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
        });
    }, []);
    useEffect(() => {
        console.log('---form', form, form.getFormGraph());
    }, []);
    const schema_Form_fka464n0m1i = useMemo(() => {
        return {
            type: 'object',
            properties: {
                列表: {
                    'x-decorator': 'FormItem',
                    'x-component': 'RecursiveArrayTable',
                    'x-decorator-props': {
                        colon: true,
                        bordered: true,
                    },
                    'x-visible': true,
                    name: '列表',
                    'x-component-props': {
                        showHeader: true,
                        bordered: true,
                    },
                    type: 'array',
                    items: {
                        'x-visible': true,
                        type: 'object',
                        properties: {
                            Field_hqqp8tm8sow: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 180,
                                    title: '序号',
                                },
                                type: 'void',
                                properties: {
                                    序号: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '序号',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 0,
                            },
                            Field_6l4443a4ktv: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 300,
                                    title: '评价项目',
                                },
                                type: 'void',
                                properties: {
                                    评价项目: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '评价项目',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 1,
                            },
                            Field_7qgydiyduru: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 150,
                                    title: '查证方法',
                                },
                                type: 'void',
                                properties: {
                                    查证方法: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '查证方法',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 2,
                            },
                            Field_cksnnfp749f: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 300,
                                    title: '评价标准及评分办法',
                                },
                                type: 'void',
                                properties: {
                                    评价标准: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '评价标准',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 3,
                            },
                            Field_k0n2chutqao: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 100,
                                    title: '分值',
                                },
                                type: 'void',
                                properties: {
                                    分值: {
                                        default: 0,
                                        'x-decorator': 'FormItem',
                                        'x-component': 'NumberPicker',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '分值',
                                        'x-reactions': {
                                            fulfill: {
                                                state: {
                                                    visible:
                                                        "{{$deps.类型 === '是'}}",
                                                },
                                            },
                                            dependencies: [
                                                {
                                                    property: 'value',
                                                    name: '类型',
                                                    source: '.类型',
                                                    type: 'string',
                                                },
                                            ],
                                        },
                                        'x-component-props': {
                                            keyboard: true,
                                            min: 0,
                                            bordered: true,
                                        },
                                        type: 'number',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 4,
                            },
                            Field_tphuh508g9w: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    width: 200,
                                    title: '评价备注',
                                },
                                type: 'void',
                                properties: {
                                    评价备注: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input.TextArea',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '评价备注',
                                        'x-reactions': {
                                            fulfill: {
                                                state: {
                                                    visible:
                                                        "{{$deps.类型 === '是'}}",
                                                },
                                            },
                                            dependencies: [
                                                {
                                                    property: 'value',
                                                    name: '类型',
                                                    source: '.类型',
                                                    type: 'string',
                                                },
                                            ],
                                        },
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 5,
                            },
                            Field_d1lqdx193ly: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-display': 'visible',
                                'x-visible': true,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    title: '类型',
                                },
                                type: 'void',
                                properties: {
                                    类型: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-display': 'none',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '类型',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 6,
                            },
                            Field_u34egwcchlf: {
                                'x-component': 'RecursiveArrayTable.Column',
                                'x-visible': false,
                                'x-component-props': {
                                    useComponentTiteInSchemaTitle: true,
                                    title: '详情_id',
                                },
                                type: 'void',
                                properties: {
                                    详情_id: {
                                        'x-decorator': 'FormItem',
                                        'x-component': 'Input',
                                        'x-display': 'visible',
                                        'x-decorator-props': {
                                            colon: true,
                                            bordered: true,
                                        },
                                        'x-visible': true,
                                        name: '详情_id',
                                        'x-pattern': 'readPretty',
                                        'x-component-props': {
                                            bordered: true,
                                        },
                                        type: 'string',
                                        'x-index': 0,
                                    },
                                },
                                'x-index': 7,
                            },
                            Field_7v0p462fhky: {
                                'x-component':
                                    'RecursiveArrayTable.RecursiveRow',
                                'x-visible': true,
                                'x-component-props': {
                                    defaultExpand: true,
                                    recursiveIndex: 'children',
                                },
                                type: 'void',
                                'x-index': 8,
                            },
                        },
                    },
                    'x-index': 0,
                },
            },
        };
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField schema={schema_Form_fka464n0m1i} />
            {/* <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="RecursiveArrayTable"
                    x-component-props={{
                        //加上边框
                        bordered: true,
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            title="名字"
                            x-component="RecursiveArrayTable.Column"
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
                            x-component="RecursiveArrayTable.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="age"
                                x-component={'Input'}
                            />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer> */}
        </Form>
    );
};
