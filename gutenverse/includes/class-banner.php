<?php
/**
 * Banner
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Meta_Option;

/**
 * Class Banner
 *
 * @package gutenverse
 */
class Banner {
	/**
	 * How Long timeout until first banner shown.
	 *
	 * @var int
	 */
	private $first_time_show = 3;

	/**
	 * How Long timeout after first banner shown.
	 *
	 * @var int
	 */
	private $another_time_show = 7;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'wp_ajax_gutenverse_notice_close', array( $this, 'close' ) );
		add_action( 'wp_ajax_gutenverse_notice_review', array( $this, 'review' ) );

		// Filter.
		add_filter( 'gutenverse_initial_meta_option', array( $this, 'initial_option' ) );
	}

	/**
	 * Initial Option.
	 *
	 * @param string $options inital option.
	 *
	 * @return array
	 */
	public function initial_option( $options ) {
		$time = get_option( 'gutenverse_active_time' );

		if ( false === $time ) {
			$options['next_review_time'] = time() + $this->get_second( $this->first_time_show );
			$options['review_flag']      = false;
		} else {
			// Migrate to new meta option.
			if ( 'review' === $time ) {
				$options['review_flag'] = true;
				unset( $options['next_review_time'] );
			} else {
				$options['next_review_time'] = $time;
				$options['review_flag']      = false;
			}
		}

		return $options;
	}

	/**
	 * Enqueue Script.
	 */
	public function enqueue_script() {
		wp_enqueue_style( 'fontawesome-gutenverse' );
	}

	/**
	 * Get Second by days.
	 *
	 * @param int $days Days Number.
	 *
	 * @return int
	 */
	public function get_second( $days ) {
		return $days * 24 * 60 * 60;
	}

	/**
	 * Check if we can render notice.
	 */
	public static function can_render_notice() {
		$flag = Meta_Option::instance()->get_option( 'review_flag' );

		if ( $flag ) {
			return false;
		} else {
			$next_review_time = Meta_Option::instance()->get_option( 'next_review_time' );
			return time() > $next_review_time;
		}
	}

	/**
	 * Close Button Clicked.
	 */
	public function close() {
		$next_time = time() + $this->get_second( $this->another_time_show );
		Meta_Option::instance()->set_option( 'next_review_time', $next_time );
	}

	/**
	 * Review Button Clicked.
	 */
	public function review() {
		Meta_Option::instance()->set_option( 'review_flag', true );
	}
}
