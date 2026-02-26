/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel, typographyPanel } from 'gutenverse-core/controls';
import { CheckboxControl, SelectControl, ColorControl, SelectSearchControl, TextControl } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { isOnEditor } from 'gutenverse-core/helper';

export const settingPanel = (props) => {
    const { link, context } = props;

    // Create async search function for ACF fields
    const searchDynamicField = isOnEditor() ? (input) => new Promise((resolve) => {
        const postType = context?.postType;

        if (!postType) {
            resolve([]);
            return;
        }

        apiFetch({ path: `gutenverse/v1/dynamic-fields?postType=${postType}` })
            .then((response) => {
                if (response && response.fields) {
                    // Filter fields based on search input
                    const filtered = response.fields.filter(field =>
                        field.label.toLowerCase().includes(input.toLowerCase()) ||
                        field.value.toLowerCase().includes(input.toLowerCase())
                    );
                    resolve(filtered);
                } else {
                    resolve([]);
                }
            })
            .catch(() => {
                resolve([]);
            });
    }) : () => [];

    return [
        {
            id: 'fieldContent',
            label: __('Field Content Key', 'gutenverse'),
            description: __('Search and select an Dynamic Field.', 'gutenverse'),
            component: SelectSearchControl,
            onSearch: searchDynamicField,
        },
        {
            id: 'htmlTag',
            label: __('HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('Paragraph'), value: 'p' },
                { label: __('span'), value: 'span' },
                { label: __('div'), value: 'div' },
                { label: __('H1'), value: 'h1' },
                { label: __('H2'), value: 'h2' },
                { label: __('H3'), value: 'h3' },
                { label: __('H4'), value: 'h4' },
                { label: __('H5'), value: 'h5' },
                { label: __('H6'), value: 'h6' },
            ],
        },
        {
            id: 'link',
            label: __('Turn as Link', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'linkTarget',
            show: !!link,
            label: __('Open in New Tab', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'fieldLink',
            label: __('Field Link (Optional)', 'gutenverse'),
            description: __('Select a field to use as the link. If empty, the content itself will be the link.', 'gutenverse'),
            component: SelectSearchControl,
            onSearch: searchDynamicField,
            show: !!link,
        },
    ];
};

export const formatPanel = (props) => {
    const {
        formatType,
        formatOptionsTextCase,
        formatOptionsRegexPattern,
        formatOptionsRegexReplace,
        formatOptionsDateBefore,
        formatOptionsDateAfter,
        setAttributes
    } = props;

    return [
        {
            id: 'formatType',
            label: __('Format Data', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('None', 'gutenverse'), value: 'none' },
                { label: __('Text Case', 'gutenverse'), value: 'textCase' },
                { label: __('Regex', 'gutenverse'), value: 'regex' },
                { label: __('Date', 'gutenverse'), value: 'date' },
            ]
        },
        {
            id: 'formatOptionsTextCase',
            label: __('Text Case', 'gutenverse'),
            component: SelectControl,
            show: formatType === 'textCase',
            customValue: formatOptionsTextCase || 'uppercase',
            options: [
                { label: __('Uppercase', 'gutenverse'), value: 'uppercase' },
                { label: __('Lowercase', 'gutenverse'), value: 'lowercase' },
                { label: __('Capitalize', 'gutenverse'), value: 'capitalize' },
            ],
            customChange: (val) => setAttributes({ formatOptionsTextCase: val })
        },
        {
            id: 'formatOptionsRegexPattern',
            label: __('Regex Pattern', 'gutenverse'),
            description: __('Enter regular expression pattern, e.g. /[0-9]+/', 'gutenverse'),
            component: TextControl,
            show: formatType === 'regex',
            customValue: formatOptionsRegexPattern || '',
            customChange: (val) => setAttributes({ formatOptionsRegexPattern: val })
        },
        {
            id: 'formatOptionsRegexReplace',
            label: __('Regex Replace', 'gutenverse'),
            description: __('Enter replacement string.', 'gutenverse'),
            component: TextControl,
            show: formatType === 'regex',
            customValue: formatOptionsRegexReplace || '',
            customChange: (val) => setAttributes({ formatOptionsRegexReplace: val })
        },
        {
            id: 'formatOptionsDateBefore',
            label: __('Date Before Format', 'gutenverse'),
            description: __('Enter source date format, e.g. Ymd (for ACF dates).', 'gutenverse'),
            component: TextControl,
            show: formatType === 'date',
            customValue: formatOptionsDateBefore || '',
            customChange: (val) => setAttributes({ formatOptionsDateBefore: val })
        },
        {
            id: 'formatOptionsDateAfter',
            label: __('Date After Format', 'gutenverse'),
            description: __('Enter target date format, e.g. F j, Y.', 'gutenverse'),
            component: TextControl,
            show: formatType === 'date',
            customValue: formatOptionsDateAfter || '',
            customChange: (val) => setAttributes({ formatOptionsDateAfter: val })
        },
    ];
};

export const stylePanel = (props) => {
    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                { label: __('Left'), value: 'left' },
                { label: __('Center'), value: 'center' },
                { label: __('Right'), value: 'right' },
            ],
        },
        {
            id: 'color',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'colorHover',
            label: __('Text Color Hover', 'gutenverse'),
            component: ColorControl,
        },
    ];
};

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting,
            initialOpen: true,
        },
        {
            title: __('Format Data', 'gutenverse'),
            panelArray: formatPanel,
            tabRole: TabSetting,
            initialOpen: false,
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: stylePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'dynamic-field-typography',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'dynamic-field-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'dynamic-field-border',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting,
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'dynamic-field-animation',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'dynamic-field-advance',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true,
        },
    ];
};
