import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../helper";

export const settingPanel = (props) => {
    const {
        imageLoad,
        lazyLoad
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);

    return [
        {
            id: 'postLink',
            label: __('Make Image a Link to Post', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'placeholderImg',
            label: __('Show Placeholder Image', 'gutenverse'),
            description: __('Show Placeholder Image when post doesn\'t have featured image', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('LazyLoad', 'gutenverse'),
                    value: 'lazy'
                },
            ],
        }
    ];
};