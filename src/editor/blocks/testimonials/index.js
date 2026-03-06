
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
import saveV5 from './deprecated/v5/save';
import { IconTestimonialSVG } from '../../../assets/icon/index';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconTestimonialSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV1
        },
        {
            attributes,
            supports,
            save: saveV2
        },
        {
            attributes,
            supports,
            save: saveV3
        },
        {
            attributes,
            supports,
            save: saveV4
        },
        {
            attributes: {
                ...attributes,
                testimonialData: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            lazy: { type: 'boolean' }
                        }
                    }
                }
            },
            supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    testimonialData: attributes.testimonialData?.map((item) => {
                        return {
                            ...item,
                            lazy: item.lazy === true ? 'lazy' : 'normal'
                        };
                    })
                };
            },
            save: saveV5,
        },
    ]
};
