import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useRef } from '@wordpress/element';
import NavMenuPreview from './nav-menu-preview';
import { Helmet, NavSkeleton, classnames } from 'gutenverse-core/components';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor, responsiveBreakpoint } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';

const NavMenuBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        deviceType,
        clientId
    } = props;

    const {
        elementId,
        menuId,
        breakpoint,
        submenuItemIndicator,
        submenuItemIndicatorType,
        submenuItemIndicatorSVG,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const [menu, setMenu] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [responsiveStyle, setResponsiveStyle] = useState('');

    const ResponsiveStyles = () => {
        const windowEl = elementRef.current?.ownerDocument?.defaultView || elementRef.current?.ownerDocument?.parentWindow;

        if (windowEl?.document) {
            const headEl = windowEl.document.getElementsByTagName('head')[0];
            if ( !windowEl?.document?.getElementById('gutenverse-nav-menu-responsive-style') || responsiveStyle !== '' ) {
                return (
                    <Helmet head={headEl}>
                        <style id="gutenverse-nav-menu-responsive-style">{responsiveStyle}</style>
                    </Helmet>
                );
            }
        }
        return <></>;
    };

    useEffect(() => {
        const {
            tabletBreakpoint = 1024,
            mobileBreakpoint = 767,
        } = responsiveBreakpoint();

        const mdMin = tabletBreakpoint;
        const smMax = tabletBreakpoint + 1;
        const smMin = mobileBreakpoint;
        const xsMax = mobileBreakpoint + 1;

        setResponsiveStyle(`@media screen and (max-width: ${mdMin}px) {
            .guten-nav-menu.break-point-tablet .gutenverse-hamburger-menu {
                display: block;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper {
                width: 100%;
                max-width: 360px;
                border-radius: 0px 0px 0px 0px;
                background-color: #f7f7f7;
                width: 100%;
                position: fixed;
                top: 0;
                left: -110%;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                flex-direction: column-reverse;
                justify-content: flex-end;
                -webkit-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                -moz-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                -o-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper.active {
                left: 0;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu-container {
                overflow-y: scroll;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-nav-identity-panel {
                padding: 10px 0px 10px 0px;
                display: block;
                position: relative;
                z-index: 5;
                width: 100%;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title {
                display: inline-block;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu {
                display: block;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu, 
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu > ul {
                display: block;
                overflow-y: auto;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i,
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg {
                margin-left: auto;
                padding: 4px 15px;
                border: 1px solid var(--guten-border-color);
                border-radius: 3px;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu {
                position: inherit;
                box-shadow: none!important;
                background: none;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li {
                display: block;
                width: 100%;
                position: inherit;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li .sub-menu {
                display: none;
                max-height: 2500px;
                opacity: 0;
                visibility: hidden;
                transition: max-height 5s ease-out;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li .sub-menu.dropdown-open {
                display: block;
                opacity: 1;
                visibility: visible;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li a {
                display: block;
            }
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li a i, .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu li a .gutenverse-icon-svg {
                float: right;
            }
            .guten-nav-menu.break-point-tablet .guten-nav-overlay {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.2);
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 999;
                transform: translateX(-100%);
                transition: transform 0s ease-in-out;
            }
            .guten-nav-menu.break-point-tablet .guten-nav-overlay.active {
                animation: slideLeftToRight .5s ease-in-out forwards;
                transition: transform .5s ease-in-out;
            }
            .guten-nav-menu.break-point-tablet .guten-nav-overlay.exiting {
                animation: slideRightToLeft .5s ease-in-out forwards;
                transition: transform .5s ease-in-out;
            }
        }

        @media screen and (min-width: ${smMax}px) {
            .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper .gutenverse-menu-container {
                height: auto;
            }
        }

        @media screen and (max-width: ${smMin}px) {
            .guten-nav-menu.break-point-mobile .gutenverse-hamburger-menu {
                display: block;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper {
                width: 100%;
                max-width: 360px;
                border-radius: 0px 0px 0px 0px;
                background-color: #f7f7f7;
                position: fixed;
                top: 0;
                left: -110%;
                height: 100% !important;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                flex-direction: column-reverse;
                justify-content: flex-end;
                -webkit-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                -moz-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                -o-transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
                transition: left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53);
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper.active {
                left: 0;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu-container {
                overflow-y: scroll;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-nav-identity-panel {
                padding: 10px 0px 10px 0px;
                display: block;
                position: relative;
                z-index: 5;
                width: 100%;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title {
                display: inline-block;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu {
                display: block;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu, 
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu > ul {
                display: block;
                overflow-y: auto;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i,
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg {
                margin-left: auto;
                padding: 4px 15px;
                border: 1px solid var(--guten-border-color);
                border-radius: 3px;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu {
                position: inherit;
                box-shadow: none;
                background: none;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li {
                display: block;
                width: 100%;
                position: inherit;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li .sub-menu {
                display: none;
                max-height: 2500px;
                opacity: 0;
                visibility: hidden;
                transition: max-height 5s ease-out;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li .sub-menu.dropdown-open {
                display: block;
                opacity: 1;
                visibility: visible;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li a {
                display: block;
            }
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li a i, .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu li a .gutenverse-icon-svg {
                float: right;
            }
            .guten-nav-menu.break-point-mobile .guten-nav-overlay {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.2);
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 999;
                transform: translateX(-100%);
                transition: transform 0s ease-in-out;
            }
            .guten-nav-menu.break-point-mobile .guten-nav-overlay.active {
                animation: slideLeftToRight .5s ease-in-out forwards;
                transition: transform .5s ease-in-out;
            }
            .guten-nav-menu.break-point-mobile .guten-nav-overlay.exiting {
                animation: slideRightToLeft .5s ease-in-out forwards;
                transition: transform .5s ease-in-out;
            }
        }

        @media screen and (min-width: ${xsMax}px) {
            .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper .gutenverse-menu-container {
                height: auto;
            }
        }`);
    }, []);

    useEffect(() => {
        let active = true;

        setError(false);
        if (!isOnEditor()) {
            setMenu('<ul class="gutenverse-menu"><li class="page_item"><a href="#">Menu 1</a></li><li class="page_item"><a href="#">Menu 2</a></li><li class="menu-item"><a href="#">Menu 3</a></li></ul>');
            setLoading(false);
            return () => { active = false; };
        }

        setLoading(true);
        apiFetch({
            path: addQueryArgs('/gutenverse-client/v1/menu/render', { menu: menuId || 0, container: false }),
        }).then((html) => {
            if (active) {
                setMenu(typeof html === 'string' ? html : '');
            }
        }).catch(() => {
            if (active) {
                setError(true);
            }
        }).finally(() => {
            if (active) {
                setLoading(false);
            }
        });

        return () => { active = false; };
    }, [menuId]);

    const blockProps = useBlockProps({
        ref: elementRef,
        className: classnames(
            'guten-element',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType?.toLowerCase(),
            `${breakpoint}-breakpoint`,
        ),
        ['data-item-indicator']: submenuItemIndicator,
        ['data-item-indicator-type']: submenuItemIndicatorType,
        ['data-item-indicator-svg']: submenuItemIndicatorSVG,
    });

    useInitializeIconToSvg({
        elementId,
        attributes,
        setAttributes,
        icons: [
            { type: 'mobileIconType', svg: 'mobileIconSVG' },
            { type: 'mobileCloseIconType', svg: 'mobileCloseIconSVG' },
            { type: 'submenuItemIndicatorType', svg: 'submenuItemIndicatorSVG' },
        ],
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <ResponsiveStyles />
        <div {...blockProps}>
            {loading ? <NavSkeleton /> : error ? <p role="alert">{__('Unable to load the menu.', 'gutenverse')}</p> : <NavMenuPreview
                attributes={attributes}
                menu={menu}
                animationClass={animationClass}
                displayClass={displayClass}
                deviceType={deviceType}
            />}
        </div>
    </>;
});

export default NavMenuBlock;