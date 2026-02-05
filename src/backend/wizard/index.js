import { useState, createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { IconPluginCheckSVG, IconPluginFormSVG, IconPluginFontSVG } from '../../assets/icon/index';
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
import WizardPage from './pages/wizard-lite';

const WizardItem = ({ part, selected, toggleSelected, icon, title, subtitle }) => {
    const classes = classnames('wizard-gutenverse-form', 'wizard-item', {
        selected: selected
    });

    return <div className={classes} onClick={() => toggleSelected(part)}>
        <div className="wizard-item-icon">
            {icon}
        </div>
        <div className="wizard-item-content">
            <h3>{title()}</h3>
            <p>{subtitle}</p>
        </div>
        {selected && <div className="wizard-item-check">
            <IconPluginCheckSVG />
        </div>}
    </div>;
};

const WizardContainer = ({ setStage }) => {
    const { status, dashboard } = window.GutenverseWizard;

    const totalActiveStatus = Object.keys(status).reduce((k, v) => status[v] ? k + 1 : k, 0);


    const [selected, setSelected] = useState({
        form: true && status.form,
        icon: true && status.icon
    });

    const { form, icon } = status;
    const [flag, setFlag] = useState('choose');
    const [progress, setProgress] = useState({
        step: -1,
        totalStep: 1,
        text: ''
    });

    const toggleSelected = (part) => {
        if ('choose' === flag) {
            setSelected(status => {
                return {
                    ...status,
                    [part]: !status[part]
                };
            });
        }
    };

    const getTotalSelected = () => {
        return Object.keys(selected).reduce((accumulator, currentValue) => {
            if (selected[currentValue]) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
    };

    const getFilteredSelected = () => {
        return Object.keys(selected).filter(key => selected[key]);
    };

    const doUpgrade = (index) => {
        setFlag('installing');

        const step = getFilteredSelected();
        const totalStep = getTotalSelected();
        const currentKey = step[index];
        let text = '';

        switch (currentKey) {
            case 'form':
                text = __('Install Gutenverse Form Plugin', 'gutenverse');
                break;
            case 'icon':
                text = __('Install Gutenverse Icon', 'gutenverse');
                break;
        }

        setProgress({
            step: index,
            totalStep: totalStep,
            text
        });
        if ( index < totalStep ) {
            apiFetch({
                path: 'gutenverse-client/v1/upgrade',
                method: 'POST',
                data: {
                    step: currentKey,
                },
            }).then(() => {
                doUpgrade(index + 1);
            });
        } else {
            apiFetch({
                path: 'gutenverse-client/v1/upgrade',
                method: 'POST',
                data: {
                    step: 'complete',
                },
            });

            setProgress({
                step: totalStep,
                totalStep: totalStep,
                text: __('Redirecting to Dashboard', 'gutenverse')
            });

            setTimeout(() => {
                window.location.href = dashboard;
            }, 3000);
        }
    };

    return totalActiveStatus > 0 ? <div className="wizard-wrapper">
        <div className="wizard-container">
            <div className="wizard-container-header">
                <h1>{__('Thank you for upgrading Gutenverse', 'gutenverse')}</h1>
                <p>{__('We separate block into several plugin on Version 2. Choose plugin or asset that you want to install & activate.', 'gutenverse')}</p>
            </div>
            <div className="wizard-container-body">
                {form && <WizardItem
                    title={() => {
                        return <>
                            <strong>{__('Gutenverse', 'gutenverse')} </strong>{__('Form', 'gutenverse')}
                        </>;
                    }}
                    subtitle={__('Flexible, Design-Friendly and Advanced Contact Form builder plugin for WordPress new Editor')}
                    icon={<IconPluginFormSVG />}
                    part={'form'}
                    selected={selected.form}
                    toggleSelected={toggleSelected}
                />}

                {icon && <WizardItem
                    title={() => {
                        return <>
                            {__('Gutenicon & Fontawesome', 'gutenverse')}
                        </>;
                    }}
                    subtitle={__('Download Gutenverse fonticon into your server')}
                    icon={<IconPluginFontSVG />}
                    part={'icon'}
                    selected={selected.icon}
                    toggleSelected={toggleSelected}
                />}
            </div>
            <div className="wizard-container-footer">
                <div className={classnames('wizard-progress', {
                    hide: 'installing' !== flag
                })}>
                    <div className="wizard-progress-wrapper">
                        <div className="progress-text"> {progress.text} </div>
                        {progress.step !== progress.totalStep && <div className="progress-step">
                            {progress.step + 1} / {progress.totalStep} {__('Completed', 'gutenverse')}
                        </div>}
                    </div>
                    <div className="progress-bar">
                        <div className="progress-done" style={{
                            width: (progress.step + 1) / (progress.totalStep + 1) * 100 + '%'
                        }} />
                    </div>
                </div>
                {'choose' === flag && <div className="wizard-button">
                    <div className="button secondary" onClick={() => setStage('later')}>{__('Install Later')}</div>
                    <div className="button active" onClick={() => doUpgrade(0)}>{__('Install & Activate')}</div>
                </div>}
            </div>
        </div>
    </div> : <div className="wizard-wrapper">
        <div className="wizard-container">
            <div className="wizard-container-header">
                <h1>{__('All Setup is Done', 'gutenverse')}</h1>
                <p>{__('All required plugins are upgraded and activated.', 'gutenverse')}</p>
            </div>
            <div className="wizard-container-footer">
                <div className="wizard-button">
                    <div className="button active" onClick={() => window.open(dashboard)}>{__('Go to Dashboard', 'gutenverse')}</div>
                </div>
            </div>
        </div>
    </div>;
};

const WizardInstallLater = ({ setStage }) => {
    const { dashboard } = window.GutenverseWizard;

    return <div className="wizard-wrapper">
        <div className="wizard-container">
            <div className="wizard-container-header">
                <h1>{__('New Gutenverse Setup', 'gutenverse')}</h1>
                <p>{__('If you decide to do upgrade later, you can follow this step.', 'gutenverse')}</p>
            </div>
            <div className="wizard-container-body" style={{ margin: '70px 0px 90px' }}>
                <ol>
                    <li style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontWeight: 500 }}>{__('Install Additional Gutenverse Plugin', 'gutenverse')}</h3>
                        <p>{__('Go to', 'gutenverse')} <strong>{__('Gutenverse Dashboard → Ecosystem', 'gutenverse')}</strong> {__('and Choose which plugin you want to install.', 'gutenverse')}</p>
                    </li>
                    <li style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontWeight: 500 }}>{__('Load Fonticon locally', 'gutenverse')}</h3>
                        <p>{__('Go to', 'gutenverse')} <strong>{__('Gutenverse Dashboard → Setting → Font', 'gutenverse')}</strong> {__('and you can download font icon and serve it from your server instead of cloud.', 'gutenverse')}</p>
                    </li>
                </ol>
            </div>
            <div className="wizard-container-footer">
                <div className="wizard-button">
                    <a className="button secondary" href={dashboard}>{__('Go to Dashboard', 'gutenverse')}</a>
                    <div className="button active" onClick={() => setStage('install')}>{__('Back to Upgrade Page', 'gutenverse')}</div>
                </div>
            </div>
        </div>
    </div>;
};

const UpgradeWizard = () => {
    const [stage, setStage] = useState('install');

    return 'install' === stage ? <WizardContainer setStage={setStage} /> : <WizardInstallLater setStage={setStage} />;
};


const loadWizard = () => {
    const wizardDiv = document.getElementById('gutenverse-wizard');

    if (wizardDiv) {
        const root = createRoot(wizardDiv);
        root.render(<UpgradeWizard />);
    }

    const onboardWizardDiv = document.getElementById('gutenverse-onboard-wizard');
    if (onboardWizardDiv) {
        const root = createRoot(onboardWizardDiv);
        root.render(<WizardPage />);
    }
};

window.addEventListener('load', () => {
    loadWizard();
});