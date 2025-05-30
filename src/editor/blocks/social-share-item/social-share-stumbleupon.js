import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareStumbleuponSVG } from '../../../assets/icon/index';

const SocialShareStumbelupon = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'stumbleupon',
        serverPath: 'gutenverse/social-share-stumbleupon',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-stumbleupon';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Stumbleupon', 'gutenverse'),
    description: __('Gutenverse Social Share Stumbleupon', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Stumbleupon', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('stumbleupon', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareStumbleuponSVG />,
    edit: SocialShareStumbelupon,
};
