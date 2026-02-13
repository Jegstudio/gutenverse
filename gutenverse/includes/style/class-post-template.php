<?php
/**
 * Post Template Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post Template
 *
 * @package gutenverse\style
 */
class Post_Template extends Style_Abstract {
    /**
     * Block Directory
     *
     * @var string
     */
    protected $block_dir = GUTENVERSE_DIR . '/block/';

    /**
     * Block Name
     *
     * @var array
     */
    protected $name = 'post-template';

    /**
     * Constructor
     *
     * @param array $attrs Attribute.
     */
    public function __construct( $attrs ) {
        parent::__construct( $attrs );

        $this->set_feature(
            array(
                'background'  => null,
                'border'      => null,
                'positioning' => null,
                'animation'   => null,
                'advance'     => null,
                'mask'        => null,
                'typography'  => null,
            )
        );
    }

    /**
     * Generate style base on attribute.
     */
    public function generate() {
        $this->container_style();
    }

    /**
     * Container Style
     */
    public function container_style() {
        // Layout
        if ( isset( $this->attrs['containerLayout'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        if ( 'fluid' === $value ) {
                            return 'width: 100%;';
                        }
                        return '';
                    },
                    'value'          => $this->attrs['containerLayout'],
                    'device_control' => false,
                )
            );
        }

