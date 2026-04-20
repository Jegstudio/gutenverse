import { Default, u } from 'gutenverse-core-frontend';

class GutenverseTeam extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addClickEvent(element);
        });
    }

    /* private */
    _addClickEvent(element) {
        const blockElement = u(element);
        const popupElement = blockElement.find('.profile-popup');
        const name = popupElement.data('name');
        const job = popupElement.data('job');
        const img = popupElement.data('img');
        const desc = popupElement.data('desc');
        const phone = popupElement.data('phone');
        const email = popupElement.data('email');

        popupElement.html(this._popupElement(blockElement, {
            name,
            job,
            img,
            desc,
            phone,
            email
        }));

        blockElement.find('.profile-box .popup').on('click', function() {
            if (!popupElement.hasClass('show')) {
                popupElement.addClass('show');
            }
        });

        blockElement.find('.profile-popup .overlay').on('click', function() {
            if (popupElement.hasClass('show')) {
                popupElement.removeClass('show');
            }
        });

        blockElement.find('.profile-popup .popup-close').on('click', function() {
            if (popupElement.hasClass('show')) {
                popupElement.removeClass('show');
            }
        });
    }

    _popupElement(blockElement, {img = '', name = '', job = '', desc = '', phone = '', email = ''}) {
        const socials = blockElement.find('.socials-wrapper').html();
        const escapeHtml = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        const escapedName = escapeHtml(name);
        const escapedJob = escapeHtml(job);
        const escapedDesc = escapeHtml(desc);
        const escapedPhone = escapeHtml(phone);
        const escapedEmail = escapeHtml(email);

        return `<div class="overlay"></div>
        <div class="popup">
            <div class="popup-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" strokelinecap="round" strokelinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div class="content-1">
                <img src="${img}" alt="${escapedName}">
            </div>
            <div class="content-2">
                <h3 class="profile-title">${escapedName}</h3>
                <p class="profile-sub">${escapedJob}</p>
                <p class="profile-desc">${escapedDesc}</p>
                <p class="profile-phone"><strong>Phone :</strong>${escapedPhone}</p>
                <p class="profile-email"><strong>Email :</strong>${escapedEmail}</p>
                ${socials}
            </div>
        </div>`;
    }
}

const selected = u('.guten-team');

if (selected) {
    new GutenverseTeam(selected);
}