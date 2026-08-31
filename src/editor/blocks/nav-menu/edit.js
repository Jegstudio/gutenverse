import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useRef } from '@wordpress/element';
import { RawHTML } from '@wordpress/element';
import GutenverseNavMenu from '../../../frontend/blocks/nav-menu';
import { Helmet, NavSkeleton, classnames } from 'gutenverse-core/components';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor, responsiveBreakpoint } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

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
        mobileMenuLogo,
        mobileMenuLink,
        mobileMenuURL,
        mobileIcon,
        mobileIconType,
        mobileIconSVG,
        mobileCloseIcon,
        mobileCloseIconType,
        mobileCloseIconSVG,
        submenuClick,
        mobileSubmenuClick,
        mobileCloseOnClick,
        submenuItemIndicator,
        submenuItemIndicatorType,
        submenuItemIndicatorSVG,
        transform,
        mobileEnableOverlay,
        hamburgerAriaLabel,
        mobileLogoAriaLabel,
        closeAriaLabel,
        mobileMenuLogoLazyLoad,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const isStillMounted = useRef();
    const elementRef = useRef();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responsiveStyle, setResponsiveStyle] = useState('');

    const removeClick = () => {
        if (elementRef.current) {
            setTimeout(() => {
                const refElement = elementRef.current.querySelectorAll('.gutenverse-menu li');
                if (refElement) {
                    refElement.forEach(menu => {
                        menu.querySelector('a').addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    });
                }
            }, 1);
        }
    };

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
        if (isOnEditor()) {
            setLoading(true);
            apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/nav-menu', {
                    context: 'edit',
                    attributes: {
                        elementId,
                        menuId,
                        breakpoint,
                        mobileMenuLogo,
                        mobileMenuLink,
                        mobileMenuURL,
                        mobileIcon,
                        mobileIconType,
                        mobileIconSVG,
                        mobileCloseIcon,
                        mobileCloseIconType,
                        mobileCloseIconSVG,
                        submenuClick,
                        mobileSubmenuClick,
                        mobileCloseOnClick,
                        submenuItemIndicator,
                        submenuItemIndicatorType,
                        submenuItemIndicatorSVG,
                        transform,
                        mobileEnableOverlay,
                        hamburgerAriaLabel,
                        mobileLogoAriaLabel,
                        closeAriaLabel,
                        mobileMenuLogoLazyLoad,
                    },
                }),
            }).then((data) => {
                setResponse(data.rendered);
                removeClick();
            }).catch(() => {
                setResponse('<h1>Error</h1>');
            }).finally(() => setLoading(false));
        } else {
            setResponse(`<div id="${elementId}" class="guten-element guten-nav-menu nav-menu break-point-tablet submenu-click-title " data-item-indicator="gtn gtn-angle-down-solid" data-close-on-click="1">
                <div class="gutenverse-hamburger-wrapper">
                    <button class="gutenverse-hamburger-menu" aria-label="${hamburgerAriaLabel ? hamburgerAriaLabel : 'Open Navigation Menu'}">
                        <i aria-hidden="true" class="gtn gtn-burger-menu-light"></i>
                    </button>
                </div>
                <div class="gutenverse-menu-wrapper">
                    <div class="gutenverse-menu">
                        <ul>
                            <li class="page_item"><a href="#">Menu 1</a></li>
                            <li class="page_item"><a href="#">Menu 2</a></li>
                            <li class="menu-item"><a href="#">Menu 3<i class="gtn gtn-angle-down-solid"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>`);
            setLoading(false);
        }
    }, [
        menuId,
        breakpoint,
        mobileMenuLogo,
        mobileMenuLink,
        mobileMenuURL,
        mobileIcon,
        mobileIconType,
        mobileIconSVG,
        mobileCloseIcon,
        mobileCloseIconType,
        mobileCloseIconSVG,
        submenuClick,
        mobileSubmenuClick,
        mobileCloseOnClick,
        submenuItemIndicator,
        submenuItemIndicatorType,
        submenuItemIndicatorSVG,
        transform,
        mobileEnableOverlay,
        mobileMenuLogoLazyLoad,
    ]);

    useEffect(() => {
        setTimeout(() => {
            const refElement = elementRef.current;
            if (refElement) {
                refElement.classList.add('injected');
                new GutenverseNavMenu([elementRef.current]);
            }
        }, 1000);
    }, [response, elementRef]);

    useEffect(() => {
        isStillMounted.current = true;

        return () => {
            isStillMounted.current = false;
        };
    }, []);

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
            {!loading && response ? <RawHTML key="html">
                {response}
            </RawHTML> : <NavSkeleton />}
        </div>
    </>;
});

export default NavMenuBlock;