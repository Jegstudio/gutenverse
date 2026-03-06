import { __ } from '@wordpress/i18n';
import { IconSVGControl, NumberControl, RangeControl, SelectControl, TextControl, CheckboxControl } from 'gutenverse-core/controls';
import { paginationSwitcher } from '../data/data';

export const paginationPanel = (props) => {
    const {
        paginationMode,
        paginationPrevNextText,
        setSwitcher,
        switcher,
        setAttributes,
        paginationLoadmoreAnimation,
        paginationLoadmoreAnimationSequence,
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
                    label: __('Normal Prev Next (Best for SEO)'),
                    value: 'normal-prevnext'
                },
                {
                    label: __('Normal Number (Best for SEO)'),
                    value: 'normal-number'
                },
                {
                    label: __('Load More (Ajax)'),
                    value: 'loadmore'
                },
                {
                    label: __('Auto Load on Scroll (Ajax)'),
                    value: 'scrollload'
                },
                {
                    label: __('Prev Next (Ajax)'),
                    value: 'prevnext'
                },
                {
                    label: __('Number (Ajax)'),
                    value: 'number'
                },
            ],
            onChange: ({ paginationMode, __paginationHover }) => {
                const paginationSwitcherData = paginationSwitcher(paginationMode);

                if (paginationSwitcherData?.some(item => item.value === __paginationHover)) return;

                setAttributes({ __paginationHover: 'normal' });
                setSwitcher({ ...switcher, paginationHover: 'normal' });
            }
        },
        {
            id: 'paginationPrevNextText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext' || paginationMode === 'normal-prevnext' || paginationMode === 'normal-number'),
            label: __('Show Text', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'paginationPrevText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext' || paginationMode === 'normal-prevnext' || paginationMode === 'normal-number') && paginationPrevNextText,
            label: __('"Previous" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationNextText',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext' || paginationMode === 'normal-prevnext' || paginationMode === 'normal-number') && paginationPrevNextText,
            label: __('"Next" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationPrevIcon',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext' || paginationMode === 'normal-prevnext' || paginationMode === 'normal-number'),
            component: IconSVGControl
        },
        {
            id: 'paginationNextIcon',
            show: paginationMode && (paginationMode === 'number' || paginationMode === 'prevnext' || paginationMode === 'normal-prevnext' || paginationMode === 'normal-number'),
            component: IconSVGControl
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
            component: IconSVGControl
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
        {
            id: 'paginationLoadmoreAnimation',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
            label: __('Load Animation', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Fade In',
                    value: 'fadeIn'
                },
                {
                    label: 'Fade In Left',
                    value: 'fadeInLeft'
                },
                {
                    label: 'Fade In Down',
                    value: 'fadeInDown'
                },
                {
                    label: 'Fade In Right',
                    value: 'fadeInRight'
                },
                {
                    label: 'Fade In Up',
                    value: 'fadeInUp'
                },
            ]
        },
        {
            id: 'paginationLoadmoreAnimationSequence',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload') && (paginationLoadmoreAnimation && paginationLoadmoreAnimation !== 'none'),
            label: __('Load Animation Sequence', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'All',
                    value: 'all'
                },
                {
                    label: 'Sequential',
                    value: 'sequential'
                },
            ]
        },
        {
            id: 'paginationLoadmoreAnimationSequenceDelay',
            show: paginationMode && (paginationMode === 'loadmore' || paginationMode === 'scrollload') && paginationLoadmoreAnimationSequence === 'sequential' && (paginationLoadmoreAnimation && paginationLoadmoreAnimation !== 'none'),
            label: __('Delay (ms)', 'gutenverse'),
            component: NumberControl,
            description: __('Input in miliseconds (ms). Later will be converted into second (s)', 'gutenverse'),
            min: 0,
            step: 100
        },
    ];
};