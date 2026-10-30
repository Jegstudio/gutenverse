import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareChatGPTSVG } from '../../../assets/icon/index';

const SocialShareChatGPT = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'chatgpt',
        serverPath: 'gutenverse/social-share-chatgpt',
    };

    return <SingleSocialShare {...socialProps} />;
});

const name = 'gutenverse/social-share-chatgpt';

const metadata = {
    ...jsondata,
    title: __('Summarize on ChatGPT', 'gutenverse'),
    description: __('Summarize on ChatGPT', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Summarize on ChatGPT', 'gutenverse')
        },
        type: {
            type: 'string',
            default: 'chatgpt'
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('chatgpt', 'gutenverse'),
        __('ai', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareChatGPTSVG />,
    edit: SocialShareChatGPT,
};
