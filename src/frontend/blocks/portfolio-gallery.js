import { Default, u } from 'gutenverse-core-frontend';

class GutenversePortfolioGallery extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this.__handleAction(element);
        });
    }

    /* private */
    __handleAction(element){
        const blockElement = u(element);
        const behavior = blockElement.data('behavior');
        const rowItems = blockElement.find('.row-item');
        switch (behavior) {
            case 'onclick':
                this.__handleBehavior('click',rowItems, blockElement);
                break;
            case 'onhover':
            default:
                this.__handleBehavior('mouseover',rowItems, blockElement);
                break;
        }
    }
    __handleBehavior(behavior,rows, blockElement){
        rows.on(behavior, (e) => {
            this.__removeClass(rows, blockElement);
            this.__addClass(e.currentTarget, blockElement);
        });
    }
    __removeClass(rows, blockElement){
        rows.each(el => {
            const current = u(el);
            if(current.hasClass('current-item')){
                current.removeClass('current-item');
                const image = current.data('tab');
                const imageEl = blockElement.find(`#${image}`);
                if(imageEl && imageEl.hasClass('current-item')){
                    imageEl.removeClass('current-item');
                }
            }
        });
    }
    __addClass(target, blockElement){
        const current = u(target);
        current.addClass('current-item');
        const image = current.data('tab');
        const imageEl = blockElement.find(`#${image}`);
        if(imageEl && !imageEl.hasClass('current-item')){
            imageEl.addClass('current-item');
        }
    }
}

const selected = u('.guten-portfolio-gallery');

if (selected) {
    new GutenversePortfolioGallery(selected);
}
