<?php
/**
 * Style Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Style\Accordion;
use Gutenverse\Style\Accordions;
use Gutenverse\Style\Advanced_Heading;
use Gutenverse\Style\Animated_Text;
use Gutenverse\Style\Archive_Title;
use Gutenverse\Style\Breadcrumb;
use Gutenverse\Style\Button;
use Gutenverse\Style\Buttons;
use Gutenverse\Style\Countdown;
use Gutenverse\Style\Divider;
use Gutenverse\Style\Feature_List;
use Gutenverse\Style\Fun_Fact;
use Gutenverse\Style\Gallery;
use Gutenverse\Style\Google_Maps;
use Gutenverse\Style\Heading;
use Gutenverse\Style\Icon;
use Gutenverse\Style\Icon_Box;
use Gutenverse\Style\Icon_List;
use Gutenverse\Style\Icon_List_Item;
use Gutenverse\Style\Image;
use Gutenverse\Style\Image_Box;
use Gutenverse\Style\Logo_Slider;
use Gutenverse\Style\Nav_Menu;
use Gutenverse\Style\Chart;
use Gutenverse\Style\Post_Author;
use Gutenverse\Style\Post_Block;
use Gutenverse\Style\Post_Comment;
use Gutenverse\Style\Post_Date;
use Gutenverse\Style\Post_Excerpt;
use Gutenverse\Style\Post_Featured_Image;
use Gutenverse\Style\Post_List;
use Gutenverse\Style\Post_Terms;
use Gutenverse\Style\Post_Title;
use Gutenverse\Style\Post_Content;
use Gutenverse\Style\Progress_Bar;
use Gutenverse\Style\Social_Icon;
use Gutenverse\Style\Social_Icons;
use Gutenverse\Style\Social_Share;
use Gutenverse\Style\Social_Share_Item;
use Gutenverse\Style\Spacer;
use Gutenverse\Style\Star_Rating;
use Gutenverse\Style\Style_Abstract;
use Gutenverse\Style\Tab;
use Gutenverse\Style\Tabs;
use Gutenverse\Style\Team;
use Gutenverse\Style\Testimonials;
use Gutenverse\Style\Text_Editor;
use Gutenverse\Style\Video;
use Gutenverse\Style\Popup_Builder;
use Gutenverse\Style\Portfolio_Gallery;
use Gutenverse\Style\Search;
use Gutenverse\Style\Search_Result_Title;
use Gutenverse\Style\Taxonomy_List;
use Gutenverse\Style\Text;

/**
 * Class Style Generator
 *
 * @package gutenverse
 */
class Style_Generator {
	/**
	 * Font Families
	 *
	 * @var array
	 */
	protected $font_families = array();

