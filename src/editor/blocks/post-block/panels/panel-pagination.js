import { __ } from '@wordpress/i18n';
import { IconControl, NumberControl, RangeControl, SelectControl, TextControl, CheckboxControl } from 'gutenverse-core/controls';

export const paginationPanel = (props) => {
    const {
        paginationMode,
        paginationPrevNextText,
        setSwitcher,
        switcher,
        setAttributes
    } = props;

    return [
        {
            id: 'paginationMode',
            label: __('Pagination Mode', 'gutenverse'),
            description: __('Note: Auto Load on Scroll effect is disabled in editor mode, but it can be viewed on Preview mode.', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('No Pagination'),
                    value: 'disable'
                },
                {
                    label: __('Load More'),
                    value: 'loadmore'
                },
                {
                    label: __('Auto Load on Scroll'),
                    value: 'scrollload'
                },
                {
                    label: __('Prev Next'),
                    value: 'prevnext'
                },
                {
                    label: __('Number'),
                    value: 'number'
                },
            ],
            onChange: () => {
                setAttributes({__paginationHover: 'normal'});
                setSwitcher({ ...switcher, paginationHover: 'normal' });
            }
        },
        {
            id: 'paginationPrevNextText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext'),
            label: __('Show Text', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'paginationPrevText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext') && paginationPrevNextText,
            label: __('"Previous" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationNextText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext') && paginationPrevNextText,
            label: __('"Next" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationPrevIcon',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext'),
            component: IconControl
        },
        {
            id: 'paginationNextIcon',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext'),
            component: IconControl
        },
        {
            id: 'paginationLoadmoreText',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            label: __('"Load More" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationLoadingText',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            label: __('"Loading" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationNumberPost',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            label: __('Pagination Post', 'gutenverse'),
            description: __('Number of Post loaded per Pagination', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 30,
            step: 1,
            isParseFloat: false
        },
        {
            id: 'paginationScrollLimit',
            show: paginationMode && paginationMode === 'scrollload',
            label: __('Auto Load Limit', 'gutenverse'),
            description: __('Limit of auto load when scrolling, set to zero to always load until end of content.', 'gutenverse'),
            component: NumberControl,
            min: 0,
            max: 9999,
            step: 1,
        },
        {
            id: 'paginationIcon',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            component: IconControl
        },
        {
            id: 'paginationIconPosition',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                }
            ]
        },
    ];
};