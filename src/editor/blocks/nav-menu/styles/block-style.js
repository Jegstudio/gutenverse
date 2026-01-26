import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({
        attributes,
        data,
        backgroundSelector: `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
        backgroundHoverSelector: `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu:hover`,
    });
    const device = getDeviceType();

    //panel content
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
        ],
        'responsive': true,
    });

    //panel menu wrapper
    isNotEmpty(attributes['menuHeight']) && data.push({
        'type': 'plain',
        'id': 'menuHeight',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['menuBackground']) && data.push({
        'type': 'background',
        'id': 'menuBackground',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper`,
    });

    isNotEmpty(attributes['mobileWrapperBackground']) && data.push({
        'type': 'color',
        'id': 'mobileWrapperBackground',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .break-point-mobile.guten-nav-menu .gutenverse-menu-wrapper, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .break-point-tablet.guten-nav-menu .gutenverse-menu-wrapper`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['menuPadding']) && data.push({
        'type': 'dimension',
        'id': 'menuPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper`,
    });

    isNotEmpty(attributes['menuMargin']) && data.push({
        'type': 'dimension',
        'id': 'menuMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper > div`,
    });

    isNotEmpty(attributes['menuRadius']) && data.push({
        'type': 'dimension',
        'id': 'menuRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper`,
    });

    isNotEmpty(attributes['menuBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'menuBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper`,
    });

    //panel item style
    isNotEmpty(attributes['itemTypography']) && data.push({
        'type': 'typography',
        'id': 'itemTypography',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
    });

    isNotEmpty(attributes['itemSpacing']) && data.push({
        'type': 'dimension',
        'id': 'itemSpacing',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
    });

    isNotEmpty(attributes['itemMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
    });

    isNotEmpty(attributes['itemTextNormalColor']) && data.push({
        'type': 'color',
        'id': 'itemTextNormalColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemTextNormalBg']) && data.push({
        'type': 'background',
        'id': 'itemTextNormalBg',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
    });

    isNotEmpty(attributes['itemTextHoverColor']) && data.push({
        'type': 'color',
        'id': 'itemTextHoverColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemTextHoverBg']) && data.push({
        'type': 'background',
        'id': 'itemTextHoverBg',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
    });

    isNotEmpty(attributes['itemTextActiveColor']) && data.push({
        'type': 'color',
        'id': 'itemTextActiveColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemTextActiveBg']) && data.push({
        'type': 'background',
        'id': 'itemTextActiveBg',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
    });

    isNotEmpty(attributes['itemMenuBorderNormal']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemMenuBorderNormal',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
    });

    isNotEmpty(attributes['itemMenuBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemMenuBorderHover',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
    });

    isNotEmpty(attributes['itemMenuBorderActive']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemMenuBorderActive',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
    });

    //panel submenu style
    isNotEmpty(attributes['SubmenuIndicatorSize']) && data.push({
        'type': 'plain',
        'id': 'SubmenuIndicatorSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a > i, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a > i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['SubmenuIndicatorSize']) && data.push({
        'type': 'plain',
        'id': 'SubmenuIndicatorSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a .gutenverse-icon-svg, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['submenuIndicatorPadding']) && data.push({
        'type': 'dimension',
        'id': 'submenuIndicatorPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i, .${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg`,
    });

    isNotEmpty(attributes['submenuIndicatorMargin']) && data.push({
        'type': 'dimension',
        'id': 'submenuIndicatorMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i, .${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg`,
    });

    isNotEmpty(attributes['submenuIndicatorBorder']) && data.push({
        'type': 'border',
        'id': 'submenuIndicatorBorder',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i, .${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg`,
    });

    isNotEmpty(attributes['submenuIndicatorBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'submenuIndicatorBorderResponsive',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i, .${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg`,
    });

    isNotEmpty(attributes['submenuTypography']) && data.push({
        'type': 'typography',
        'id': 'submenuTypography',
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a`,
    });

    isNotEmpty(attributes['submenuSpacing']) && data.push({
        'type': 'dimension',
        'id': 'submenuSpacing',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a`,
    });

    isNotEmpty(attributes['submenuMargin']) && data.push({
        'type': 'dimension',
        'id': 'submenuMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a`,
    });

    isNotEmpty(attributes['submenuTextNormalColor']) && data.push({
        'type': 'color',
        'id': 'submenuTextNormalColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuTextNormalBg']) && data.push({
        'type': 'background',
        'id': 'submenuTextNormalBg',
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
    });

    isNotEmpty(attributes['submenuTextHoverColor']) && data.push({
        'type': 'color',
        'id': 'submenuTextHoverColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorHoverColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorHoverColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a > i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorHoverColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorHoverColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuTextNormalBg']) && data.push({
        'id': 'submenuTextHoverBg',
        'type': 'background',
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
    });

    isNotEmpty(attributes['submenuTextActiveColor']) && data.push({
        'type': 'color',
        'id': 'submenuTextActiveColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorActiveColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorActiveColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a > i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuIndicatorActiveColor']) && data.push({
        'type': 'color',
        'id': 'submenuIndicatorActiveColor',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['submenuTextActiveBg']) && data.push({
        'type': 'background',
        'id': 'submenuTextActiveBg',
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
    });

    isNotEmpty(attributes['submenuItemBorder']) && data.push({
        'type': 'border',
        'id': 'submenuItemBorder',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
    });

    isNotEmpty(attributes['submenuItemBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'submenuItemBorderResponsive',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
    });

    isNotEmpty(attributes['submenuFirstItemBorder']) && data.push({
        'type': 'border',
        'id': 'submenuFirstItemBorder',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a`,
    });

    isNotEmpty(attributes['submenuFirstItemBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'submenuFirstItemBorderResponsive',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a`,
    });

    isNotEmpty(attributes['submenuLastItemBorder']) && data.push({
        'type': 'border',
        'id': 'submenuLastItemBorder',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a`,
    });

    isNotEmpty(attributes['submenuLastItemBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'submenuLastItemBorderResponsive',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a`,
    });

    //panel submenu panel
    isNotEmpty(attributes['submenuPanelPadding']) && data.push({
        'type': 'dimension',
        'id': 'submenuPanelPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    isNotEmpty(attributes['submenuPanelMargin']) && data.push({
        'type': 'dimension',
        'id': 'submenuPanelMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    isNotEmpty(attributes['submenuPanelBorder']) && data.push({
        'type': 'border',
        'id': 'submenuPanelBorder',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    isNotEmpty(attributes['submenuPanelBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'id': 'submenuPanelBorderResponsive',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    isNotEmpty(attributes['submenuPanelBackground']) && data.push({
        'type': 'background',
        'id': 'submenuPanelBackground',
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    isNotEmpty(attributes['submenuPanelWidth']) && data.push({
        'type': 'plain',
        'id': 'submenuPanelWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['submenuPanelShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'submenuPanelShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
    });

    //panel hamburger style
    isNotEmpty(attributes['hamburgerAlignment']) && data.push({
        'type': 'plain',
        'id': 'hamburgerAlignment',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-hamburger-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
        ],
    });

    isNotEmpty(attributes['hamburgerWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'hamburgerWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['hamburgerSize']) && data.push({
        'type': 'plain',
        'id': 'hamburgerSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['hamburgerSize']) && data.push({
        'type': 'plain',
        'id': 'hamburgerSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['hamburgerPadding']) && data.push({
        'type': 'dimension',
        'id': 'hamburgerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
    });

    isNotEmpty(attributes['hamburgerMargin']) && data.push({
        'type': 'dimension',
        'id': 'hamburgerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
    });

    isNotEmpty(attributes['hamburgerColorNormal']) && data.push({
        'type': 'color',
        'id': 'hamburgerColorNormal',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hamburgerColorNormal']) && data.push({
        'type': 'color',
        'id': 'hamburgerColorNormal',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hamburgerBgNormal']) && data.push({
        'type': 'background',
        'id': 'hamburgerBgNormal',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
    });

    isNotEmpty(attributes['hamburgerBorderNormal']) && data.push({
        'type': 'border',
        'id': 'hamburgerBorderNormal',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
    });

    isNotEmpty(attributes['hamburgerBorderNormalResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'hamburgerBorderNormalResponsive',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
    });

    isNotEmpty(attributes['hamburgerColorHover']) && data.push({
        'type': 'color',
        'id': 'hamburgerColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hamburgerColorHover']) && data.push({
        'type': 'color',
        'id': 'hamburgerColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hamburgerBgHover']) && data.push({
        'type': 'background',
        'id': 'hamburgerBgHover',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
    });

    isNotEmpty(attributes['hamburgerBorderHover']) && data.push({
        'type': 'border',
        'id': 'hamburgerBorderHover',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
    });

    isNotEmpty(attributes['hamburgerBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'hamburgerBorderHoverResponsive',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
    });

    isNotEmpty(attributes['closeWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'closeWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['closeSize']) && data.push({
        'type': 'plain',
        'id': 'closeSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['closeSize']) && data.push({
        'type': 'plain',
        'id': 'closeSize',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['closePadding']) && data.push({
        'type': 'dimension',
        'id': 'closePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
    });

    isNotEmpty(attributes['closeMargin']) && data.push({
        'type': 'dimension',
        'id': 'closeMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
    });

    isNotEmpty(attributes['closeColorNormal']) && data.push({
        'type': 'color',
        'id': 'closeColorNormal',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeColorNormal']) && data.push({
        'type': 'color',
        'id': 'closeColorNormal',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeBgNormal']) && data.push({
        'type': 'background',
        'id': 'closeBgNormal',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
    });

    isNotEmpty(attributes['closeBorderNormal']) && data.push({
        'type': 'border',
        'id': 'closeBorderNormal',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
    });

    isNotEmpty(attributes['closeBorderNormalResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'closeBorderNormalResponsive',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
    });

    isNotEmpty(attributes['closeColorHover']) && data.push({
        'type': 'color',
        'id': 'closeColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeColorHover']) && data.push({
        'type': 'color',
        'id': 'closeColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeBgHover']) && data.push({
        'type': 'background',
        'id': 'closeBgHover',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
    });

    isNotEmpty(attributes['closeBorderHover']) && data.push({
        'type': 'border',
        'id': 'closeBorderHover',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
    });

    isNotEmpty(attributes['closeBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'closeBorderHoverResponsive',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
    });

    //panel mobile style
    isNotEmpty(attributes['mobileLogoWidth']) && data.push({
        'type': 'plain',
        'id': 'mobileLogoWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['mobileLogoHeight']) && data.push({
        'type': 'plain',
        'id': 'mobileLogoHeight',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['mobileLogoFit']) && data.push({
        'type': 'plain',
        'id': 'mobileLogoFit',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['mobileMenuMargin']) && data.push({
        'type': 'dimension',
        'id': 'mobileMenuMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo`,
    });

    isNotEmpty(attributes['mobileMenuPadding']) && data.push({
        'type': 'dimension',
        'id': 'mobileMenuPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo`,
    });

    //panel overlay
    isNotEmpty(attributes['overlayBackground']) && data.push({
        'type': 'background',
        'id': 'overlayBackground',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
    });

    isNotEmpty(attributes['overlayOpacity']) && data.push({
        'type': 'plain',
        'id': 'overlayOpacity',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': 'calc({value}/100)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['overlayPointer']) && data.push({
        'type': 'plain',
        'id': 'overlayPointer',
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
        'properties': [
            {
                'name': 'pointer-events',
                'valueType': 'pattern',
                'pattern': '{value} !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['overlayBlur']) && data.push({
        'type': 'plain',
        'id': 'overlayBlur',
        'responsive': true,
        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
        'properties': [
            {
                'name': '-webkit-backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    /**Panel List */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.wp-block-gutenverse-nav-menu`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}.guten-element`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}.guten-element`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.${elementId}.guten-element`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-element`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.${elementId}.guten-element`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.nav-menu.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;