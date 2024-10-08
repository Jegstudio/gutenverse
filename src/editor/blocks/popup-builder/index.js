
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconPopupBuilderSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconPopupBuilderSVG />,
    example: example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                openWaitTime: {
                    type: 'int',
                    deprecated: true,
                },
                openScrollDistance: {
                    type: 'int',
                    deprecated: true,
                },
                openMaxClick: {
                    type: 'int',
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { openWaitTime, openScrollDistance, openMaxClick } = attributes;
                const newAttributes = {
                    ...attributes,
                    openWaitTime: parseInt(openWaitTime),
                    openScrollDistance: parseInt(openScrollDistance),
                    openMaxClick: parseInt(openMaxClick)
                };

                return [
                    newAttributes
                ];
            },
            save: saveV1
        }
    ]
};
