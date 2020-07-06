import * as ui from 'ui';

export default [
    {
        id: 'Section',
        label: 'Section',
        body: {
            type: 'Section',
            layout: {},
            props: {
                style: {
                    padding: 20
                }
            },
            children: []
        },
        component: ui.Section,
        props: [
            {
                key: 'style',
                label: 'Style',
                type: 'Style'
            }
        ]
    },
    {
        id: 'Scroll',
        label: 'Scroll',
        body: {
            type: 'Scroll',
            layout: {
                flex: 1
            },
            props: {},
            children: []
        },
        component: ui.Scroll,
        props: []
    },
    {
        id: 'Row',
        label: 'Row',
        body: {
            type: 'Row',
            isHorizontal: true,
            layout: {},
            props: {},
            children: []
        },
        component: ui.Row,
        props: []
    },
    {
        id: 'Column',
        label: 'Column',
        body: {
            type: 'Column',
            layout: {},
            props: {},
            children: []
        },
        component: ui.Column,
        props: []
    },
    {
        id: 'Button',
        label: 'Button',
        component: ui.Button,
        body: {
            type: 'Button',
            props: {
                variant: 'outlined'
            },
            children: [
                {
                    type: 'Text',
                    props: {
                        value: 'Button'
                    }
                }
            ]
        },
        props: [
            {
                key: 'variant',
                label: 'Variant',
                type: 'String'
            }
        ]
    },
    {
        id: 'Divider',
        label: 'Divider',
        component: ui.Divider,
        body: {
            type: 'Divider',
            layout: {
                paddingTop: 10,
                paddingBottom: 10
            },
            props: {
                variant: 'fullWidth'
            }
        },
        props: [
            {
                key: 'variant',
                label: 'Variant',
                type: 'Boolean'
            }
        ]
    },
    {
        id: 'Image',
        label: 'Image',
        component: ui.Image,
        body: {
            type: 'Image',
            props: {
                src: ''
            }
        },
        props: [
            {
                key: 'src',
                label: 'Source',
                type: 'String'
            }
        ]
    },
    {
        id: 'Text',
        label: 'Text',
        component: ui.Text,
        body: {
            type: 'Text',
            props: {
                value: 'Some Text'
            }
        },
        props: [
            {
                key: 'value',
                label: 'Value',
                type: 'String'
            }
        ]
    },
    {
        id: 'Title',
        label: 'Title',
        component: ui.Title,
        body: {
            type: 'Title',
            props: {
                src: ''
            },
            children: [
                {
                    type: 'Text',
                    props: {
                        value: 'Title text'
                    }
                }
            ]
        },
        props: [
            {
                key: 'color',
                label: 'Color',
                type: 'String'
            }
        ]
    }
];