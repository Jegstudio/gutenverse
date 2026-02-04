import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { UpgradePro } from '../pages/upgrade-pro';
import { applyFilters } from '@wordpress/hooks';

const GettingStarted = ({ updateProgress, gutenverseImgDir }) => {
    return <div
        className="getting-started"
        style={{ backgroundImage: `url(${gutenverseImgDir}/wizard-bg-welcome.png)` }}
    >
        <div className="content-top">
            <p className="welcome">{__('WELCOME', 'gutenverse')}</p>
            <h3 className="content-title">
                {__('Get Started with ', 'gutenverse')}
                <span className="gradient-text">{__('Gutenverse', 'gutenverse')}</span>
            </h3>
            <p className="content-desc">
                {__('Thank you for choosing Gutenverse. Follow our quick setup wizard to start your Full Site Editing experience right now.', 'gutenverse')}
            </p>
        </div>
        <img className="wizard-image item-1" src={gutenverseImgDir + '/wizard-mockup-welcome.png'} />
        <img className="wizard-image item-2" src={gutenverseImgDir + '/wizard-blink-blue.png'} />
        <div className="content-bottom">
            <p className="consent-notice">{__('By proceeding, you agree to our Privacy Policy and permit this plugin to collect your data as outlined within.', 'gutenverse')}</p>
            <a
                className="consent-notice-link"
                href="https://gutenverse.com/privacy-policy/"
                title="View our privacy policy"
                target="_blank"
                rel="noopener noreferrer"
            >
                {__('Read our Privacy Policy.', 'gutenverse')}
            </a>
        </div>
        <div className="wizard-footer">
            <Fragment>
                <div onClick={() => updateProgress('upgradePro', 1)} className="button-next">{__('Next', 'gutenverse')}</div>
            </Fragment>
        </div>
    </div>;
};

const WizardPage = () => {
    const [progress, setProgress] = useState('startWizard');
    const [progressCount, setProgressCount] = useState(0);
    const emptyLicense = applyFilters('gutenverse.panel.tab.pro.content', true);

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(inc);
    };

    const content = () => {
        const {
            gutenverseImgDir,
            ImgDir
        } = window['GutenverseWizard'];
        const { adminUrl } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

        switch (progress) {
            case 'upgradePro':
                return <UpgradePro updateProgress={updateProgress} />;
            case 'done':

                return <div className="finalizing">
                    <div className="image-wrapper">
                        <img className="image-done" src={gutenverseImgDir + '/final.png'} />
                    </div>
                    <div className="final-detail">
                        <h3 className="final-title">{__('Congratulations All Set 🤩', 'gutenverse')}</h3>
                        <p className="final-desc">{__('Gutenverse is a powerful and lightweight Gutenberg blocks and page builder plugin for WordPress Site Editor.', 'gutenverse')}</p>
                        <div onClick={() => {
                            window.location.href = adminUrl ? adminUrl : window.location.origin + '/wp-admin/';
                        }} className="button-visit">{__('Visit Dashboard', 'gutenverse')}</div>
                    </div>
                </div>;
            case 'startWizard':
            default:
                return <GettingStarted updateProgress={updateProgress} gutenverseImgDir={gutenverseImgDir} ImgDir={ImgDir} />;
        }
    };

    return <div className="theme-wizard-wrapper">
        <div className="theme-wizard">
            <div className="wizard-header">
                <div className={`progress ${progress === 'startWizard' ? 'active' : ''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className="number">1</p>
                    <h3 className="progress-title">{__('Getting Started', 'gutenverse')}</h3>
                </div>
                {emptyLicense && <div className={`progress ${progress === 'upgradePro' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className="number">2</p>
                    <h3 className="progress-title">{__('Upgrade Your Site', 'gutenverse')}</h3>
                </div>}
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className="number">3</p>
                    <h3 className="progress-title">{__('Finalizing', 'gutenverse')}</h3>
                </div>
            </div>
            <div className={`wizard-body ${progress.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`}>
                {content()}
            </div>
        </div>
    </div>;
};

export default WizardPage;