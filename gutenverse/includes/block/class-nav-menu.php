<?php
/**
 * Nav Menu Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Nav Menu Block
 *
 * @package gutenverse\block
 */
class Nav_Menu extends Block_Abstract {
	/**
	 * Render Content
	 *
	 * @param boolean $remove_link : Flag to remove link.
	 *
	 * @return string
	 */
	public function render_content( $remove_link = false ) {
		$element_id           = $this->get_element_id();
		$menu_breakpoint      = esc_attr( $this->attributes['breakpoint'] );
		$mobile_menu_icon     = esc_attr( $this->attributes['mobileIcon'] );
		$mobile_close_icon    = esc_attr( $this->attributes['mobileCloseIcon'] );
		$enable_overlay       = esc_attr( $this->attributes['mobileEnableOverlay'] );
		$mobile_logo          = isset( $this->attributes['mobileMenuLogo'] ) ? $this->attributes['mobileMenuLogo'] : null;
		$mobile_logo_load     = isset( $this->attributes['mobileMenuLogoLazyLoad'] ) ? $this->attributes['mobileMenuLogoLazyLoad'] : false;
		$mobile_logo_image    = $this->render_image( $mobile_logo, $mobile_logo_load );
		$submenu_click        = $this->attributes['mobileSubmenuClick'] ? 'submenu-click-title' : 'submenu-click-icon';
		$closeon_click        = $this->attributes['mobileCloseOnClick'];
		$item_indicator       = esc_attr( $this->attributes['submenuItemIndicator'] );
		$menu_link            = esc_attr( $this->attributes['mobileMenuLink'] );
		$menu_url             = 'home' === $menu_link ? home_url() : esc_url( $this->attributes['mobileMenuURL'] );
		$mobile_close_icon    = esc_attr( $this->attributes['mobileCloseIcon'] );
		$custom_classes       = $this->get_custom_classes();
		$display_classes      = $this->set_display_classes();
		$animation_class      = $this->set_animation_classes();
		$menu                 = gutenverse_get_menu( $this->attributes['menuId'] );
		$close_aria_label     = isset( $this->attributes['closeAriaLabel'] ) ? esc_attr( $this->attributes['closeAriaLabel'] ) : false;
		$hamburger_aria_label = isset( $this->attributes['hamburgerAriaLabel'] ) ? esc_attr( $this->attributes['hamburgerAriaLabel'] ) : false;
		$logo_aria_label      = isset( $this->attributes['mobileLogoAriaLabel'] ) ? esc_attr( $this->attributes['mobileLogoAriaLabel'] ) : false;

		$mobile_icon_type       = isset( $this->attributes['mobileIconType'] ) ? $this->attributes['mobileIconType'] : 'icon';
		$mobile_icon_svg        = isset( $this->attributes['mobileIconSVG'] ) ? $this->attributes['mobileIconSVG'] : array();
		$mobile_close_icon_type = isset( $this->attributes['mobileCloseIconType'] ) ? $this->attributes['mobileCloseIconType'] : 'icon';
		$mobile_close_icon_svg  = isset( $this->attributes['mobileCloseIconSVG'] ) ? $this->attributes['mobileCloseIconSVG'] : array();

		$hamburger_icon_html = $this->render_icon( $mobile_icon_type, $mobile_menu_icon, $mobile_icon_svg );
		$close_icon_html     = $this->render_icon( $mobile_close_icon_type, $mobile_close_icon, $mobile_close_icon_svg );

		// Handle submenu indicator SVG.
		$submenu_indicator_type        = isset( $this->attributes['submenuItemIndicatorType'] ) ? $this->attributes['submenuItemIndicatorType'] : 'icon';
		$submenu_indicator_svg_encoded = isset( $this->attributes['submenuItemIndicatorSVG'] ) ? $this->attributes['submenuItemIndicatorSVG'] : '';

		if ( $remove_link ) {
			$menu = str_replace( 'href', 'href="javascript:void(0);" data-href', $menu );
		}

		$overlay = '';
		if ( $enable_overlay ) {
			$overlay = '<div class="guten-nav-overlay"></div>';
		}

		return '<div id="' . $element_id . '" class="guten-element guten-nav-menu nav-menu break-point-' . $menu_breakpoint . ' ' . $submenu_click . $display_classes . $animation_class . $custom_classes . '" data-item-indicator="' . $item_indicator . '" data-item-indicator-type="' . esc_attr( $submenu_indicator_type ) . '" data-item-indicator-svg="' . esc_attr( $submenu_indicator_svg_encoded ) . '" data-close-on-click="' . $closeon_click . '">
			<div class="gutenverse-hamburger-wrapper">
				<button class="gutenverse-hamburger-menu" aria-label="' . $hamburger_aria_label . '">
				' . $hamburger_icon_html . '
				</button>
			</div>
			' . $overlay . '
			<div class="gutenverse-menu-wrapper">' . $menu . '
				<div>
					<div class="gutenverse-nav-identity-panel">
						<div class="gutenverse-nav-site-title">
							<a aria-label="' . $logo_aria_label . '" href="' . $menu_url . '" class="gutenverse-nav-logo">' . $mobile_logo_image . '</a>
						</div>
						<button class="gutenverse-close-menu" aria-label="' . $close_aria_label . '">' . $close_icon_html . '</button>
					</div>
				</div>
			</div>
		</div>';
	}

	/**
	 * Render Image
	 *
	 * @param array $image .
	 *
	 * @return string
	 */
	public function render_image( $image, $lazy = false ) {
		if ( $image ) {
			$media    = $image['media'];
			$size     = $image['size'];
			$image_id = $media['imageId'];
			$alt      = get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' );

			$attachment = wp_get_attachment_image_src( $image_id, $size );
			$src        = '';
			$width      = '';
			$height     = '';
			$loading    = $lazy ? 'lazy' : 'eager';

			if ( ! empty( $media['sizes'][ $size ]['url'] ) ) {
				$src = $media['sizes'][ $size ]['url'];
				if ( ! empty( $media['sizes'][ $size ]['width'] ) ) {
					$width = $media['sizes'][ $size ]['width'];
				}
				if ( ! empty( $media['sizes'][ $size ]['height'] ) ) {
					$height = $media['sizes'][ $size ]['height'];
				}
			}

			if ( ! empty( $attachment ) && ! empty( $media['sizes'][ $size ]['url'] ) && $attachment[0] === $media['sizes'][ $size ]['url'] ) {
				$src    = $attachment[0];
				$width  = $attachment[1];
				$height = $attachment[2];
			}

			return '<img loading="' . $loading . '" src="' . esc_url( $src ) . '" alt="' . $alt . '" width="' . esc_attr( $width ) . '" height="' . esc_attr( $height ) . '">';
		} else {
			return null;
		}
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( true );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
