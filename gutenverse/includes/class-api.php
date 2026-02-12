<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Block\Post_Block;
use Gutenverse\Block\Post_List;
use Gutenverse\Framework\Init;

/**
 * Class Api
 *
 * @package gutenverse
 */
class Api {
	/**
	 * Instance of Gutenverse.
	 *
	 * @var Api
	 */
	private static $instance;

	/**
	 * Endpoint Path
	 *
	 * @var string
	 */
	const ENDPOINT = 'gutenverse-client/v1';

	/**
	 * Singleton page for Gutenverse Class
	 *
	 * @return Api
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Blocks constructor.
	 */
	private function __construct() {
		if ( did_action( 'rest_api_init' ) ) {
			$this->register_routes();
		}
	}

	/**
	 * Register Gutenverse APIs
	 */
	private function register_routes() {
		/** ----------------------------------------------------------------
		 * Frontend/Global Routes
		 */
		register_rest_route(
			self::ENDPOINT,
			'postblock/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'post_block_data' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'postlist/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'post_list_data' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'upgrade',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'upgrade_step' ),
				'permission_callback' => array( $this, 'can_install_plugin' ),
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'base-theme/get',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'base_theme_get' ),
				'permission_callback' => function () {
					if ( ! current_user_can( 'manage_options' ) ) {
						return new \WP_Error(
							'forbidden_permission',
							esc_html__( 'Forbidden Access', 'gutenverse' ),
							array( 'status' => 403 )
						);
					}

					return true;
				},
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'check/license',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'license_check' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'check/requirement',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'requirement_check' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'gutenverse/v1',
			'get-post-data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_post_data' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_rest_route(
			'gutenverse/v1',
			'acf-field-value',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_acf_field_value' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
		register_rest_route(
			'gutenverse/v1',
			'post-types',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_public_post_types' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Get Public Post Types
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_public_post_types( $request ) {
		$args = array(
			'public' => true,
		);

		$post_types = get_post_types( $args, 'objects' );
		$result     = array();

		foreach ( $post_types as $post_type ) {
			$result[] = array(
				'label' => $post_type->label,
				'value' => $post_type->name,
			);
		}

		return new \WP_REST_Response( $result, 200 );
	}

	/**
	 * Only for user who can install plugin.
	 */
	public function can_install_plugin() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return new \WP_Error(
				'forbidden_permission',
				esc_html__( 'Forbidden Access', 'gutenverse' ),
				array( 'status' => 403 )
			);
		}

		return true;
	}

	/**
	 * Upgrade Step.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function upgrade_step( $request ) {
		$step   = $request->get_param( 'step' );
		$result = true;

		switch ( $step ) {
			case 'form':
				$result = $this->install_plugin( 'gutenverse-form', 'gutenverse-form/gutenverse-form.php' );
				break;
			case 'icon':
				$result = Init::instance()->assets->download_font_icon();
				break;
			default:
				( new Upgrader() )->upgrader_page_upgrade_close();
				break;
		}

		return $result;
	}

	/**
	 * Install Plugin.
	 *
	 * @param string $path Plugin path.
	 *
	 * @return boolean
	 */
	public function is_plugin_installed( $path ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$installed_plugins = get_plugins();
		return isset( $installed_plugins[ $path ] );
	}

