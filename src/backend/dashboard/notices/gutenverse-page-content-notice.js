import { __ } from '@wordpress/i18n';

export const GutenversePageContentNotice = ({ data }) => {
    const { theme_name, action_url } = data;
    return <>
        <div className="gutenverse-page-content-notice">
            <h3>{__('Gutenverse Upgrade Notice!', 'gutenverse')}</h3>
            <p>{`We detect you are using ${theme_name} theme. There are some new exciting updates we want to announce. This update will required the latest version of ${theme_name} theme to work smoothly, so we recommend to update your ${theme_name} theme.`}</p>
            <div className="gutenverse-upgrade-action">
                <a className="button-primary upgrade-themes" href={action_url}>{__('Go to theme page', 'gutenverse')}</a>
            </div>
        </div>
    </>;
};