import { __ } from '@wordpress/i18n';

const v200 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];
    return ( <>
        <h2 className="update-title">{__('Update Notice v2.0.0','gutenverse')}</h2>
        <ol>
            <li>{__('Introducing the Plugin Ecosystem','gutenverse')}</li>
            <p>{__('We\'re thrilled to announce that Gutenverse has evolved into a dynamic plugin ecosystem.','gutenverse')}</p>
            <p>{__('This transformation paves the way for the release of numerous exciting plugins in the future.','gutenverse')}</p>
            <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'} />
            <h3>{__('What exactly does a plugin ecosystem do?','gutenverse')}</h3>
            <p>{__('Essentially, we\'re breaking down each independent feature into its own distinct plugin.','gutenverse')}</p>
            <h3>{__('Why we\'re taking this approach?','gutenverse')}</h3>
            <p>{__('The primary benefit is that no longer will all these features be confined within a single plugin','gutenverse')}
                <i>{__('(which potentially causing bloated file sizes).','gutenverse')}</i>
            </p>
            <p>{__('By segmenting each independent feature into separate plugins, you gain the ability to choose which features you want to install.','gutenverse')}</p>
            <p>{__('This way, you can avoid the burden of a bulky plugin loaded with unnecessary features.','gutenverse')}</p>
            <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'} />
            <li>{__('Unlocking PRO Features!','gutenverse')}</li>
            <p>{__('Your patience has paid off! We are thrilled to introduce our awaited PRO features,','gutenverse')}</p>
            <p>{__('which provides advanced options, blocks, a comprehensive template library, and much more.','gutenverse')}</p>
            <p>{__('Let\'s delve into some of the remarkable PRO features:','gutenverse')}</p>

            <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'} />
            <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'} />
            <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'} />

            <li>{__('Improving the Visitor Experience','gutenverse')}</li>
            <p>{__('Our commitment to enhancing code quality is our top priority.','gutenverse')}</p>
            <p>{__('We\'ve consistently refined our code to ensure that your frontend sites maintain a lightweight profile, delivering an optimal browsing experience to your website visitors.','gutenverse')}</p>
            <p>{__('By significantly boosting loading speeds, we\'re confident that your visitors will enjoy enhanced interactions and an overall improved experience when navigating your website.','gutenverse')}</p>
        </ol>
    </> 
    )
}

export default v200;