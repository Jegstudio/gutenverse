import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconSharePinterestSVG } from '../../../assets/icon/index';

const SocialSharePinterest = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'pinterest',
        serverPath: 'gutenverse/social-share-pinterest',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-pinterest';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Pinterest', 'gutenverse'),
    description: __('Gutenverse Social Share Pinterest', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Pinterest', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('pinterest', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconSharePinterestSVG />,
    edit: SocialSharePinterest,
};
