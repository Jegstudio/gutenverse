<?php
/**
 * Divider Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Divider Block
 *
 * @package gutenverse\block
 */
class Divider extends Block_Abstract {

	/**
	 * Divider SVG patterns
	 *
	 * @var array
	 */
	private $divider_patterns = array(
		'curly'         => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpath d=%27M0,21c3.3,0,8.3-0.9,15.7-7.1c6.6-5.4,4.4-9.3,2.4-10.3c-3.4-1.8-7.7,1.3-7.3,8.8C11.2,20,17.1,21,24,21%27/%3E%3C/svg%3E')",
		'curved'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpath d=%27M0,6c6,0,6,13,12,13S18,6,24,6%27/%3E%3C/svg%3E')",
		'slashed'       => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 20 16%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cg transform=%27translate(-12.000000, 0)%27%3E%3Cpath d=%27M28,0L10,18%27/%3E%3Cpath d=%27M18,0L0,18%27/%3E%3Cpath d=%27M48,0L30,18%27/%3E%3Cpath d=%27M38,0L20,18%27/%3E%3C/g%3E%3C/svg%3E')",
		'squared'       => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpolyline points=%270,6 6,6 6,18 18,18 18,6 24,6 %27/%3E%3C/svg%3E')",
		'wavy'          => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpath d=%27M0,6c6,0,0.9,11.1,6.9,11.1S18,6,24,6%27/%3E%3C/svg%3E')",
		'zigzag'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpolyline points=%270,18 12,6 24,18 %27/%3E%3C/svg%3E')",
		'multiple'      => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M24,8v12H0V8H24z M24,4v1H0V4H24z%27/%3E%3C/svg%3E')",
		'arrows'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M14.2,4c0.3,0,0.5,0.1,0.7,0.3l7.9,7.2c0.2,0.2,0.3,0.4,0.3,0.7s-0.1,0.5-0.3,0.7l-7.9,7.2c-0.2,0.2-0.4,0.3-0.7,0.3s-0.5-0.1-0.7-0.3s-0.3-0.4-0.3-0.7l0-2.9l-11.5,0c-0.4,0-0.7-0.3-0.7-0.7V9.4C1,9,1.3,8.7,1.7,8.7l11.5,0l0-3.6c0-0.3,0.1-0.5,0.3-0.7S13.9,4,14.2,4z%27/%3E%3C/svg%3E')",
		'pluses'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M21.4,9.6h-7.1V2.6c0-0.9-0.7-1.6-1.6-1.6h-1.6c-0.9,0-1.6,0.7-1.6,1.6v7.1H2.6C1.7,9.6,1,10.3,1,11.2v1.6c0,0.9,0.7,1.6,1.6,1.6h7.1v7.1c0,0.9,0.7,1.6,1.6,1.6h1.6c0.9,0,1.6-0.7,1.6-1.6v-7.1h7.1c0.9,0,1.6-0.7,1.6-1.6v-1.6C23,10.3,22.3,9.6,21.4,9.6z%27/%3E%3C/svg%3E')",
		'rhombus'       => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M12.7,2.3c-0.4-0.4-1.1-0.4-1.5,0l-8,9.1c-0.3,0.4-0.3,0.9,0,1.2l8,9.1c0.4,0.4,1.1,0.4,1.5,0l8-9.1c0.3-0.4,0.3-0.9,0-1.2L12.7,2.3z%27/%3E%3C/svg%3E')",
		'parallelogram' => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 24 24%27 fill=%27black%27 stroke=%27none%27%3E%3Cpolygon points=%279.4,2 24,2 14.6,21.6 0,21.6%27/%3E%3C/svg%3E')",
		'rectangles'    => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27none%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 60 30%27 fill=%27black%27 stroke=%27none%27%3E%3Crect x=%2715%27 y=%270%27 width=%2730%27 height=%2730%27/%3E%3C/svg%3E')",
		'fir'           => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 126 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M111.9,18.3v3.4H109v-3.4H111.9z M90.8,18.3v3.4H88v-3.4H90.8z M69.8,18.3v3.4h-2.9v-3.4H69.8z M48.8,18.3v3.4h-2.9v-3.4H48.8z M27.7,18.3v3.4h-2.9v-3.4H27.7z M6.7,18.3v3.4H3.8v-3.4H6.7z M46.4,4l4.3,4.8l-1.8,0l3.5,4.4l-2.2-0.1l3,3.3l-11,0.4l3.6-3.8l-2.9-0.1l3.1-4.2l-1.9,0L46.4,4z M111.4,4l2.4,4.8l-1.8,0l3.5,4.4l-2.5-0.1l3.3,3.3h-11l3.1-3.4l-2.5-0.1l3.1-4.2l-1.9,0L111.4,4z M89.9,4l2.9,4.8l-1.9,0l3.2,4.2l-2.5,0l3.5,3.5l-11-0.4l3-3.1l-2.4,0L88,8.8l-1.9,0L89.9,4z M68.6,4l3,4.4l-1.9,0.1l3.4,4.1l-2.7,0.1l3.8,3.7H63.8l2.9-3.6l-2.9,0.1L67,8.7l-2,0.1L68.6,4z M26.5,4l3,4.4l-1.9,0.1l3.7,4.7l-2.5-0.1l3.3,3.3H21l3.1-3.4l-2.5-0.1l3.2-4.3l-2,0.1L26.5,4z M4.9,4l3.7,4.8l-1.5,0l3.1,4.2L7.6,13l3.4,3.4H0l3-3.3l-2.3,0.1l3.5-4.4l-2.3,0L4.9,4z%27/%3E%3C/svg%3E')",
		'halfrounds'    => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 120 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M11.9,15.9L11.9,15.9L0,16c-0.2-3.7,1.5-5.7,4.9-6C10,9.6,12.4,14.2,11.9,15.9zM26.9,15.9L26.9,15.9L15,16c0.5-3.7,2.5-5.7,5.9-6C26,9.6,27.4,14.2,26.9,15.9z M37.1,10c3.4,0.3,5.1,2.3,4.9,6H30.1C29.5,14.4,31.9,9.6,37.1,10z M57,15.9L57,15.9L45,16c0-3.4,1.6-5.4,4.9-5.9C54.8,9.3,57.4,14.2,57,15.9z M71.9,15.9L71.9,15.9L60,16c-0.2-3.7,1.5-5.7,4.9-6C70,9.6,72.4,14.2,71.9,15.9z M82.2,10c3.4,0.3,5,2.3,4.8,6H75.3C74,13,77.1,9.6,82.2,10zM101.9,15.9L101.9,15.9L90,16c-0.2-3.7,1.5-5.7,4.9-6C100,9.6,102.4,14.2,101.9,15.9z M112.1,10.1c2.7,0.5,4.3,2.5,4.9,5.9h-11.9l0,0C104.5,14.4,108,9.3,112.1,10.1z%27/%3E%3C/svg%3E')",
		'leaves'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 117 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M3,1.5C5,4.9,6,8.8,6,13s-1.7,8.1-5,11.5C0.3,21.1,0,17.2,0,13S1,4.9,3,1.5z M16,1.5c2,3.4,3,7.3,3,11.5s-1,8.1-3,11.5c-2-4.1-3-8.3-3-12.5S14,4.3,16,1.5z M29,1.5c2,4.8,3,9.3,3,13.5s-1,7.4-3,9.5c-2-3.4-3-7.3-3-11.5S27,4.9,29,1.5z M41.1,1.5C43.7,4.9,45,8.8,45,13s-1,8.1-3,11.5c-2-3.4-3-7.3-3-11.5S39.7,4.9,41.1,1.5zM55,1.5c2,2.8,3,6.3,3,10.5s-1.3,8.4-4,12.5c-1.3-3.4-2-7.3-2-11.5S53,4.9,55,1.5z M68,1.5c2,3.4,3,7.3,3,11.5s-0.7,8.1-2,11.5c-2.7-4.8-4-9.3-4-13.5S66,3.6,68,1.5z M82,1.5c1.3,4.8,2,9.3,2,13.5s-1,7.4-3,9.5c-2-3.4-3-7.3-3-11.5S79.3,4.9,82,1.5z M94,1.5c2,3.4,3,7.3,3,11.5s-1.3,8.1-4,11.5c-1.3-1.4-2-4.3-2-8.5S92,6.9,94,1.5z M107,1.5c2,2.1,3,5.3,3,9.5s-0.7,8.7-2,13.5c-2.7-3.4-4-7.3-4-11.5S105,4.9,107,1.5z%27/%3E%3C/svg%3E')",
		'stripes'       => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 120 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M54,1.6V26h-9V2.5L54,1.6z M69,1.6v23.3L60,26V1.6H69z M24,1.6v23.5l-9-0.6V1.6H24z M30,0l9,0.7v24.5h-9V0z M9,2.5v22H0V3.7L9,2.5z M75,1.6l9,0.9v22h-9V1.6z M99,2.7v21.7h-9V3.8L99,2.7z M114,3.8v20.7l-9-0.5V3.8L114,3.8z%27/%3E%3C/svg%3E')",
		'squares'       => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 126 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M46.8,7.8v11.5L36,18.6V7.8H46.8z M82.4,7.8L84,18.6l-12,0.7L70.4,7.8H82.4z M0,7.8l12,0.9v9.9H1.3L0,7.8z M30,7.8v10.8H19L18,7.8H30z M63.7,7.8L66,18.6H54V9.5L63.7,7.8z M89.8,7L102,7.8v10.8H91.2L89.8,7zM108,7.8l12,0.9v8.9l-12,1V7.8z%27/%3E%3C/svg%3E')",
		'trees'         => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 123 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M6.4,2l4.2,5.7H7.7v2.7l3.8,5.2l-3.8,0v7.8H4.8v-7.8H0l4.8-5.2V7.7H1.1L6.4,2z M25.6,2L31,7.7h-3.7v2.7l4.8,5.2h-4.8v7.8h-2.8v-7.8l-3.8,0l3.8-5.2V7.7h-2.9L25.6,2z M47.5,2l4.2,5.7h-3.3v2.7l3.8,5.2l-3.8,0l0.4,7.8h-2.8v-7.8H41l4.8-5.2V7.7h-3.7L47.5,2z M66.2,2l5.4,5.7h-3.7v2.7l4.8,5.2h-4.8v7.8H65v-7.8l-3.8,0l3.8-5.2V7.7h-2.9L66.2,2zM87.4,2l4.8,5.7h-2.9v3.1l3.8,4.8l-3.8,0v7.8h-2.8v-7.8h-4.8l4.8-4.8V7.7h-3.7L87.4,2z M107.3,2l5.4,5.7h-3.7v2.7l4.8,5.2h-4.8v7.8H106v-7.8l-3.8,0l3.8-5.2V7.7h-2.9L107.3,2z%27/%3E%3C/svg%3E')",
		'tribal'        => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 121 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M29.6,10.3l2.1,2.2l-3.6,3.3h7v2.9h-7l3.6,3.5l-2.1,1.7l-5.2-5.2h-5.8v-2.9h5.8L29.6,10.3z M70.9,9.6l2.1,1.7l-3.6,3.5h7v2.9h-7l3.6,3.3l-2.1,2.2l-5.2-5.5h-5.8v-2.9h5.8L70.9,9.6z M111.5,9.6l2.1,1.7l-3.6,3.5h7v2.9h-7l3.6,3.3l-2.1,2.2l-5.2-5.5h-5.8v-2.9h5.8L111.5,9.6z M50.2,2.7l2.1,1.7l-3.6,3.5h7v2.9h-7l3.6,3.3l-2.1,2.2L45,10.7h-5.8V7.9H45L50.2,2.7z M11,2l2.1,1.7L9.6,7.2h7V10h-7l3.6,3.3L11,15.5L5.8,10H0V7.2h5.8L11,2z M91.5,2l2.1,2.2l-3.6,3.3h7v2.9h-7l3.6,3.5l-2.1,1.7l-5.2-5.2h-5.8V7.5h5.8L91.5,2z%27/%3E%3C/svg%3E')",
		'x'             => "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 preserveAspectRatio=%27xMidYMid meet%27 overflow=%27visible%27 height=%27100%25%27 viewBox=%270 0 126 26%27 fill=%27black%27 stroke=%27none%27%3E%3Cpath d=%27M10.7,6l2.5,2.6l-4,4.3l4,5.4l-2.5,1.9l-4.5-5.2l-3.9,4.2L0.7,17L4,13.1L0,8.6l2.3-1.3l3.9,3.9L10.7,6z M23.9,6.6l4.2,4.5L32,7.2l2.3,1.3l-4,4.5l3.2,3.9L32,19.1l-3.9-3.3l-4.5,4.3l-2.5-1.9l4.4-5.1l-4.2-3.9L23.9,6.6zM73.5,6L76,8.6l-4,4.3l4,5.4l-2.5,1.9l-4.5-5.2l-3.9,4.2L63.5,17l4.1-4.7L63.5,8l2.3-1.3l4.1,3.6L73.5,6z M94,6l2.5,2.6l-4,4.3l4,5.4L94,20.1l-3.9-5l-3.9,4.2L84,17l3.2-3.9L84,8.6l2.3-1.3l3.2,3.9L94,6z M106.9,6l4.5,5.1l3.9-3.9l2.3,1.3l-4,4.5l3.2,3.9l-1.6,2.1l-3.9-4.2l-4.5,5.2l-2.5-1.9l4-5.4l-4-4.3L106.9,6z M53.1,6l2.5,2.6l-4,4.3l4,4.6l-2.5,1.9l-4.5-4.5l-3.5,4.5L43.1,17l3.2-3.9l-4-4.5l2.3-1.3l3.9,3.9L53.1,6z%27/%3E%3C/svg%3E')",
	);