        // Width
        if ( isset( $this->attrs['containerWidth'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_unit_point( $value, 'width' );
                    },
                    'value'          => $this->attrs['containerWidth'],
                    'device_control' => true,
                )
            );
        }

        // Min Height
        if ( isset( $this->attrs['minHeight'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_unit_point( $value, 'min-height' );
                    },
                    'value'          => $this->attrs['minHeight'],
                    'device_control' => true,
                )
            );
        }

        // Flex Direction
        if ( isset( $this->attrs['flexDirection'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return "flex-direction: {$value};";
                    },
                    'value'          => $this->attrs['flexDirection'],
                    'device_control' => true,
                )
            );
        }

        // Justify Content
        if ( isset( $this->attrs['justifyContent'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return "justify-content: {$value};";
                    },
                    'value'          => $this->attrs['justifyContent'],
                    'device_control' => true,
                )
            );
        }

        // Align Items
        if ( isset( $this->attrs['alignItems'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return "align-items: {$value};";
                    },
                    'value'          => $this->attrs['alignItems'],
                    'device_control' => true,
                )
            );
        }

        // Column Gap
        if ( isset( $this->attrs['columnGap'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return $this->handle_unit_point( $value, 'column-gap' );
                    },
                    'value'          => $this->attrs['columnGap'],
                    'device_control' => true,
                )
            );
        }

        // Row Gap
        if ( isset( $this->attrs['rowGap'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return $this->handle_unit_point( $value, 'row-gap' );
                    },
                    'value'          => $this->attrs['rowGap'],
                    'device_control' => true,
                )
            );
        }

        // Flex Wrap
        if ( isset( $this->attrs['flexWrap'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return "flex-wrap: {$value};";
                    },
                    'value'          => $this->attrs['flexWrap'],
                    'device_control' => true,
                )
            );
        }

        // Align Content
        if ( isset( $this->attrs['alignContent'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} > .guten-inner-container",
                    'property'       => function ( $value ) {
                        return "align-content: {$value};";
                    },
                    'value'          => $this->attrs['alignContent'],
                    'device_control' => true,
                )
            );
        }

        // Overflow
        if ( isset( $this->attrs['overflow'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return "overflow: {$value};";
                    },
                    'value'          => $this->attrs['overflow'],
                    'device_control' => false,
                )
            );
        }

        // Background
        if ( isset( $this->attrs['background'] ) ) {
            $this->handle_background( ".{$this->element_id}", $this->attrs['background'] );
        }

        // Background Hover
        if ( isset( $this->attrs['backgroundHover'] ) ) {
            $this->handle_background( ".{$this->element_id}:hover", $this->attrs['backgroundHover'] );
        }

        // Background Overlay
        if ( isset( $this->attrs['backgroundOverlay'] ) ) {
            $this->handle_background( ".{$this->element_id} > .guten-background-overlay", $this->attrs['backgroundOverlay'] );
        }

        // Background Overlay Hover
        if ( isset( $this->attrs['backgroundOverlayHover'] ) ) {
            $this->handle_background( ".{$this->element_id}:hover > .guten-background-overlay", $this->attrs['backgroundOverlayHover'] );
        }

        // Border
        if ( isset( $this->attrs['border'] ) ) {
            $this->handle_border( 'border', ".{$this->element_id}" );
        }

        // Border Responsive
        if ( isset( $this->attrs['borderResponsive'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_border_responsive( $value );
                    },
                    'value'          => $this->attrs['borderResponsive'],
                    'device_control' => true,
                )
            );
        }

        // Border Hover
        if ( isset( $this->attrs['borderHover'] ) ) {
            $this->handle_border( 'borderHover', ".{$this->element_id}:hover" );
        }

        // Border Hover Responsive
        if ( isset( $this->attrs['borderHoverResponsive'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}:hover",
                    'property'       => function ( $value ) {
                        return $this->handle_border_responsive( $value );
                    },
                    'value'          => $this->attrs['borderHoverResponsive'],
                    'device_control' => true,
                )
            );
        }

        // Box Shadow
        if ( isset( $this->attrs['boxShadow'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_box_shadow( $value );
                    },
                    'value'          => $this->attrs['boxShadow'],
                    'device_control' => false,
                )
            );
        }

        // Box Shadow Hover
        if ( isset( $this->attrs['boxShadowHover'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}:hover",
                    'property'       => function ( $value ) {
                        return $this->handle_box_shadow( $value );
                    },
                    'value'          => $this->attrs['boxShadowHover'],
                    'device_control' => false,
                )
            );
        }

        // Padding
        if ( isset( $this->attrs['padding'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_dimension( $value, 'padding' );
                    },
                    'value'          => $this->attrs['padding'],
                    'device_control' => true,
                )
            );
        }

        // Margin
        if ( isset( $this->attrs['margin'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_dimension( $value, 'margin' );
                    },
                    'value'          => $this->attrs['margin'],
                    'device_control' => true,
                )
            );
        }

        // Z-Index
        if ( isset( $this->attrs['zIndex'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return "z-index: {$value};";
                    },
                    'value'          => $this->attrs['zIndex'],
                    'device_control' => true,
                )
            );
        }

        // Typography
        if ( isset( $this->attrs['typographyHeadingColor'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6",
                    'property'       => function ( $value ) {
                        return $this->handle_color( $value, 'color' );
                    },
                    'value'          => $this->attrs['typographyHeadingColor'],
                    'device_control' => false,
                )
            );
        }

        if ( isset( $this->attrs['typographyTextColor'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return $this->handle_color( $value, 'color' );
                    },
                    'value'          => $this->attrs['typographyTextColor'],
                    'device_control' => false,
                )
            );
        }

        if ( isset( $this->attrs['typographyLinkColor'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} a",
                    'property'       => function ( $value ) {
                        return $this->handle_color( $value, 'color' );
                    },
                    'value'          => $this->attrs['typographyLinkColor'],
                    'device_control' => false,
                )
            );
        }

        if ( isset( $this->attrs['typographyLinkHoverColor'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id} a:hover",
                    'property'       => function ( $value ) {
                        return $this->handle_color( $value, 'color' );
                    },
                    'value'          => $this->attrs['typographyLinkHoverColor'],
                    'device_control' => false,
                )
            );
        }

        if ( isset( $this->attrs['typographyTextAlign'] ) ) {
            $this->inject_style(
                array(
                    'selector'       => ".{$this->element_id}",
                    'property'       => function ( $value ) {
                        return "text-align: {$value};";
                    },
                    'value'          => $this->attrs['typographyTextAlign'],
                    'device_control' => true,
                )
            );
        }
    }
}
