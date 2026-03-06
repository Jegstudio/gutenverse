import { __ } from '@wordpress/i18n';

export const GutenverseUpgradeNotice = ({ data }) => {
    const { action_url } = data;
    return <>
        <div className="gutenverse-upgrade-notice-center">
            <h3>{__('New Gutenverse Setup!', 'gutenverse')}</h3>
            <p>{__('We\'ve made some changes on v2.0.0:', 'gutenverse')}</p>
            <ol>
                <li><p>{__('We\'ve separated the ', 'gutenverse')} <strong>{__('Gutenverse Form', 'gutenverse')}</strong> {__('from our main plugin to speed up Gutenverse and offer more flexibility. If you were using form before, please install & activate the form plugin.', 'gutenverse')}</p></li>
                <li><p>{__('Fonticons are now loaded locally. You can find this option and download the font in the Gutenverse Settings menu.', 'gutenverse')}</p></li>
            </ol>
            <div className="gutenverse-upgrade-action">
                <a className="button-primary upgrade-themes" href={action_url}>{__('Setup Now!', 'gutenverse')}</a>
            </div>
        </div>
    </>;
};