	/**
	 * Get divider pattern style
	 *
	 * @param string $type Divider type.
	 * @return string
	 */
	private function get_divider_style( $type ) {
		if ( isset( $this->divider_patterns[ $type ] ) ) {
			return '--divider-pattern-url: ' . $this->divider_patterns[ $type ] . ';';
		}
		return '';
	}

	/**
	 * Render divider line classes
	 *
	 * @param string $type Divider type.
	 * @return string
	 */
	private function get_divider_line_class( $type ) {
		$regular_types = array( 'default', 'double', 'dotted', 'dashed' );
		$is_regular    = in_array( $type, $regular_types, true );

		$classes   = array();
		$classes[] = 'guten-divider-' . $type;
		$classes[] = 'guten-divider-line';

		if ( $is_regular ) {
			$classes[] = 'guten-divider-regular';
		} else {
			$classes[] = 'guten-divider-style';
		}

		return implode( ' ', $classes );
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$type          = isset( $this->attributes['type'] ) ? $this->attributes['type'] : 'default';
		$content       = isset( $this->attributes['content'] ) ? $this->attributes['content'] : 'none';
		$content_align = isset( $this->attributes['contentAlign'] ) ? $this->attributes['contentAlign'] : '';
		$text          = isset( $this->attributes['text'] ) ? $this->attributes['text'] : '';
		$icon          = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fab fa-wordpress';
		$icon_type     = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg      = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';

		$divider_style     = $this->get_divider_style( $type );
		$divider_line_class = $this->get_divider_line_class( $type );

		$style_attr = ! empty( $divider_style ) ? ' style="' . $divider_style . '"' : '';

		if ( ! empty( $content ) && 'none' !== $content ) {
			// Divider with content.
			$content_html = '';
			if ( 'text' === $content ) {
				$content_html = '<span>' . wp_kses_post( $text ) . '</span>';
			} elseif ( 'icon' === $content ) {
				$content_html = $this->render_icon( $icon_type, $icon, $icon_svg );
			}

			$output = '<div class="guten-divider-wrapper"' . $style_attr . '>';
			if ( 'left' !== $content_align ) {
				$output .= '<div class="' . esc_attr( $divider_line_class ) . '"></div>';
			}
			$output .= '<span class="guten-divider-content">' . $content_html . '</span>';
			if ( 'right' !== $content_align ) {
				$output .= '<div class="' . esc_attr( $divider_line_class ) . '"></div>';
			}
			$output .= '</div>';
		} else {
			// Divider only.
			$output  = '<div class="guten-divider-wrapper"' . $style_attr . '>';
			$output .= '<div class="' . esc_attr( $divider_line_class ) . '"></div>';
			$output .= '</div>';
		}

		return $output;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}

		$type            = isset( $this->attributes['type'] ) ? $this->attributes['type'] : 'default';
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';

		$tribal_types = array( 'fir', 'halfrounds', 'leaves', 'stripes', 'squares', 'trees', 'tribal', 'x' );
		$is_tribal    = in_array( $type, $tribal_types, true );

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element wp-block-gutenverse-divider guten-divider ' . $element_id . $animation_class . $display_classes;
		if ( $is_tribal ) {
			$class_name .= ' guten-divider-tribal';
		}

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'divider' );

		return $content;
	}
}
