import { Default, u } from 'gutenverse-core-frontend';

class GutenverseTabs extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._tabItems(element);
        });
    }

    /* private */
    _tabItems(element) {
        const blockElement = u(element);
        const items = {
            headingItems: blockElement.find('.tab-heading-item'),
            bodyItems: blockElement.find('.tab-body-item'),
            mobileTabs: blockElement.find('.tab-heading-mobile'),
            mobileLabel: blockElement.find('.tab-title span'),
            mobileItems: blockElement.find('.tab-option-item'),
        };

        this._addClickEvents(items);
    }

    _addClickEvents(items) {
        items.headingItems.on('click', e => {
            const id = u(e.currentTarget).data('id');
            this._activateTab(id, items);
        });

        items.mobileItems.on('click', e => {
            const id = u(e.currentTarget).data('id');
            this._activateTab(id, items);
        });

        items.mobileTabs.on('click', e => {
            const mobileTab = u(e.currentTarget);
            if(mobileTab.hasClass('open')) {
                mobileTab.removeClass('open');
            } else {
                mobileTab.addClass('open');
            }
        });

        items.headingItems.map( heading => {
            if (u(heading).hasClass('active')) {
                items.bodyItems.map(body => {
                    if (u(body).data('id') === u(heading).data('id')) {
                        u(body).addClass('active');
                    }
                });
            }
        });
    }

    _activateHeading(tabId, items) {
        items.headingItems.map(item => {
            const headingItem = u(item);
            const action = headingItem.data('id') === tabId ? 'addClass' : 'removeClass';
            headingItem[action]('active');
        });
    }

    _activateBody(tabId, items) {
        items.bodyItems.map(item => {
            const bodyItem = u(item);
            const action = bodyItem.data('id') === tabId ? 'addClass' : 'removeClass';
            bodyItem[action]('active');
        });
    }

    _activateMobile(tabId, items) {
        items.mobileItems.map(item => {
            const mobileItem = u(item);
            const action = mobileItem.data('id') === tabId ? 'addClass' : 'removeClass';
            mobileItem[action]('active');

            if (mobileItem.data('id') === tabId) {
                const itemText = mobileItem.children();
                items.mobileLabel.html(itemText.html());
            }
        });
    }

    _activateTab(tabId, items) {
        this._activateHeading(tabId, items);
        this._activateBody(tabId, items);
        this._activateMobile(tabId, items);
    }
}

const selected = u('.guten-tabs');

if (selected) {
    new GutenverseTabs(selected);
}