	/**
	 * Install Plugin.
	 *
	 * @param string $slug Plugin slug.
	 * @param string $plugin plugin path.
	 */
	public function install_plugin( $slug, $plugin ) {
		$result = true;

		if ( ! $this->is_plugin_installed( $plugin ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once ABSPATH . 'wp-admin/includes/plugin.php';

			$api = plugins_api(
				'plugin_information',
				array(
					'slug' => $slug,
				)
			);

			$plugin_upgrader = new \Plugin_Upgrader( new \WP_Ajax_Upgrader_Skin() );

			$result = $plugin_upgrader->install(
				$api->download_link,
				array(
					'clear_update_cache' => false,
				)
			);
		}

		if ( $result || ! is_wp_error( $result ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
			activate_plugin( $plugin, null, null, true );
		}

		return true;
	}

	/**
	 * Get Post Block Pagination Data
	 *
	 * @param object $request .
	 */
	public function post_block_data( $request ) {
		$attributes = $request['attributes'];
		$post_data  = new Post_Block();

		if ( is_array( $attributes ) ) {
			$attributes['fromPagination'] = true;
		}

		$post_data->set_attributes( $attributes );

		$render = $post_data->render_frontend( false );

		return array(
			'rendered' => $render,
		);
	}

	/**
	 * Get Post List Pagination Data
	 *
	 * @param object $request .
	 */
	public function post_list_data( $request ) {
		$attributes = $request['attributes'];
		$post_data  = new Post_List();

		$post_data->set_attributes( $attributes );

		$render = $post_data->render_frontend();

		return array(
			'rendered' => $render,
		);
	}

	/**
	 * Get base theme data
	 *
	 * @param object $request .
	 *
	 * @return object
	 */
	public function base_theme_get( $request ) {

		/**Check if file exist */
		$upload_dir       = wp_upload_dir();
		$upload_base_path = $upload_dir['basedir'];
		$file_path        = $upload_base_path . '/gutenverse/base-themes/data.json';

		global $wp_filesystem;

		if ( ! function_exists( 'WP_Filesystem' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		/**Check schedule fetch */
		$companion_data = get_option( 'gutenverse-companion-base-theme', false );
		$fetch_time     = null;
		$now            = time();
		if ( $companion_data ) {
			$fetch_time = $companion_data['fetch_time'];
		}
		/**Check if file exist */
		if ( ! $wp_filesystem->exists( $file_path ) ) {
			$updated = $this->update_basetheme_data( $request );
			if ( ! $updated ) {
				return new \WP_REST_Response(
					array(
						'message' => 'Unable to fetch demo data : Server Down! Please try again later.',
					),
					400
				);
			}
			$next_fetch = $now + ( 24 * 60 * 60 );
			update_option(
				'gutenverse-companion-base-theme',
				array(
					'fetch_time' => $next_fetch,
				)
			);
		}
		if ( null === $fetch_time || $fetch_time < $now ) {
			/**Update demo data and fetch time */
			$updated = $this->update_basetheme_data( $request );
			if ( ! $updated ) {
				return new \WP_REST_Response(
					array(
						'message' => 'Unable to fetch demo data : Server Down! Please try again later.',
					),
					400
				);
			}
			$next_fetch = $now + ( 24 * 60 * 60 );
			update_option(
				'gutenverse-companion-base-theme',
				array(
					'fetch_time' => $next_fetch,
				)
			);
		}

		$json_content = file_get_contents( $file_path );
		$data         = json_decode( $json_content, true );
		return rest_ensure_response( $data );
	}

	/**
	 * Update base theme Data
	 */
	public function update_basetheme_data() {

		$response = wp_remote_post(
			GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/v4/companion/base-theme',
			array(
				'body'    => '',
				'headers' => array(
					'Content-Type' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
			return false;
		}

		$response_body = wp_remote_retrieve_body( $response );

		$data = json_decode( $response_body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			gutenverse_rlog( 'JSON Decode Error: ' . json_last_error_msg() );
			return false;
		}

		// filter show case.
		if ( isset( $data['companion'] ) && is_array( $data['companion'] ) ) {
			$data['companion'] = array_values(
				array_filter(
					$data['companion'],
					function ( $item ) {
						return isset( $item['slug'] ) && 'show-case' !== $item['slug'];
					}
				)
			);
		}

		$filtered_json = wp_json_encode( $data );

		if ( false === $filtered_json ) {
			gutenverse_rlog( 'JSON Encode Error' );
			return false;
		}

		/**Check if directory exist */
		$basedir   = wp_upload_dir()['basedir'];
		$directory = $basedir . '/gutenverse/base-themes';
		if ( ! is_dir( $directory ) ) {
			wp_mkdir_p( $directory );
		}
		$file_path = $directory . '/data.json';

		/**Save data to json file */
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->put_contents( $file_path, $filtered_json, FS_CHMOD_FILE );
		return true;
	}

	/**
	 * Check if license key is active.
	 *
	 * @param Array $param Array of Request.
	 *
	 * @return WP_Rest.
	 */
	public function license_check( $param ) {
		$response = wp_remote_post(
			GUTENVERSE_LICENSE_SERVER . '/wp-json/gutenverse-pro/v1/license/validate',
			array(
				'body'    => wp_json_encode( $param ),
				'headers' => array(
					'Content-Type' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return false;
		} else {
			return json_decode( wp_remote_retrieve_body( $response ) );
		}
	}

	/**
	 * Check if requirement fullfiled.
	 *
	 * @return bool.
	 */
	public function requirement_check() {
		$plugins        = array();
		$active_plugins = get_option( 'active_plugins' );

		foreach ( $active_plugins as $active ) {
			$plugins[] = explode( '/', $active )[0];
		}
		$is_complete = apply_filters( 'gutenverse_companion_base_theme', false ) && in_array( 'gutenverse-companion', $plugins, true );
		return $is_complete;
	}

	/**
	 * Get Post Data for Post Block
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_post_data( $request ) {
		$attributes = $request->get_param( 'attributes' );

		if ( ! is_array( $attributes ) ) {
			return new \WP_REST_Response(
				array(
					'posts'       => array(),
					'total_pages' => 1,
				),
				200
			);
		}

		// Filter and prepare attributes.
		$attr = $this->filter_post_attributes( $attributes );

		// Build query arguments using the same logic as Post_Abstract.
		$include_category = array();
		$exclude_category = array();
		$args             = array();

		$args['post_type']   = isset( $attr['postType'] ) ? sanitize_text_field( $attr['postType'] ) : 'post';
		$args['post_status'] = 'publish';

		// Handle pagination.
		$paged = isset( $attr['editParam']['page'] ) ? intval( $attr['editParam']['page'] ) : 1;
		$paged = max( 1, $paged );

		$args['paged']               = $paged;
		$args['offset']              = isset( $attr['postOffset'] ) ? intval( $attr['postOffset'] ) : 0;
		$args['posts_per_page']      = isset( $attr['numberPost'] ) ? intval( $attr['numberPost'] ) : 5;
		$args['ignore_sticky_posts'] = 1;

		// Handle inherit query for archive/search pages.
		if ( isset( $attr['inheritQuery'] ) && ( true === $attr['inheritQuery'] || 'true' === $attr['inheritQuery'] ) ) {
			$search_query = get_search_query();
			$object_query = get_queried_object();

			$args['s'] = ! empty( $search_query ) ? esc_attr( $search_query ) : null;

			if ( ! empty( $object_query ) ) {
				if ( $object_query instanceof \WP_Term ) {
					switch ( $object_query->taxonomy ) {
						case 'category':
							$args['category_name'] = $object_query->slug;
							break;
						case 'post_tag':
							$args['tag'] = $object_query->slug;
							break;
					}
				}

				if ( $object_query instanceof \WP_User ) {
					$args['author'] = $object_query->ID;
				}
			}
		}

		// Handle post inclusion.
		if ( ! empty( $attr['includePost'] ) && is_array( $attr['includePost'] ) ) {
			$args['post__in'] = $this->filter_array( $attr['includePost'] );
		}

		// Handle post exclusion.
		if ( ! empty( $attr['excludePost'] ) && is_array( $attr['excludePost'] ) ) {
			$args['post__not_in'] = $this->filter_array( $attr['excludePost'] );
		}

		// Handle category inclusion with recursive children.
		if ( ! empty( $attr['includeCategory'] ) && is_array( $attr['includeCategory'] ) ) {
			$categories = $this->filter_array( $attr['includeCategory'] );
			$this->recursive_category( $categories, $include_category );
			$args['category__in'] = $include_category;
		}

		// Handle category exclusion with recursive children.
		if ( ! empty( $attr['excludeCategory'] ) && is_array( $attr['excludeCategory'] ) ) {
			$categories = $this->filter_array( $attr['excludeCategory'] );
			$this->recursive_category( $categories, $exclude_category );
			$args['category__not_in'] = $exclude_category;
		}

		// Handle author filter.
		if ( ! empty( $attr['includeAuthor'] ) && is_array( $attr['includeAuthor'] ) ) {
			$args['author__in'] = $this->filter_array( $attr['includeAuthor'] );
		}

		// Handle tag inclusion.
		if ( ! empty( $attr['includeTag'] ) && is_array( $attr['includeTag'] ) ) {
			$args['tag__in'] = $this->filter_array( $attr['includeTag'] );
		}

		// Handle tag exclusion.
		if ( ! empty( $attr['excludeTag'] ) && is_array( $attr['excludeTag'] ) ) {
			$args['tag__not_in'] = $this->filter_array( $attr['excludeTag'] );
		}

		// Handle sorting.
		$sort_by = isset( $attr['sortBy'] ) ? $attr['sortBy'] : 'latest';

		switch ( $sort_by ) {
			case 'latest':
				$args['orderby'] = 'date';
				$args['order']   = 'DESC';
				break;
			case 'oldest':
				$args['orderby'] = 'date';
				$args['order']   = 'ASC';
				break;
			case 'alphabet_asc':
				$args['orderby'] = 'title';
				$args['order']   = 'ASC';
				break;
			case 'alphabet_desc':
				$args['orderby'] = 'title';
				$args['order']   = 'DESC';
				break;
			case 'random':
				$args['orderby'] = 'rand';
				break;
			case 'random_week':
				$args['orderby']    = 'rand';
				$args['date_query'] = array(
					array(
						'after' => '1 week ago',
					),
				);
				break;
			case 'random_month':
				$args['orderby']    = 'rand';
				$args['date_query'] = array(
					array(
						'after' => '1 month ago',
					),
				);
				break;
			case 'most_comment':
				$args['orderby'] = 'comment_count';
				$args['order']   = 'DESC';
				break;
		}

		// Apply filter to allow customization.
		$args = apply_filters( 'gutenverse_default_query_args', $args, $attr );

		// Execute query.
		$query = new \WP_Query( $args );

		$posts = array();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$post_id = get_the_ID();

				// Get primary category.
				$primary_category = null;
				$categories       = get_the_category( $post_id );
				if ( ! empty( $categories ) ) {
					$category         = $categories[0];
					$primary_category = array(
						'name' => $category->name,
						'slug' => $category->slug,
						'url'  => get_category_link( $category->term_id ),
					);
				}

				// Get thumbnail data.
				$thumbnail = null;
				if ( has_post_thumbnail( $post_id ) ) {
					$thumbnail_id = get_post_thumbnail_id( $post_id );
					$image_data   = wp_get_attachment_image_src( $thumbnail_id, 'post-thumbnail' );
					if ( $image_data ) {
						$thumbnail = array(
							'url'    => $image_data[0],
							'width'  => $image_data[1],
							'height' => $image_data[2],
						);
					}
				}

				// Get excerpt.
				$excerpt = get_the_excerpt( $post_id );
				if ( empty( $excerpt ) ) {
					$excerpt = wp_trim_words( get_the_content(), 9999, '...' );
				}

				// Format dates based on user settings.
				$date_type          = isset( $attr['metaDateType'] ) ? $attr['metaDateType'] : 'published';
				$date_format        = isset( $attr['metaDateFormat'] ) ? $attr['metaDateFormat'] : 'default';
				$date_format_custom = isset( $attr['metaDateFormatCustom'] ) ? $attr['metaDateFormatCustom'] : '';

				// Get timestamps.
				$published_time = get_the_time( 'U', $post_id );
				$modified_time  = get_the_modified_time( 'U', $post_id );

				// Format based on date type and format.
				$formatted_date = '';

				if ( 'ago' === $date_format ) {
					// Relative time format.
					if ( 'modified' === $date_type ) {
						$formatted_date = human_time_diff( $modified_time, current_time( 'timestamp' ) ) . ' ago';
					} elseif ( 'both' === $date_type ) {
						$formatted_date = human_time_diff( $published_time, current_time( 'timestamp' ) ) . ' ago - Updated ' . human_time_diff( $modified_time, current_time( 'timestamp' ) ) . ' ago';
					} else {
						$formatted_date = human_time_diff( $published_time, current_time( 'timestamp' ) ) . ' ago';
					}
				} elseif ( 'custom' === $date_format && ! empty( $date_format_custom ) ) {
					// Custom format.
					if ( 'modified' === $date_type ) {
						$formatted_date = get_the_modified_date( $date_format_custom, $post_id );
					} elseif ( 'both' === $date_type ) {
						$formatted_date = get_the_date( $date_format_custom, $post_id ) . ' - Updated on ' . get_the_modified_date( $date_format_custom, $post_id );
					} else {
						$formatted_date = get_the_date( $date_format_custom, $post_id );
					}
				} else {
					// Default WordPress format.
					if ( 'modified' === $date_type ) {
						$formatted_date = get_the_modified_date( '', $post_id );
					} elseif ( 'both' === $date_type ) {
						$formatted_date = get_the_date( '', $post_id ) . ' - Updated on ' . get_the_modified_date( '', $post_id );
					} else {
						$formatted_date = get_the_date( '', $post_id );
					}
				}

				// Get author data.
				$author_id   = get_the_author_meta( 'ID' );
				$author_name = get_the_author_meta( 'display_name', $author_id );
				$author_url  = get_author_posts_url( $author_id );

				// Get comment data.
				$comment_count = get_comments_number( $post_id );
				$comment_url   = get_comments_link( $post_id );

				// Get post classes.
				$post_classes = implode( ' ', get_post_class( 'guten-post', $post_id ) );

				$posts[] = array(
					'id'               => $post_id,
					'title'            => get_the_title( $post_id ),
					'url'              => get_permalink( $post_id ),
					'excerpt'          => $excerpt,
					'thumbnail'        => $thumbnail,
					'primary_category' => $primary_category,
					'author_name'      => $author_name,
					'author_url'       => $author_url,
					'date'             => $formatted_date,
					'comment_count'    => $comment_count,
					'comment_url'      => $comment_url,
					'classes'          => $post_classes,
				);
			}
			wp_reset_postdata();
		}

		return new \WP_REST_Response(
			array(
				'posts'       => $posts,
				'total_pages' => $query->max_num_pages,
			),
			200
		);
	}

	/**
	 * Filter attributes array to extract values.
	 *
	 * @param array $attributes Attributes array.
	 *
	 * @return array
	 */
	private function filter_post_attributes( $attributes ) {
		$accepted = array(
			'postType',
			'numberPost',
			'postOffset',
			'includePost',
			'excludePost',
			'includeCategory',
			'excludeCategory',
			'includeAuthor',
			'includeTag',
			'excludeTag',
			'sortBy',
			'inheritQuery',
			'editParam',
			'metaDateType',
			'metaDateFormat',
			'metaDateFormatCustom',
		);

		$filtered = array();
		foreach ( $attributes as $key => $value ) {
			if ( in_array( $key, $accepted, true ) ) {
				$filtered[ $key ] = $value;
			}
		}

		return $filtered;
	}

	/**
	 * Filter inclusion/exclusion array.
	 *
	 * @param array $arr Inclusion/exclusion array.
	 *
	 * @return array
	 */
	private function filter_array( $arr ) {
		$result = array();

		if ( ! is_array( $arr ) ) {
			return $result;
		}

		foreach ( $arr as $item ) {
			if ( isset( $item['value'] ) ) {
				$result[] = $item['value'];
			}
		}

		return $result;
	}

	/**
	 * Get category and its children recursively.
	 *
	 * @param array $categories Category to be checked.
	 * @param array $result     Result for recursive category.
	 */
	private function recursive_category( $categories, &$result ) {
		foreach ( $categories as $category ) {
			if ( ! in_array( $category, $result, true ) ) {
				$result[] = $category;
				$children = get_categories( array( 'parent' => $category ) );

				if ( ! empty( $children ) ) {
					$child_id = array();
					foreach ( $children as $child ) {
						$child_id[] = $child->term_id;
					}
					$this->recursive_category( $child_id, $result );
				}
			}
		}
	}

	/**
	 * Get ACF field value for editor preview.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_acf_field_value( $request ) {
		$field_key = $request->get_param( 'fieldKey' );
		$post_id   = $request->get_param( 'postId' );

		if ( empty( $field_key ) ) {
			return new \WP_REST_Response(
				array(
					'value' => '',
					'error' => 'Field key is required.',
				),
				400
			);
		}

		if ( ! function_exists( 'get_field' ) ) {
			return new \WP_REST_Response(
				array(
					'value' => '',
					'error' => 'ACF plugin is not active.',
				),
				400
			);
		}

		// Use current post if not specified.
		if ( empty( $post_id ) ) {
			$post_id = get_the_ID();
		}

		$value = get_field( $field_key, $post_id );

		// Handle different field types.
		$formatted_value = $value;
		$field_type      = 'text';

		if ( is_array( $value ) ) {
			// Could be image object, link array, repeater, etc.
			if ( isset( $value['url'] ) && isset( $value['title'] ) ) {
				// Link field.
				$field_type      = 'link';
				$formatted_value = $value;
			} elseif ( isset( $value['url'] ) && isset( $value['ID'] ) ) {
				// Image object.
				$field_type      = 'image';
				$formatted_value = array(
					'url' => $value['url'],
					'alt' => isset( $value['alt'] ) ? $value['alt'] : '',
				);
			} else {
				// Generic array, convert to string.
				$formatted_value = wp_json_encode( $value );
			}
		} elseif ( is_numeric( $value ) && wp_get_attachment_url( $value ) ) {
			// Could be image ID.
			$field_type      = 'image';
			$formatted_value = array(
				'url' => wp_get_attachment_url( $value ),
				'alt' => get_post_meta( $value, '_wp_attachment_image_alt', true ),
			);
		}

		return new \WP_REST_Response(
			array(
				'value' => $formatted_value,
				'type'  => $field_type,
				'raw'   => $value,
			),
			200
		);
	}
}
