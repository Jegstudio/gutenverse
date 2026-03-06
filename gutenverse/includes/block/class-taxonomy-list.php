<?php
/**
 * Taxonomy List Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Taxonomy Block
 *
 * @package gutenverse\block
 */
class Taxonomy_List extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param integer $category_qty .
	 * @param array   $included_category .
	 * @param string  $sort .
	 * @param bool    $hide_empty .
	 * @param string  $orderby .
	 *
	 * @return string
	 */
	public function render_content( $category_qty = 0, $included_category = array(), $sort = 'ASC', $hide_empty = false, $orderby = 'count' ) {
		$included = array();
		foreach ( $included_category as $value ) {
			$included[] = $value['value'];
		}
		$args = array(
			'taxonomy'   => $this->attributes['taxonomyType']['value'],
			'order'      => $sort,
			'orderby'    => $orderby,
			'number'     => $category_qty ? $category_qty : 0,
			'include'    => $included,
			'hide_empty' => $hide_empty,
		);

		$categories = get_terms( $args );
		$icon       = '';
		$show_count = $this->attributes['showCount'];
		$bracket    = $this->attributes['countBracket'];

		if ( $this->attributes['showIcon'] ) {
			$icon_type = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
			$icon_svg  = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
			$icon_html = $this->render_icon( $icon_type, $this->attributes['icon'], $icon_svg );
			$icon      = '<span class="icon-list">' . $icon_html . '</span>';
		}
		if ( ! empty( $categories ) ) {
			ob_start();
			?>
			<div class="taxonomy-list-wrapper">
				<?php
				foreach ( $categories as $category ) {
					echo '<div class="taxonomy-list-item">
						<a href="' . esc_url( get_term_link( $category ) ) . '">
							' . $icon . '
							<div class="taxonomy-list-content">' . esc_html( $category->name ) . '</div>
						</a>
						' . ( $show_count ? ( '<span class="taxonomy-list-count guten-taxonomy" >' . $this->gutenverse_wrap_count( $category->count, $bracket ) . '</span>' ) : '' ) . '
					</div>';
				}
				?>
			</div>
			<?php
			$data_html = ob_get_contents();
			ob_end_clean();
		} else {
			$data_html = $this->empty_content();
		}

		return $data_html;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( $this->attributes['qty'], $this->attributes['includedCategory'], $this->attributes['sortType'], $this->attributes['hideEmpty'], $this->attributes['sortBy'] );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-taxonomy-list guten-element">' . $this->render_content( $this->attributes['qty'], $this->attributes['includedCategory'], $this->attributes['sortType'], $this->attributes['hideEmpty'], $this->attributes['sortBy'] ) . '</div>';
	}

	/**
	 * use count bracket
	 */
	public function gutenverse_wrap_count( $count, $bracket ) {
		switch ( $bracket ) {
			case 'parentheses':
				return '(' . $count . ')';
			case 'braces':
				return '{' . $count . '}';
			case 'square':
				return '[' . $count . ']';
			case 'angle':
				return '<' . $count . '>';
			case 'double-quotes':
				return '"' . $count . '"';
			case 'single-quotes':
				return "'" . $count . "'";
			default:
				return $count;
		}
	}
}
