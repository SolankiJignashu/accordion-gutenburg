<?php

/**
 * Plugin Name:       Accordion
 * Description:       Add Accordion for block
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            Jignashu Solanki
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion
 *
 * @package           custom
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function custom_accordion_block_init()
{
	register_block_type(__DIR__ . '/build', array(
		'script' => 'jquery-ui-accordion',
	));
}
add_action('init', 'custom_accordion_block_init');

function myguten_enqueue_scripts()
{
	wp_enqueue_script(
		'myguten-script',
		plugins_url('acc.js', __FILE__),
		array('jquery-ui-accordion')
	); ?>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
<?php
}
add_action('enqueue_block_assets', 'myguten_enqueue_scripts');
