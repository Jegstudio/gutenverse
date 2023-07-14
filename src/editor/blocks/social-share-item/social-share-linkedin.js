import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareLinkedinSVG } from '../../../assets/icon/index';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const SocialShareLinkedin = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        serverPath: 'gutenverse/social-share-linkedin',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-linkedin';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Linkedin', 'gutenverse'),
    description: __('Gutenverse Social Share Linkedin', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Linkedin', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('linkedin', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareLinkedinSVG />,
    edit: SocialShareLinkedin,
};
