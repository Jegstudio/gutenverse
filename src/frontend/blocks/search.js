import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSearch extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this.__searchItems(element);
        });
    }

    /* private */
    __searchItems(element){
        const blockElement = u(element);
        const items = {
            form: blockElement.find('.gutenverse-search-form'),
            inputField: blockElement.find('.gutenverse-search-form').find('.gutenverse-search-input'),
            closeIcon: blockElement.find('.gutenverse-search-form').find('.close-icon'),
        };

        this.__firstLoad(items);
        this.__addActionToForm(items.form);
        this.__addClickEvents(items);
    }

    __firstLoad(items){
        items.closeIcon.first().style.visibility = 'hidden';
    }

    __addActionToForm(form){
        form.attr('action', window?.GutenverseData?.homeUrl);
    }

    __addClickEvents(items){
        items.closeIcon.on('click', () => {
            items.inputField.first().value = '';
            items.closeIcon.first().style.visibility = 'hidden';
        });

        items.inputField.on('input', (event) => {
            const value = event.target.value;
            items.closeIcon.first().style.visibility = value !== '' ? 'visible' : 'hidden';
        });
    }
}

const selected = u('.guten-search');

if (selected) {
    new GutenverseSearch(selected);
}
