import { renderToString, useEffect, useRef, useState } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';
import { renderIcon } from 'gutenverse-core/helper';

const NavMenuPreview = ({ attributes, menu, animationClass, displayClass, deviceType }) => {
    const {
        elementId,
        menuId,
        breakpoint,
        mobileMenuLogo,
        mobileMenuLogoLazyLoad,
        mobileIcon,
        mobileIconType,
        mobileIconSVG,
        mobileCloseIcon,
        mobileCloseIconType,
        mobileCloseIconSVG,
        mobileSubmenuClick,
        mobileCloseOnClick,
        submenuItemIndicator,
        submenuItemIndicatorType,
        submenuItemIndicatorSVG,
        mobileEnableOverlay,
        className,
    } = attributes;
    const elementRef = useRef();
    const menuRef = useRef();
    const [open, setOpen] = useState(false);
    const [exiting, setExiting] = useState(false);
    const logo = mobileMenuLogo?.media?.sizes?.[mobileMenuLogo?.size];

    // As on the frontend, add the selected indicator after WordPress renders the items.
    useEffect(() => {
        const icon = renderToString(renderIcon(submenuItemIndicator, submenuItemIndicatorType, submenuItemIndicatorSVG));
        menuRef.current?.querySelectorAll('li.menu-item-has-children > a').forEach(link => {
            link.querySelectorAll('i, svg, .gutenverse-icon-svg').forEach(node => node.remove());
            link.insertAdjacentHTML('beforeend', icon);
        });
    }, [menu, submenuItemIndicator, submenuItemIndicatorType, submenuItemIndicatorSVG]);

    useEffect(() => {
        setOpen(false);
        setExiting(false);
    }, [menuId, breakpoint, deviceType]);

    useEffect(() => {
        const element = elementRef.current;
        const view = element?.ownerDocument.defaultView;
        if (!view) return;

        element.querySelectorAll('li.menu-item-has-children .sub-menu').forEach(submenu => {
            submenu.style.removeProperty('left');
            submenu.style.removeProperty('right');
            if (submenu.getBoundingClientRect().right > view.innerWidth) {
                if (view.getComputedStyle(submenu).left === '0px') {
                    submenu.style.left = '-120%';
                } else {
                    submenu.style.left = 'auto';
                    submenu.style.right = '100%';
                }
            }
        });
    }, [menu, deviceType, breakpoint, open]);

    const closeMenu = () => {
        setOpen(false);
        setExiting(true);
    };

    const handleClick = event => {
        const target = event.target;
        const anchor = target.closest('a');
        if (anchor) event.preventDefault();

        if (target.closest('.gutenverse-hamburger-menu')) {
            event.preventDefault();
            setExiting(open);
            setOpen(!open);
        } else if (target.closest('.gutenverse-close-menu')) {
            event.preventDefault();
            closeMenu();
        } else if (anchor && anchor.closest('.gutenverse-menu')) {
            const item = anchor.parentElement;
            if (item.classList.contains('menu-item-has-children')) {
                const indicator = target.closest('i, .gutenverse-icon-svg');
                if (mobileSubmenuClick || indicator) {
                    const submenu = Array.from(item.children).find(child => child.classList.contains('sub-menu'));
                    submenu?.classList.toggle('dropdown-open');
                }
            } else if (mobileCloseOnClick) {
                closeMenu();
            }
        }
    };

    // Keep the frontend layout and classes for the editor preview.
    return <div
        ref={elementRef}
        id={elementId}
        className={classnames('guten-element', 'guten-nav-menu', 'nav-menu', `break-point-${breakpoint}`, mobileSubmenuClick ? 'submenu-click-title' : 'submenu-click-icon', displayClass, animationClass, className)}
        data-item-indicator={submenuItemIndicator}
        data-item-indicator-type={submenuItemIndicatorType || 'icon'}
        data-item-indicator-svg={submenuItemIndicatorSVG || ''}
        data-close-on-click={mobileCloseOnClick ? '1' : ''}
        onClick={handleClick}
    >
        <div className="gutenverse-hamburger-wrapper">
            <button className="gutenverse-hamburger-menu">
                {renderIcon(mobileIcon, mobileIconType, mobileIconSVG, true)}
            </button>
        </div>
        {mobileEnableOverlay && <div className={classnames('guten-nav-overlay', { active: open, exiting })} />}
        <div className={classnames('gutenverse-menu-wrapper', { active: open })}>
            <div
                ref={menuRef}
                className="gutenverse-menu-container"
                dangerouslySetInnerHTML={{ __html: menu }}
            />
            <div>
                <div className="gutenverse-nav-identity-panel">
                    <div className="gutenverse-nav-site-title">
                        <a className="gutenverse-nav-logo">
                            {mobileMenuLogo && <img
                                loading={mobileMenuLogoLazyLoad === true || mobileMenuLogoLazyLoad === 'lazy' ? 'lazy' : 'eager'}
                                src={logo?.url || ''}
                                width={logo?.width || ''}
                                height={logo?.height || ''}
                            />}
                        </a>
                    </div>
                    <button className="gutenverse-close-menu">
                        {renderIcon(mobileCloseIcon, mobileCloseIconType, mobileCloseIconSVG, true)}
                    </button>
                </div>
            </div>
        </div>
    </div>;
};

export default NavMenuPreview;
