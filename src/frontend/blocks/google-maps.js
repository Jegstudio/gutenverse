import { Default, u } from 'gutenverse-core-frontend';

class GutenverseMaps extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addScriptBlur(element);
        });
    }

    /* private */
    _addScriptBlur(element) {
        const targetElement = u(element).find('iframe');
        const src = u(element).data('src');
        targetElement.each(iframe => {
            // Set iframe source
            setTimeout(() => {
                u(iframe).attr('src', src);
            }, 500);
        });
    }
}

const selected = u('.guten-maps');

if (selected) {
    new GutenverseMaps(selected);
}