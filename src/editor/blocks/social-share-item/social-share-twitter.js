import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { IconShareTwitterSVG } from '../../../assets/icon/index';

const SocialShareTwitter = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        shareType: 'twitter',
        serverPath: 'gutenverse/social-share-twitter',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-twitter';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Twitter', 'gutenverse'),
    description: __('Gutenverse Social Share Twitter', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Twitter', 'gutenverse')
        },
        type: {
            type: 'string',
            default: __('twitter', 'gutenverse')
        },
        selectedIcon: {
            type: 'string',
            default: __('twitter', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('twitter', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareTwitterSVG />,
    edit: SocialShareTwitter,
};
