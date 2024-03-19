
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const TeamProfile = ({
    profileType,
    src,
    lazy,
    addPopup,
    overlayType,
    overlayPosition,
    name,
    job,
    description,
    showDesc,
    showSocial,
    nameTag: NameTag,
    hoverBottom,
    hoverBottomDirection,
    socialComponent,
    setAttributes,
    frontEnd,
    onClick = () => {}
}) => {
    const lazyLoad = () => {
        if(lazy){
            return <img loading="lazy" src={getImageSrc(src)} alt={name}/>;
        } else return <img src={getImageSrc(src)} alt={name}/>;
    };
    const contentDesc = () => {
        if(showDesc){
            if(frontEnd){
                return <RichText.Content
                    className={'profile-desc'}
                    tagName={'p'}
                    aria-label={__('Team Description', 'gutenverse')}
                    // placeholder={__('Image Box Description', 'gutenverse')}
                    value={description}
                />;
            }else{
                return <RichText
                    className={'profile-desc'}
                    tagName={'p'}
                    aria-label={__('Team Description', 'gutenverse')}
                    // placeholder={__('Image Box Description', 'gutenverse')}
                    value={description}
                    identifier={'description'}
                    onChange={value => setAttributes({ description: value })}
                />;
            }
        }
    };

    const contentType = () => {
        switch(profileType) {
            case 'overlay':
                return (
                    <div className={`profile-card card-overlay ${overlayType}`}>
                        {lazyLoad()}
                        <div className={`profile-body ${overlayPosition}`}>
                            <NameTag className={`profile-title ${addPopup ? 'popup' : ''}`} onClick={onClick}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {contentDesc()}
                            {showSocial && <div className="socials-wrapper">
                                {socialComponent}
                            </div>}
                        </div>
                    </div>
                );
            case 'hover':
                return (
                    <div className={'profile-card card-hover'}>
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} onClick={onClick}>
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            <NameTag className={'profile-title'}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {contentDesc()}
                            {showSocial && <div className="socials-wrapper">
                                {socialComponent}
                            </div>}
                        </div>
                        {hoverBottom && <div className={'border-bottom'}>
                            <div className={`animated ${hoverBottomDirection}`}></div>
                        </div>}
                    </div>
                );
            default:
                return (
                    <div className={'profile-card card-default'}>
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} onClick={onClick}>
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            <NameTag className={'profile-title'}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {contentDesc()}
                        </div>
                        {showSocial && <div className={'profile-footer'}>
                            <div className="socials-wrapper">
                                {socialComponent}
                            </div>
                        </div>}
                        {hoverBottom && <div className={'border-bottom'}>
                            <div className={`animated ${hoverBottomDirection}`}></div>
                        </div>}
                    </div>
                );
        }
    };

    return (
        <div className={'profile-box'}>
            {contentType()}
        </div>
    );
};

export default TeamProfile;