import { __ } from '@wordpress/i18n';
import { installingPlugins } from 'gutenverse-core/helper';
import { useState } from '@wordpress/element';
import { IconLoadingSVG } from 'gutenverse-core/icons';

export const GutenverseFormEntriesNotice = () => {
    const [textButton, setTextButton] = useState(__('Install & Activate Gutenverse Form!', 'gutenverse'));
    const pluginsList = [
        { name: 'Gutenverse Form', slug: 'gutenverse-form', version: '', url: '' },
    ];
    const handleInstall = async () => {
        setTextButton(<IconLoadingSVG />);
        await installingPlugins(pluginsList)
            .then(() => {
                setTextButton(__('Done!', 'gutenverse'));
                window.location.reload();
            }).catch(() => {
                alert('Something went wrong when installing the plugin');
            });
    };
    return <>
        <div className="gutenverse-form-entries-notice">
            <h3>{__('Gutenverse Form Plugin Not Installed!', 'gutenverse')}</h3>
            <p>{__('To use all the features and capabilities of Gutenverse Form, you need to ', 'gutenverse')} <strong>{__('install and activate ', 'gutenverse')}</strong>{__('the Gutenverse Form plugin to access all functionalities and enhance your experience.', 'gutenverse')}</p>
            <div className="gutenverse-upgrade-action">
                <a className="button-primary upgrade-themes" onClick={handleInstall}>{textButton}</a>
            </div>
        </div>
    </>;
};