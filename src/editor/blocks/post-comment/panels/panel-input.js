import { __ } from '@wordpress/i18n';
import { handleBorder } from 'gutenverse-core/controls';
import { BorderControl } from 'gutenverse-core/controls';

export const inputPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'inputBorder',
            label: __('Input Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .comment-form form input:not([type=submit]), .${elementId} .comment-form form textarea`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};

