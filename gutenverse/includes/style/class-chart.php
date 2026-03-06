<?php
/**
 * Gutenverse Chart
 *
 * @author Jegstudio
 * @since 2.2.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Chart
 *
 * @package gutenverse\style
 */
class Chart extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'chart';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'transform'   => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['contentOrder'] ) ) {
			$orders = $this->attrs['contentOrder'];
			$orders  = explode( ',', $orders );

			if ( 3 !== count( $orders ) ) {
				$orders = array( 1, 2, 3 );
			}

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-title",
					'property'       => function ( $value ) use ( $orders ) {
						return "order: {$orders[0]};";
					},
					'value'          => $this->attrs['contentOrder'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-inside",
					'property'       => function ( $value ) use ( $orders ) {
						return "order: {$orders[1]};";
					},
					'value'          => $this->attrs['contentOrder'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-description",
					'property'       => function ( $value ) use ( $orders ) {
						return "order: {$orders[2]};";
					},
					'value'          => $this->attrs['contentOrder'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['enableContentParsed'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card",
					'property'       => function ( $value ) {
						return 'false' === $value ? 'display: none;' : '';
					},
					'value'          => $this->attrs['enableContentParsed'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-chart-wrapper, .{$this->element_id}.Mobile-noFlip .guten-chart-wrapper, .{$this->element_id}.Desktop-noFlip .guten-chart-wrapper, .{$this->element_id}.Tablet-noFlip .guten-chart-wrapper",
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['contentType'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['chartContentAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-chart",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['chartContentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['chartContainerSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-chart",
					'property'       => function ( $value ) {
						return "width: {$value}% !important;";
					},
					'value'          => $this->attrs['chartContainerSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['chartSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} canvas",
					'property'       => function ( $value ) {
						return "height: {$value}px !important; width: {$value}px !important;";
					},
					'value'          => $this->attrs['chartSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-inside.type-doughnut, .{$this->element_id} .chart-container",
					'property'       => function ( $value ) {
						return "width: {$value}px !important;";
					},
					'value'          => $this->attrs['chartSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['indicatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-inside > *",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['indicatorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['indicatorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-inside > *",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['indicatorTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .chart-content.content-card, .{$this->element_id}.Desktop-noFlip .chart-content.content-card, .{$this->element_id}.Tablet-noFlip .chart-content.content-card, .{$this->element_id}.Mobile-noFlip .chart-content.content-card", $this->attrs['cardBackground'] );
		}

		if ( isset( $this->attrs['paddingCard'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingCard'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['cardBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['cardBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['indicatorIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-inside > i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['indicatorIconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content .chart-inside svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'Width' );
					},
					'value'          => $this->attrs['indicatorIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['cardBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['cardBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardTitleAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-title,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-title",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['cardTitleAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['cardTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-title,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['cardTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-title,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['cardTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardTitleTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-title,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['cardTitleTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginCardTitle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-title,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginCardTitle'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['cardDescriptionAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-description,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-description",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['cardDescriptionAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['cardDescriptionColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-description,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-description",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['cardDescriptionColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardDescriptionTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-description,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-description",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['cardDescriptionTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['cardDescriptionTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-description,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-description",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['cardDescriptionTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginCardDescription'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .chart-content.content-card .chart-description,
                        .{$this->element_id}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .{$this->element_id}.Mobile-noFlip .chart-content.content-card .chart-description",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginCardDescription'],
					'device_control' => true,
				)
			);
		}
	}
}
