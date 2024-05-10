
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { RichTextComponent } from 'gutenverse-core/components';

const TeamProfile = (props) => {
    const {
        socialComponent,
        attributes,
        setAttributes,
        setPanelState,
        frontEnd,
        clientId,
        nameRef,
        jobRef,
        descRef,
        elementRef
    } = props;
    const {
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
    } = attributes;
    const lazyLoad = () => {
        if(lazy){
            return <img loading="lazy" src={getImageSrc(src)} alt={name}/>;
        } else return <img src={getImageSrc(src)} alt={name}/>;
    };
    const contentDesc = (classnames, ariaLabel, identifier, data, tag ) => {
        if(showDesc){
            if(frontEnd){
                return <RichText.Content
                    className={classnames}
                    tagName={tag}
                    value={data}
                />;
            }else{
                let ref = null;
                if(identifier === 'name'){
                    ref = nameRef;
                }else if(identifier === 'job'){
                    ref = jobRef;
                }else if(identifier === 'description'){
                    ref = descRef;
                }
                return(
                    <RichTextComponent
                        ref={ref}
                        classNames={classnames}
                        tagName={tag}
                        onChange={value => setAttributes({ [identifier]: value })}
                        aria-label={ariaLabel}
                        placeholder={ariaLabel}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        panelDynamic={{panel : 'setting', section : 1}}
                        panelPosition={{panel : 'style', section : 1}}
                        contentAttribute={identifier}
                        setPanelState={setPanelState}
                        textChilds={identifier + 'Childs'}
                        dynamicList={identifier + 'DynamicList'}
                        isUseDinamic={true}
                        isUseHighlight={true}
                    />
                );
            }
        }else if(!showDesc && identifier !== 'description'){
            if(frontEnd){
                return <RichText.Content
                    className={classnames}
                    tagName={tag}
                    value={data}
                />;
            }else{
                let ref = null;
                if(identifier === 'name'){
                    ref = nameRef;
                }else if(identifier === 'job'){
                    ref = jobRef;
                }
                return(
                    <RichTextComponent
                        ref={ref}
                        classNames={classnames}
                        tagName={tag}
                        onChange={value => setAttributes({ [identifier]: value })}
                        aria-label={ariaLabel}
                        placeholder={ariaLabel}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        panelDynamic={{panel : 'setting', section : 1}}
                        panelPosition={{panel : 'style', section : 1}}
                        contentAttribute={identifier}
                        setPanelState={setPanelState}
                        textChilds={identifier + 'Childs'}
                        dynamicList={identifier + 'DynamicList'}
                        isUseDinamic={true}
                        isUseHighlight={true}
                    />
                );
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
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
                            {showSocial && <div className="socials-wrapper">
                                {socialComponent}
                            </div>}
                        </div>
                    </div>
                );
            case 'hover':
                return (
                    <div className={'profile-card card-hover'}>
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} >
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
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
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} >
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
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