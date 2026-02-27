<?php
/**
 * Dynamic Field Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Dynamic Field
 *
 * @package gutenverse\block
 */
class Dynamic_Field extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$format_type         = isset( $this->attributes['formatType'] ) ? $this->attributes['formatType'] : 'none';
		$format_options_case = isset( $this->attributes['formatOptionsTextCase'] ) ? $this->attributes['formatOptionsTextCase'] : '';
		$regex_pattern       = isset( $this->attributes['formatOptionsRegexPattern'] ) ? $this->attributes['formatOptionsRegexPattern'] : '';
		$regex_replace       = isset( $this->attributes['formatOptionsRegexReplace'] ) ? $this->attributes['formatOptionsRegexReplace'] : '';
		$date_before         = isset( $this->attributes['formatOptionsDateBefore'] ) ? $this->attributes['formatOptionsDateBefore'] : '';
		$date_after          = isset( $this->attributes['formatOptionsDateAfter'] ) ? $this->attributes['formatOptionsDateAfter'] : '';
		$number_decimals     = isset( $this->attributes['formatOptionsNumberDecimals'] ) ? $this->attributes['formatOptionsNumberDecimals'] : 0;
		$number_decimal_sep  = isset( $this->attributes['formatOptionsNumberDecimalSeparator'] ) ? $this->attributes['formatOptionsNumberDecimalSeparator'] : '.';
		$number_thousand_sep = isset( $this->attributes['formatOptionsNumberThousandSeparator'] ) ? $this->attributes['formatOptionsNumberThousandSeparator'] : ',';
		$condition_type      = isset( $this->attributes['formatConditionType'] ) ? $this->attributes['formatConditionType'] : 'none';
		$condition_value     = isset( $this->attributes['formatConditionValue'] ) ? $this->attributes['formatConditionValue'] : '';
		$condition_true      = isset( $this->attributes['formatConditionTextTrue'] ) ? $this->attributes['formatConditionTextTrue'] : '';
		$condition_false     = isset( $this->attributes['formatConditionTextFalse'] ) ? $this->attributes['formatConditionTextFalse'] : '';
		$prefix              = isset( $this->attributes['prefix'] ) ? $this->attributes['prefix'] : '';
		$suffix              = isset( $this->attributes['suffix'] ) ? $this->attributes['suffix'] : '';

		$field_content = isset( $this->attributes['fieldContent'] ) ? $this->attributes['fieldContent'] : '';
		$field_key     = is_array( $field_content ) && isset( $field_content['value'] ) ? $field_content['value'] : $field_content;

		$format_options = array(
			'textCase'                => $format_options_case,
			'regexPattern'            => $regex_pattern,
			'regexReplace'            => $regex_replace,
			'dateBefore'              => $date_before,
			'dateAfter'               => $date_after,
			'numberDecimals'          => $number_decimals,
			'numberDecimalSeparator'  => $number_decimal_sep,
			'numberThousandSeparator' => $number_thousand_sep,
			'conditionType'           => $condition_type,
			'conditionValue'          => $condition_value,
			'conditionTrue'           => $condition_true,
			'conditionFalse'          => $condition_false,
			'fieldKey'                => $field_key,
			'postId'                  => $post_id,
		);

		$html_tag = isset( $this->attributes['htmlTag'] ) ? $this->attributes['htmlTag'] : 'p';
		$is_link  = isset( $this->attributes['link'] ) ? $this->attributes['link'] : false;
		$target   = isset( $this->attributes['linkTarget'] ) && $this->attributes['linkTarget'] ? '_blank' : '_self';

		$field_link     = isset( $this->attributes['fieldLink'] ) ? $this->attributes['fieldLink'] : '';
		$field_link_key = is_array( $field_link ) && isset( $field_link['value'] ) ? $field_link['value'] : $field_link;

		if ( empty( $field_key ) ) {
			return '';
		}

		if ( ! function_exists( 'get_field' ) ) {
			return '';
		}

		$format_acf = true;
		if ( 'none' !== $format_type && ! empty( $format_type ) ) {
			$format_acf = false;
		}

		$value = get_field( $field_key, $post_id, $format_acf );
		if ( 'none' === $condition_type && ! $value && 0 !== $value && '0' !== $value ) {
			return '';
		}

		if ( is_array( $value ) ) {
			$value = implode( ', ', $value );
		}

		$formatted = self::format_dynamic_data( $value, $format_type, $format_options );
		$wrapped   = $prefix . $formatted . $suffix;
		$value     = self::apply_format_condition( $formatted, $format_options, $wrapped );

		$content = wp_kses_post( $value );

		if ( $is_link ) {
			$href = '';

			// 1. Try Field Link first
			if ( ! empty( $field_link_key ) ) {
				$link_val = get_field( $field_link_key, $post_id );
				if ( $link_val ) {
					$href = $link_val;
				}
			}

			// 2. Fallback to using the content value itself
			if ( empty( $href ) ) {
				if ( filter_var( $value, FILTER_VALIDATE_URL ) ) {
					$href = $value;
				} else {
					$href = $value; // Just use the value as href even if not validated URL? Original code did this.
				}
			}

			if ( ! empty( $href ) ) {
				$content = "<a href='" . esc_url( $href ) . "' target='" . esc_attr( $target ) . "'>{$content}</a>";
			}
		}

		return "<{$html_tag} class='guten-dynamic-field-content'>{$content}</{$html_tag}>";
	}

	/**
	 * Format dynamic data for Frontend rendering.
	 *
	 * @param mixed  $value The raw dataset.
	 * @param string $format_type e.g., 'date', 'number', 'textCase', 'array'.
	 * @param array  $format_options Options specific to the formatType.
	 * @return mixed The formatted string.
	 */
	public static function format_dynamic_data( $value, $format_type, $format_options ) {
		if ( null === $value || '' === $value ) {
			return $value;
		}

		switch ( $format_type ) {
			case 'textCase':
				if ( is_string( $value ) ) {
					$text_case = isset( $format_options['textCase'] ) ? $format_options['textCase'] : 'uppercase';
					if ( 'uppercase' === $text_case ) {
						return strtoupper( $value );
					} elseif ( 'lowercase' === $text_case ) {
						return strtolower( $value );
					} elseif ( 'capitalize' === $text_case ) {
						return ucwords( $value );
					}
				}
				break;

			case 'regex':
				if ( is_string( $value ) ) {
					$pattern = isset( $format_options['regexPattern'] ) ? $format_options['regexPattern'] : '';
					$replace = isset( $format_options['regexReplace'] ) ? $format_options['regexReplace'] : '';

					if ( ! empty( $pattern ) ) {
						$delimiter = mb_substr( $pattern, 0, 1 );
						if ( ! in_array( $delimiter, array( '/', '#', '~', '@', '%' ), true ) || mb_substr( $pattern, -1, 1 ) !== $delimiter ) {
							$pattern = '/' . str_replace( '/', '\/', $pattern ) . '/';
						}

						$result = @preg_replace( $pattern, $replace, $value );
						if ( null !== $result && false !== $result ) {
							return $result;
						}
					}
				}
				break;

			case 'date':
				if ( is_string( $value ) || is_numeric( $value ) ) {
					$before = isset( $format_options['dateBefore'] ) ? $format_options['dateBefore'] : '';
					$after  = isset( $format_options['dateAfter'] ) ? $format_options['dateAfter'] : '';

					// Attempt to dynamically fetch ACF formatting parameters if not specified manually.
					if ( ( empty( $before ) || empty( $after ) ) && function_exists( 'get_field_object' ) ) {
						$f_key = isset( $format_options['fieldKey'] ) ? $format_options['fieldKey'] : '';
						$p_id  = isset( $format_options['postId'] ) ? $format_options['postId'] : false;

						if ( ! empty( $f_key ) ) {
							$field_obj = get_field_object( $f_key, $p_id, false, false );
							if ( $field_obj && in_array( $field_obj['type'], array( 'date_picker', 'date_time_picker', 'time_picker' ), true ) ) {
								if ( empty( $before ) && isset( $field_obj['return_format'] ) ) {
									$before = $field_obj['return_format'];
								}
								if ( empty( $after ) && isset( $field_obj['display_format'] ) ) {
									$after = $field_obj['display_format'];
								}
							}
						}
					}

					if ( empty( $before ) ) {
						// Fallback to standard strtotime if no 'before' format is provided.
						$timestamp = strtotime( $value );
					} else {
						$date = \DateTime::createFromFormat( $before, $value );
						if ( $date ) {
							$timestamp = $date->getTimestamp();
						} else {
							// Return original text if format mismatch.
							return $value;
						}
					}

					if ( $timestamp ) {
						if ( ! empty( $after ) ) {
							return date_i18n( $after, $timestamp );
						} else {
							return date_i18n( get_option( 'date_format' ), $timestamp );
						}
					}
				}
				break;
			case 'number':
				if ( is_numeric( $value ) ) {
					$decimals     = isset( $format_options['numberDecimals'] ) ? $format_options['numberDecimals'] : 0;
					$decimal_sep  = isset( $format_options['numberDecimalSeparator'] ) ? $format_options['numberDecimalSeparator'] : '.';
					$thousand_sep = isset( $format_options['numberThousandSeparator'] ) ? $format_options['numberThousandSeparator'] : ',';

					return number_format( (float) $value, (int) $decimals, $decimal_sep, $thousand_sep );
				}
				break;

			case 'none':
			default:
				return $value;
		}

		return $value;
	}

	/**
	 * Apply format condition.
	 *
	 * @param mixed  $value    The value.
	 * @param array  $options  The options.
	 * @param string $fallback The fallback value (prefixed/suffixed).
	 * @return mixed
	 */
	public static function apply_format_condition( $value, $options, $fallback = '' ) {
		$type  = isset( $options['conditionType'] ) ? $options['conditionType'] : 'none';
		$comp  = isset( $options['conditionValue'] ) ? $options['conditionValue'] : '';
		$true  = isset( $options['conditionTrue'] ) ? $options['conditionTrue'] : '';
		$false = isset( $options['conditionFalse'] ) ? $options['conditionFalse'] : '';

		if ( 'none' === $type ) {
			return '' !== $fallback ? $fallback : $value;
		}

		$is_met = false;
		switch ( $type ) {
			case 'empty':
				$is_met = empty( $value ) && 0 !== $value && '0' !== $value;
				break;
			case 'notEmpty':
				$is_met = ! empty( $value ) || 0 === $value || '0' === $value;
				break;
			case 'equal':
				$is_met = (string) $value === (string) $comp;
				break;
			case 'notEqual':
				$is_met = (string) $value !== (string) $comp;
				break;
			case 'greaterThan':
				$is_met = is_numeric( $value ) && is_numeric( $comp ) && (float) $value > (float) $comp;
				break;
			case 'lessThan':
				$is_met = is_numeric( $value ) && is_numeric( $comp ) && (float) $value < (float) $comp;
				break;
			case 'contains':
				$is_met = is_string( $value ) && strpos( $value, $comp ) !== false;
				break;
		}

		if ( $is_met ) {
			return $true;
		} else {
			return ! empty( $false ) ? $false : $fallback;
		}
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-dynamic-field guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
