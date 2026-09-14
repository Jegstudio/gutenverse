import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareSVG } from '../../../assets/icon/index';

const SocialSharePerflexity = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'perflexity',
        serverPath: 'gutenverse/social-share-perflexity',
    };

    return <SingleSocialShare {...socialProps} />;
});

const name = 'gutenverse/social-share-perflexity';

const metadata = {
    ...jsondata,
    title: __('Summarize on Perflexity', 'gutenverse'),
    description: __('Summarize on Perflexity', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Summarize on Perflexity', 'gutenverse')
        },
        type: {
            type: 'string',
            default: 'perflexity'
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('perflexity', 'gutenverse'),
        __('perplexity', 'gutenverse'),
        __('ai', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareSVG />,
    edit: SocialSharePerflexity,
};
