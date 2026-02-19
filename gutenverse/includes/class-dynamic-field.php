<?php
/**
 * Dynamic Field class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Dynamic Field class
 *
 * @package gutenverse
 */
class Dynamic_Field {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'init', array( $this, 'register_post_meta' ), 9 );
	}

	/**
	 * Register post meta so it can work on editor
	 */
	public function register_post_meta() {
		if ( ! function_exists( 'acf_get_field_groups' ) ) {
			return;
		}

		$groups     = acf_get_field_groups();
		$post_types = array();
		$taxonomies = array();

		foreach ( $groups as $group ) {
			// Change 1: Reset arrays inside the loop to avoid accumulation across groups.
			$post_types = array();
			$taxonomies = array();

			if ( ! empty( $group['location'] ) ) {
				foreach ( $group['location'] as $location_or ) {
					foreach ( $location_or as $rule ) {
						if ( 'post_type' === $rule['param'] && '==' === $rule['operator'] ) {
							$post_types[] = $rule['value'];
						}

						// Change 2: Handle taxonomy location rules.
						if ( 'taxonomy' === $rule['param'] && '==' === $rule['operator'] ) {
							$taxonomies[] = $rule['value'];
						}
					}
				}
			}

			if ( empty( $post_types ) && empty( $taxonomies ) ) {
				continue;
			}

			$fields = acf_get_fields( $group );

			if ( empty( $fields ) ) {
				continue;
			}

			foreach ( $fields as $field ) {
				if ( ! empty( $post_types ) ) {
					foreach ( $post_types as $post_type ) {
						register_post_meta(
							$post_type,
							$field['name'],
							array(
								'type'         => 'string',
								'single'       => true,
								'show_in_rest' => true,
							)
						);
					}
				}

				if ( ! empty( $taxonomies ) ) {
					foreach ( $taxonomies as $taxonomy ) {
						register_term_meta(
							$taxonomy,
							$field['name'],
							array(
								'type'         => 'string',
								'single'       => true,
								'show_in_rest' => true,
							)
						);
					}
				}
			}
		}
	}
}
