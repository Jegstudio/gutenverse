<?php
/**
 * Blocks class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Blocks
 *
 * @package gutenverse
 */
class Blocks {
	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ), 99 );
		add_filter( 'gutenverse_block_categories', array( $this, 'block_category' ) );
	}

	/**
	 * Block Category
	 *
	 * @param array $categories Block Categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {
		$categories['gutenverse-element'] = __( 'Gutenverse Element', 'gutenverse' );
		$categories['gutenverse-post']    = __( 'Gutenverse Post', 'gutenverse' );

		return $categories;
	}

	/**
	 * Register All Blocks
	 */
	public function register_blocks() {
		// Static block.
		register_block_type( GUTENVERSE_DIR . './block/accordion/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/accordions/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/divider/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/animated-text/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/tab/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/tabs/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/video/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/fun-fact/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/heading/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/advanced-heading/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/button/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/buttons/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/icon/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/icon-box/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/gallery/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/icon-list/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/icon-list-item/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/image/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/image-box/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/testimonials/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/progress-bar/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/social-icon/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/social-icons/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/spacer/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/star-rating/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/text-editor/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/team/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/social-share/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/search/block.json' );
		register_block_type( GUTENVERSE_DIR . './block/text-paragraph/block.json' );

		// Dynamic blocks.
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-author/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-comment/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-date/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-excerpt/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-featured-image/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-terms/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-title/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-content/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-block/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/post-list/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/nav-menu/block.json' );
		$this->register_dynamic_block( GUTENVERSE_DIR . './block/archive-title/block.json' );

		// Social Share Block.
		$this->register_social_share_block( GUTENVERSE_DIR . './block/social-share-item/block.json' );
	}

	/**
	 * Register dynamic block.
	 *
	 * @param string $json .
	 */
	private function register_dynamic_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json = gutenverse_get_json( $json );

		if ( isset( $block_json['class_callback'] ) ) {
			$instance = new $block_json['class_callback']();

			register_block_type(
				$json,
				array(
					'render_callback' => array( $instance, 'render' ),
				)
			);
		}
	}

	/**
	 * Register social share block.
	 *
	 * @param string $json .
	 */
	private function register_social_share_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json = gutenverse_get_json( $json );

		$socials = array(
			'facebook',
			'twitter',
			'pinterest',
			'stumbleupon',
			'linkedin',
			'reddit',
			'tumblr',
			'vk',
			'whatsapp',
			'telegram',
			'wechat',
			'line',
			'email',
		);

		foreach ( $socials as $social ) {
			$class    = '\\Gutenverse\\Block\\Social_Share_' . ucfirst( $social );
			$instance = new $class();

			$data = array_merge(
				$block_json,
				array(
					'title'           => 'Gutenverse Social Share ' . ucfirst( $social ),
					'description'     => 'Gutenverse Social Share ' . ucfirst( $social ),
					'render_callback' => array( $instance, 'render' ),
					'attributes'      => array_merge(
						$block_json['attributes'],
						array(
							'text' => array(
								'type'    => 'string',
								'default' => 'Share on ' . ucfirst( $social ),
							),
							'type' => array(
								'type'    => 'string',
								'default' => '' . ucfirst( $social ),
							),
						)
					),
					'keywords'        => array_merge(
						$block_json['keywords'],
						array( $social )
					),
				)
			);

			register_block_type(
				'gutenverse/social-share-' . $social,
				$data
			);
		}
	}
}
