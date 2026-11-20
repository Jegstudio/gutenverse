import { createPortal, renderToString, useEffect, useRef, useState } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { classnames } from 'gutenverse-core/components';
import { renderIcon } from 'gutenverse-core/helper';

const NavMenuPreview = ({ clientId, attributes, menu, animationClass, displayClass, deviceType }) => {
    const { selectBlock } = useDispatch(blockEditorStore);
    const { getSelectedBlockClientId } = useSelect(blockEditorStore);
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
    const hamburgerRef = useRef();
    const menuRef = useRef();
    const lastPortalTarget = useRef(null);
    const [portalTarget, setPortalTarget] = useState(null);
    const [open, setOpen] = useState(false);
    const [exiting, setExiting] = useState(false);
    const logo = mobileMenuLogo?.media?.sizes?.[mobileMenuLogo?.size];
    const navClasses = classnames('guten-element', 'guten-nav-menu', 'nav-menu', `break-point-${breakpoint}`, mobileSubmenuClick ? 'submenu-click-title' : 'submenu-click-icon', className);

    useEffect(() => {
        const hamburger = hamburgerRef.current;
        const canvas = hamburger?.ownerDocument;
        const view = canvas?.defaultView;
        if (!view) return;

        // Use the same responsive CSS as the preview, including custom breakpoints.
        const observer = new view.ResizeObserver(() => {
            const target = hamburger.getClientRects().length ? canvas.body : null;
            if (lastPortalTarget.current === target) return;

            lastPortalTarget.current = target;
            setPortalTarget(target);
        });
        observer.observe(hamburger);
        return () => observer.disconnect();
    }, []);

    // As on the frontend, add the selected indicator after WordPress renders the items.
    useEffect(() => {
        const icon = renderToString(renderIcon(submenuItemIndicator, submenuItemIndicatorType, submenuItemIndicatorSVG));
        menuRef.current?.querySelectorAll('li.menu-item-has-children > a').forEach(link => {
            link.querySelectorAll('i, svg, .gutenverse-icon-svg').forEach(node => node.remove());
            link.insertAdjacentHTML('beforeend', icon);
        });
    }, [menu, submenuItemIndicator, submenuItemIndicatorType, submenuItemIndicatorSVG, portalTarget]);

    useEffect(() => {
        setOpen(false);
        setExiting(false);
    }, [menuId, breakpoint, deviceType, portalTarget]);

    useEffect(() => {
        if (portalTarget) return;

        const element = elementRef.current;
        const view = element?.ownerDocument.defaultView;
        if (!view) return;

        menuRef.current?.querySelectorAll('li.menu-item-has-children .sub-menu').forEach(submenu => {
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
    }, [menu, deviceType, breakpoint, portalTarget]);

    const closeMenu = () => {
        setOpen(false);
        setExiting(true);
    };

    const handleClick = event => {
        // Portal clicks bubble here without passing through the block's DOM.
        if (getSelectedBlockClientId() !== clientId) {
            selectBlock(clientId, null);
        }

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

    const drawer = <>
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
    </>;

    return <div
        ref={elementRef}
        id={elementId}
        className={classnames(navClasses, displayClass, animationClass)}
        data-item-indicator={submenuItemIndicator}
        data-item-indicator-type={submenuItemIndicatorType || 'icon'}
        data-item-indicator-svg={submenuItemIndicatorSVG || ''}
        data-close-on-click={mobileCloseOnClick ? '1' : ''}
        onClick={handleClick}
    >
        <div className="gutenverse-hamburger-wrapper">
            <button ref={hamburgerRef} className="gutenverse-hamburger-menu">
                {renderIcon(mobileIcon, mobileIconType, mobileIconSVG, true)}
            </button>
        </div>
        {portalTarget ? createPortal(
            // Keep per-block style selectors working outside the transformed Section.
            <div className={classnames(elementId, 'guten-element', 'wp-block-gutenverse-nav-menu', deviceType?.toLowerCase(), `${breakpoint}-breakpoint`)} style={{ display: 'contents' }}>
                <div className={navClasses} style={{ display: 'contents' }}>
                    {drawer}
                </div>
            </div>,
            portalTarget
        ) : drawer}
    </div>;
};

export default NavMenuPreview;
