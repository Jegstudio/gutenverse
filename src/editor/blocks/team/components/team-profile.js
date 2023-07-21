
import { getImageSrc } from 'gutenverse-core/editor-helper';

const TeamProfile = ({
    profileType,
    src,
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
    onClick = () => {}
}) => {

    const contentType = () => {
        switch(profileType) {
            case 'overlay':
                return (
                    <div className={`profile-card card-overlay ${overlayType}`}>
                        <img src={getImageSrc(src)} alt={name}/>
                        <div className={`profile-body ${overlayPosition}`}>
                            <NameTag className={`profile-title ${addPopup ? 'popup' : ''}`} onClick={onClick}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {showDesc && <p className={'profile-desc'}>{description}</p>}
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
                            <img src={getImageSrc(src)} alt={name}/>
                        </div>
                        <div className={'profile-body'}>
                            <NameTag className={'profile-title'}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {showDesc && <p className={'profile-desc'}>{description}</p>}
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
                            <img src={getImageSrc(src)} alt={name}/>
                        </div>
                        <div className={'profile-body'}>
                            <NameTag className={'profile-title'}>{name}</NameTag>
                            <p className={'profile-sub'}>{job}</p>
                            {showDesc && <p className={'profile-desc'}>{description}</p>}
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