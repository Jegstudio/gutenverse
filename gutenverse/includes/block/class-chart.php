<?php
/**
 * Chart Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Chart Block
 *
 * @package gutenverse\block
 */
class Chart extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$element_id         = $this->get_element_id();
		$title_tag          = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'h2';
		$icon               = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fas fa-chart-pie';
		$icon_type          = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg           = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$chart_content      = isset( $this->attributes['chartContent'] ) ? $this->attributes['chartContent'] : 'percentage';
		$tooltip_display    = isset( $this->attributes['tooltipDisplay'] ) ? $this->attributes['tooltipDisplay'] : false;
		$legend_display     = isset( $this->attributes['legendDisplay'] ) ? $this->attributes['legendDisplay'] : false;
		$chart_items        = isset( $this->attributes['chartItems'] ) ? $this->attributes['chartItems'] : array();
		$chart_type         = isset( $this->attributes['chartType'] ) ? $this->attributes['chartType'] : 'doughnut';
		$total_value        = isset( $this->attributes['totalValue'] ) ? $this->attributes['totalValue'] : 500;
		$animation_duration = isset( $this->attributes['animationDuration'] ) ? $this->attributes['animationDuration'] : 3600;
		$content_type       = isset( $this->attributes['contentType'] ) ? $this->attributes['contentType'] : array();
		$min_value          = isset( $this->attributes['minValue'] ) ? $this->attributes['minValue'] : 0;
		$cutout             = isset( $this->attributes['cutout'] ) ? $this->attributes['cutout'] : array();
		$bar_thickness      = isset( $this->attributes['barThickness'] ) ? $this->attributes['barThickness'] : '50';
		$cutout_background  = isset( $this->attributes['cutoutBackground'] ) ? $this->attributes['cutoutBackground'] : array();
		$title              = isset( $this->attributes['title'] ) ? $this->attributes['title'] : 'Chart Title';
		$description        = isset( $this->attributes['description'] ) ? $this->attributes['description'] : '';
		$chart_size         = isset( $this->attributes['chartSize'] ) ? $this->attributes['chartSize'] : array();

		$multi_value = count( $chart_items ) > 1;

		$data = array(
			'chartContent'      => $chart_content,
			'tooltipDisplay'    => $tooltip_display,
			'legendDisplay'     => $legend_display,
			'chartItems'        => $chart_items,
			'chartType'         => $chart_type,
			'minValue'          => $min_value,
			'totalValue'        => $total_value,
			'animationDuration' => $animation_duration,
			'cutout'            => $cutout,
			'barThickness'      => $bar_thickness,
			'cutoutBackground'  => $cutout_background,
			'multiValue'        => $multi_value,
			'chartSize'         => $chart_size,
			'elementId'         => $element_id,
		);

		$inside_chart_html = '';
		if ( 'percentage' === $chart_content || 'number' === $chart_content ) {
			$inside_chart_html = '<span>' . ( $multi_value || 'number' === $chart_content ? '0' : '0%' ) . '</span>';
		} else {
			$inside_chart_html = $this->render_icon( $icon_type, $icon, $icon_svg );
		}

		$inside_chart = '<div class="chart-inside type-' . esc_attr( $chart_type ) . '">' . $inside_chart_html . '</div>';

		ob_start();
		?>
		<div class="guten-chart-wrapper">
			<div class="chart-content content-card">
				<<?php echo esc_attr( $title_tag ); ?> class="chart-title">
					<?php echo wp_kses_post( $title ); ?>
				</<?php echo esc_attr( $title_tag ); ?>>
				<?php echo wp_kses_post( ( 'doughnut' !== $chart_type && 'none' !== $chart_content ) ? $inside_chart : '' ); ?>
				<p class="chart-description"><?php echo wp_kses_post( $description ); ?></p>
			</div>
			<div class="chart-content content-chart">
				<div class="chart-container" data-chart='<?php echo esc_attr( wp_json_encode( $data ) ); ?>'>
					<div id="chart-<?php echo esc_attr( $element_id ); ?>" style="box-sizing: border-box; line-height: 0;"></div>
				</div>
				<?php echo wp_kses_post( ( 'none' !== $chart_content && 'doughnut' === $chart_type ) ? $inside_chart : '' ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Flip Classes
	 *
	 * @param array $content_type .
	 * @return string
	 */
	protected function get_flip_classes( $content_type ) {
		$flip_classes = '';

		if ( ! empty( $content_type ) ) {
			$desktop = isset( $content_type['Desktop'] ) ? $content_type['Desktop'] : '';
			$tablet  = isset( $content_type['Tablet'] ) ? $content_type['Tablet'] : '';
			$mobile  = isset( $content_type['Mobile'] ) ? $content_type['Mobile'] : '';

			$is_desktop_flip = 'flipCard' === $desktop;
			$is_tablet_flip  = 'flipCard' === $tablet || ( '' === $tablet && 'flipCard' === $desktop );
			$is_mobile_flip  = 'flipCard' === $mobile || ( '' === $mobile && $is_tablet_flip );

			$flip_classes .= $is_desktop_flip ? 'Desktop-flipCard ' : ( ( $is_tablet_flip || $is_mobile_flip ) ? 'Desktop-noFlip ' : '' );
			$flip_classes .= $is_tablet_flip ? 'Tablet-flipCard ' : ( ( $is_desktop_flip || $is_mobile_flip ) ? 'Tablet-noFlip ' : '' );
			$flip_classes .= $is_mobile_flip ? 'Mobile-flipCard ' : ( ( $is_desktop_flip || $is_tablet_flip ) ? 'Mobile-noFlip ' : '' );
		}

		return $flip_classes;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$content_type    = isset( $this->attributes['contentType'] ) ? $this->attributes['contentType'] : array();
		$flip_classes    = $this->get_flip_classes( $content_type );
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$id_attr         = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$class_name = 'guten-element guten-chart ' . $element_id . $display_classes . $animation_class . $custom_classes . ' ' . $flip_classes;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '">' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );

		return $content;
	}
}
