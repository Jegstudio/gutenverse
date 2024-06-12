
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconTeamSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconTeamSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                overlayType: {
                    type: 'string',
                    deprecated: true,
                },
                overlayPosition: {
                    type: 'string',
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { overlayType, overlayPosition } = attributes;
                const newAttributes = {
                    ...attributes,
                    overlayType: overlayType === undefined ? 'default' : overlayType,
                    overlayPosition: overlayPosition === undefined ? 'center' : overlayPosition,
                };
                return [
                    newAttributes
                ];
            },
            save: saveV1
        }
    ]
};
