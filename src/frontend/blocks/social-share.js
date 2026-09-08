import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSocialShare extends Default {
    init() {
        this._elements.map(element => {
            this._setupMoreButton(element);
        });
    }

    _setupMoreButton(element) {
        const blockElement = u(element);
        const moreButton = blockElement.find('.gutenverse-share-more-toggle').first();

        if (!moreButton) {
            return;
        }

        const visibleButtonCount = parseInt(moreButton.dataset.visibleButtonCount, 10) || 2;
        const shareItems = Array.from(element.children).filter(child => {
            return child.classList.contains('gutenverse-share-item') || child.classList.contains('guten-social-share-item-wrapper');
        });
        const hiddenItems = shareItems.slice(visibleButtonCount);

        if (!hiddenItems.length) {
            moreButton.style.display = 'none';
            return;
        }

        moreButton.addEventListener('click', () => {
            const expanded = blockElement.hasClass('is-expanded');

            if (expanded) {
                blockElement.removeClass('is-expanded');
                moreButton.setAttribute('aria-expanded', 'false');
            } else {
                blockElement.addClass('is-expanded');
                moreButton.setAttribute('aria-expanded', 'true');
            }
        });
    }
}

const selected = u('.guten-social-share.has-more-toggle');

if (selected) {
    new GutenverseSocialShare(selected);
}
