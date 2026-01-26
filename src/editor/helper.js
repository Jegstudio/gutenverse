const defImageLoad = {
    eager: {
        label: 'Normal Load',
        value: 'eager',
    },
    lazy: {
        label: 'Lazy Load',
        value: 'lazy',
    }
};

/**
 * 
 * @param {string} imageLoad ImageLoad attribute
 * @param {boolean} isLazy old lazyLoad attribute
 * @returns {Object}
 */
export const getDefaultImageLoad = (imageLoad = '', isLazy = false) => {
    if (imageLoad.length > 1) {
        return defImageLoad[imageLoad]
    }
    if (isLazy) {
        return defImageLoad.lazy
    }
    const {
        defaultImageLoad = 'eager'
    } = window['GutenverseConfig'];
    return defImageLoad[defaultImageLoad];
}
/**
 * 
 * @param {Object} item Repeater item value, make sure using imageLoad and lazyLoad attribute on the repeater options.
 * @returns {Object}
 */
export const getDefaultImageLoadRepeater = (item) => {
    const {
        imageLoad = '',
        lazyLoad = false
    } = item;
    if (imageLoad.length > 1) {
        return defImageLoad[imageLoad]
    }
    if (lazyLoad) {
        return defImageLoad.lazy
    }
    const {
        defaultImageLoad = 'eager'
    } = window['GutenverseConfig'];
    return defImageLoad[defaultImageLoad];
}

/**
 * 
 * @param {string} imageLoad ImageLoad attribute
 * @param {boolean} isLazy old lazyLoad attribute
 * @returns {string}
 */
export const getImageLoadValue = (imageLoad = '', isLazy = false) => {
    if (imageLoad.length > 1) {
        return defImageLoad[imageLoad].value
    }
    if (isLazy) {
        return 'lazy'
    }
    const {
        defaultImageLoad = 'eager'
    } = window['GutenverseConfig'];
    return defaultImageLoad;
}
