import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextareaControl, TextControl, SelectControl } from 'gutenverse-core/controls';

const AiPrompDescroption = {
    'chatgpt': __('Add an extra prompt after the summary when sharing your article to ChatGPT.', 'gutenverse'),
    'perflexity': __('Add an extra prompt after the summary when sharing your article to Perplexity.', 'gutenverse'),
};

export const panelContent = (props) => {
    const {
        showText,
        hideText,
        type
    } = props;
    const isAIShare = ['chatgpt', 'perflexity'].includes(type);

    return [
        {
            id: 'showText',
            label: __('Show Share Text', 'gutenverse'),
            description: __('Display custom text beside icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'hideText',
            show: showText,
            label: __('Hide Share Text', 'gutenverse'),
            description: __('Hide custom text beside icon on the selected device', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
            deviceValues: hideText,
            usePreviousDeviceValue: true,
            usePreviousDevice: true,
        },
        {
            id: 'text',
            show: showText,
            label: __('Share Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'selectedIcon',
            show: 'twitter' === type,
            label: __('Version', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Twitter Bird', 'gutenverse'),
                    value: 'twitter'
                },
                {
                    label: __('Twitter X', 'gutenverse'),
                    value: 'x-twitter'
                },
            ],
        },
        {
            id: 'additionalAIPrompt',
            show: isAIShare,
            label: __('Additional AI Prompt', 'gutenverse'),
            description: AiPrompDescroption[type],
            component: TextareaControl,
        },
    ];
};
