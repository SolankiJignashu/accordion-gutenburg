/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { TextControl, TextareaControl } from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// console.log(attributes);
	const blockProps = useBlockProps();
	 let sample = {
		'id': 1,
		'heading': 'Heading Sample ',
		'description': 'Description Sample' 
	};
	if(attributes.data && attributes.data.length <= 0){
		attributes.data.push(sample);
	}
	
	// Show the loading state if we're still waiting.
		// {
		// 	data && data.map(d => {
		// 		console.log(d);
		// 		const sample = {
		// 			'id': d.id,
		// 			'heading': 'Heading ' + d.title.rendered,
		// 			'description': 'Description ' + d.id
		// 		}
		// 		attributes.data.push(sample);
		// 	})
		// 	setAttributes({ data: attributes.data });
		// }
	
	const handleHeadingChange = (name, id) => {
		const carList = [...attributes.data];
		const index = _.findIndex(carList, { id: id });

		carList[index].heading = name;
		setAttributes({ data: carList });
	}
	const handleDescriptionChange = (name, id) => {
		const carList = [...attributes.data];
		// console.log(carList)
		const index = _.findIndex(carList, { id: id });

		carList[index].description = name;
		length = carList.length + 1;
		// console.log(length)

		// carList[length-1].heading = 'new heading';
		// carList[length-1].id = length;
		// carList[length-1].description = 'new heading';
		// console.log(carList)
		setAttributes({ data: carList });
	}
	const showBlocks = (attributes) => {
		attributes.data.map(d => {
			console.log(d);
			return [
				<TextControl
					label={`Heading ${d.id}`}
					value={d.heading}
					onChange={name => handleHeadingChange(name, d.id)}
				/>,
				<TextareaControl
					label={`Description ${d.id}`}
					value={d.description}
					onChange={description => handleDescriptionChange(description, d.id)}
				/>
			]

		})
	}
	const addMore = () => {
		const sample = {
			'id': (attributes.data.length + 1),
			'heading': 'Heading ' + (attributes.data.length + 1),
			'description': 'Description ' + (attributes.data.length + 1)
		}
		attributes.data.push(sample);
		console.log(attributes)
		setAttributes({ data: attributes.data, date: new Date });
	}
	const removeLast = () => {

		attributes.data.pop();
		// console.log(attributes)
		setAttributes({ data: attributes.data, date: new Date });
	}
	
	// return (
	// 	<div { ...blockProps }>
	// 		<TextControl
	// 			value={ attributes.message }
	// 			onChange={ ( val ) => setAttributes( { message: val } ) }
	// 		/>
	// 	</div>
	// );
	return [
		<div {...blockProps}>
			{
				
				// attributes.data.push(sample);
				attributes.data && attributes.data.map(d => {
					console.log(d)
					return [
						<TextControl
							label={`Heading ${d.id}`}
							value={d.heading}
							onChange={name => handleHeadingChange(name, d.id)}
						/>,
						<TextareaControl
							label={`Description ${d.id}`}
							value={d.description}
							onChange={description => handleDescriptionChange(description, d.id)}
						/>
					]

				})
			}
		</div>,
		<input type="button" onClick={addMore} value="Add More" />,
		<input type="button" onClick={removeLast} value="Remove Last" />
	];
}
