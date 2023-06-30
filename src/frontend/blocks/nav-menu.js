import u from 'umbrellajs';
import { Default } from 'gutenverse-core/frontend';

class GutenverseNavMenu extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._init(element);
        });
    }

    /* private */
    _init(element) {
        const wrapper = u(element);
        const item = {
            wrapper: wrapper,
            openToggle: wrapper.find('.gutenverse-hamburger-menu'),
            closeToggle: wrapper.find('.gutenverse-close-menu'),
            container: wrapper.find('.gutenverse-menu-wrapper'),
            menuDropdown: wrapper.find('li.menu-item-has-children > a'),
            singleMenu: wrapper.find('li.menu-item:not(.menu-item-has-children)'),
        };

        this._firstLoad(item);
    }

    _firstLoad(item) {
        this._addBodyClass();
        this._addDropdownIcon(item);
        this._toggleMenu(item);
    }

    _addBodyClass() {
        u('html').addClass('gutenverse-nav-menu-loaded');
    }

    _addDropdownIcon(item) {
        const indicator = item.wrapper.data('item-indicator');
        item.menuDropdown.each(node => {
            u(node).find('i').remove();
            u(node).append(`<i class='${indicator}'></i>`);
        });
    }

    _toggleMenu(item) {
        item.openToggle.on('click', function () {
            if (item.container.hasClass('active')) {
                item.container.removeClass('active');
            } else {
                item.container.addClass('active');
            }
        });

        item.closeToggle.on('click', function () {
            item.container.removeClass('active');
        });

        if (item.wrapper.hasClass('submenu-click-title')) {
            item.menuDropdown.on('click', function (e) {
                e.preventDefault();
                const submenu = u(this).siblings('.sub-menu');

                if (submenu.hasClass('dropdown-open')) {
                    submenu.removeClass('dropdown-open');
                } else {
                    submenu.addClass('dropdown-open');
                }
            });
        } else {
            const dropdownToggle = item.wrapper.find('li.menu-item-has-children > a i');
            dropdownToggle.on('click', function (e) {
                e.preventDefault();
                const submenu = u(this).parent('a').siblings('.sub-menu');
                if (submenu.hasClass('dropdown-open')) {
                    submenu.removeClass('dropdown-open');
                } else {
                    submenu.addClass('dropdown-open');
                }
            });
        }

        if ( parseInt( item.wrapper.data('close-on-click') ) === 1 ) {
            item.singleMenu.on('click', function () {
                item.container.removeClass('active');
            });
        }
    }
}
export default GutenverseNavMenu;