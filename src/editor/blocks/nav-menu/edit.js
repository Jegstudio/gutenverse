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
import { NavSkeleton, classnames } from 'gutenverse-core/components';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const NavMenuBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
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
                            <li class="page_item"><a href="javascript:void(0);">Menu 1</a></li>
                            <li class="page_item"><a href="javascript:void(0);">Menu 2</a></li>
                            <li class="menu-item"><a href="javascript:void(0);">Menu 3<i class="gtn gtn-angle-down-solid"></i></a></li>
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

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            {!loading && response ? <RawHTML key="html">
                {response}
            </RawHTML> : <NavSkeleton />}
        </div>
    </>;
});

export default NavMenuBlock;