	/**
	 * Font Variables
	 *
	 * @var array
	 */
	protected $font_variables = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_style_instance', array( $this, 'get_block_style_instance' ), 10, 3 );
	}

	/**
	 * Get Block Style Instance.
	 *
	 * @param object $instance Block Instance.
	 * @param string $name Block Name.
	 * @param array  $attrs Block Attribute.
	 *
	 * @return Style_Abstract
	 */
	public function get_block_style_instance( $instance, $name, $attrs ) {
		switch ( $name ) {
			case 'gutenverse/archive-title':
				$instance = new Archive_Title( $attrs );
				break;
			case 'gutenverse/accordion':
				$instance = new Accordion( $attrs );
				break;
			case 'gutenverse/accordions':
				$instance = new Accordions( $attrs );
				break;
			case 'gutenverse/advanced-heading':
				$instance = new Advanced_Heading( $attrs );
				break;
			case 'gutenverse/animated-text':
				$instance = new Animated_Text( $attrs );
				break;
			case 'gutenverse/breadcrumb':
				$instance = new Breadcrumb( $attrs );
				break;
			case 'gutenverse/taxonomy-list':
				$instance = new Taxonomy_List( $attrs );
				break;
			case 'gutenverse/logo-slider':
				$instance = new Logo_Slider( $attrs );
				break;
			case 'gutenverse/feature-list':
				$instance = new Feature_List( $attrs );
				break;
			case 'gutenverse/fun-fact':
				$instance = new Fun_Fact( $attrs );
				break;
			case 'gutenverse/heading':
				$instance = new Heading( $attrs );
				break;
			case 'gutenverse/divider':
				$instance = new Divider( $attrs );
				break;
			case 'gutenverse/tab':
				$instance = new Tab( $attrs );
				break;
			case 'gutenverse/tabs':
				$instance = new Tabs( $attrs );
				break;
			case 'gutenverse/video':
				$instance = new Video( $attrs );
				break;
			case 'gutenverse/button':
				$instance = new Button( $attrs );
				break;
			case 'gutenverse/buttons':
				$instance = new Buttons( $attrs );
				break;
			case 'gutenverse/google-maps':
				$instance = new Google_Maps( $attrs );
				break;
			case 'gutenverse/icon':
				$instance = new Icon( $attrs );
				break;
			case 'gutenverse/gallery':
				$instance = new Gallery( $attrs );
				break;
			case 'gutenverse/icon-box':
				$instance = new Icon_Box( $attrs );
				break;
			case 'gutenverse/icon-list':
				$instance = new Icon_List( $attrs );
				break;
			case 'gutenverse/icon-list-item':
				$instance = new Icon_List_Item( $attrs );
				break;
			case 'gutenverse/post-author':
				$instance = new Post_Author( $attrs );
				break;
			case 'gutenverse/post-comment':
				$instance = new Post_Comment( $attrs );
				break;
			case 'gutenverse/post-date':
				$instance = new Post_Date( $attrs );
				break;
			case 'gutenverse/post-excerpt':
				$instance = new Post_Excerpt( $attrs );
				break;
			case 'gutenverse/post-featured-image':
				$instance = new Post_Featured_Image( $attrs );
				break;
			case 'gutenverse/post-terms':
				$instance = new Post_Terms( $attrs );
				break;
			case 'gutenverse/post-title':
				$instance = new Post_Title( $attrs );
				break;
			case 'gutenverse/post-content':
				$instance = new Post_Content( $attrs );
				break;
			case 'gutenverse/post-block':
				$instance = new Post_Block( $attrs );
				break;
			case 'gutenverse/post-list':
				$instance = new Post_List( $attrs );
				break;
			case 'gutenverse/image':
				$instance = new Image( $attrs );
				break;
			case 'gutenverse/image-box':
				$instance = new Image_Box( $attrs );
				break;
			case 'gutenverse/testimonials':
				$instance = new Testimonials( $attrs );
				break;
			case 'gutenverse/nav-menu':
				$instance = new Nav_Menu( $attrs );
				break;
			case 'gutenverse/chart':
				$instance = new Chart( $attrs );
				break;
			case 'gutenverse/progress-bar':
				$instance = new Progress_Bar( $attrs );
				break;
			case 'gutenverse/popup-builder':
				$instance = new Popup_Builder( $attrs );
				break;
			case 'gutenverse/social-icon':
				$instance = new Social_Icon( $attrs );
				break;
			case 'gutenverse/social-icons':
				$instance = new Social_Icons( $attrs );
				break;
			case 'gutenverse/spacer':
				$instance = new Spacer( $attrs );
				break;
			case 'gutenverse/star-rating':
				$instance = new Star_Rating( $attrs );
				break;
			case 'gutenverse/text-editor':
				$instance = new Text_Editor( $attrs );
				break;
			case 'gutenverse/text-paragraph':
				$instance = new Text( $attrs );
				break;
			case 'gutenverse/team':
				$instance = new Team( $attrs );
				break;
			case 'gutenverse/social-share':
				$instance = new Social_Share( $attrs );
				break;
			case 'gutenverse/search':
				$instance = new Search( $attrs );
				break;
			case 'gutenverse/countdown':
				$instance = new Countdown( $attrs );
				break;
			case 'gutenverse/search-result-title':
				$instance = new Search_Result_Title( $attrs );
				break;
			case 'gutenverse/portfolio-gallery':
				$instance = new Portfolio_Gallery( $attrs );
				break;
			case 'gutenverse/social-share-facebook':
			case 'gutenverse/social-share-twitter':
			case 'gutenverse/social-share-pinterest':
			case 'gutenverse/social-share-stumbleupon':
			case 'gutenverse/social-share-linkedin':
			case 'gutenverse/social-share-reddit':
			case 'gutenverse/social-share-tumblr':
			case 'gutenverse/social-share-vk':
			case 'gutenverse/social-share-whatsapp':
			case 'gutenverse/social-share-telegram':
			case 'gutenverse/social-share-wechat':
			case 'gutenverse/social-share-line':
			case 'gutenverse/social-share-email':
				$instance = new Social_Share_Item( $attrs );
				break;
		}

		return $instance;
	}
}
