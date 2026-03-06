import { Default, u } from 'gutenverse-core-frontend';

class GutenverseTestimonials extends Default {
    /* public */
    init() {
        const elements = this._elements;
        if (elements.length > 0) {
            const promiseSwiper = import(/* webpackChunkName: "chunk-swiper" */'swiper');
            const promiseSwiperModule = import(/* webpackChunkName: "chunk-swiper-modules" */'swiper/modules');
            Promise.all([promiseSwiper, promiseSwiperModule]).then(result => {
                const { default: Swiper } = result[0];
                const { Autoplay, Navigation, Pagination } = result[1];

                Swiper.use([Autoplay, Navigation, Pagination]);
                elements.map(element => {
                    this._addSliderEffect(element, Swiper);
                });
            });
        }
    }

    /* private */
    _addSliderEffect(element, Swiper) {
        const sliderContainer = u(element).find('.swiper-container');
        const id = sliderContainer.attr('id');
        const loop = sliderContainer.data('loop');
        const autoplay = sliderContainer.data('autoplay');
        const timeout = sliderContainer.data('timeout');
        const nav = sliderContainer.data('nav');
        const arrow = sliderContainer.data('arrow');
        const breakpoints = sliderContainer.data('breakpoints');

        const isTrue = (val) => val === 'true';

        const settings = {
            loop: isTrue(loop),
            autoplay: isTrue(autoplay) ? {
                delay: parseInt(timeout)
            } : false,
            navigation: isTrue(arrow) ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,
            pagination: isTrue(nav) ? {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            } : false,
            breakpoints: this.swiperBreakpoint(JSON.parse(breakpoints))
        };

        new Swiper(`.${id} .swiper-container`, settings);
    }
}

const selected = u('.guten-testimonials');

if (selected) {
    new GutenverseTestimonials(selected);
}

const elementPlaceholder = u('[data-image-placeholder]');
const { image_placeholder } = window['GutenverseFrontendConfig'];
elementPlaceholder.nodes.map(element => {
    const data = u(element).data('image-placeholder');
    if('gutenverse-image-placeholder' === data){
        u(element).attr('src', image_placeholder);
    }
});