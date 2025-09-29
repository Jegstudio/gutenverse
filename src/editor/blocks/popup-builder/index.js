
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconPopupBuilderSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconPopupBuilderSVG />,
    example,
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
        },
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
            save: saveV2
        },
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
                const { openWaitTime, openScrollDistance, openMaxClick, rebuild } = attributes;
                const newAttributes = {
                    ...attributes,
                    openWaitTime: parseInt(openWaitTime),
                    openScrollDistance: parseInt(openScrollDistance),
                    openMaxClick: parseInt(openMaxClick),
                    rebuild,
                    popupType: 'default',
                    popupVideoSrc: '',
                    popupVideoStart: 0,
                    popupVideoEnd: 0,
                    popupVideoHideControls: false,
                    popupVideoPauseOnClose: false,
                    popupVideoResetOnClose: false,
                    popupVideoMuted: false,
                    popupVideoLoop:false,
                    popupVideoPlayOn: 'click'
                };

                return [
                    newAttributes
                ];
            },
            save: saveV3
        }
    ]
};
