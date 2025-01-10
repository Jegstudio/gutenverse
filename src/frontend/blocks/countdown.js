import { Default, u } from 'gutenverse-core-frontend';

class GutenverseCountdown extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._countDown(element);
        });
    }

    /* private */
    _countDown(element) {
        const blockElement = u(element);
        const dueDate = JSON.parse(blockElement.data('duedate'));
        setInterval(() => {
            this.__handleTimer(blockElement, dueDate)
        }, 1000);
    }

    __handleTimer(blockElement, target){
        let targetDate = new Date(target);
        let now = new Date();
        let distance = targetDate - now;
        const expiredData = JSON.parse(blockElement.data('expired'));
        if( distance <= 0 ){
            if( expiredData['action'] === 'redirect' ){
                window.location.assign(expiredData['url']);
            }else if ( expiredData['action'] === 'section' ){
                const expiredElement = blockElement.find('.countdown-expired-wrapper');
                if(expiredElement){
                    expiredElement.attr('style', 'display: block;');
                }
            }
        }else{
            const days = blockElement.find('.days-wrapper');
            const hours = blockElement.find('.hours-wrapper');
            const minutes = blockElement.find('.minutes-wrapper');
            const seconds = blockElement.find('.seconds-wrapper');
            let day, hour, minute, second = null;
            if(days){
                day = Math.floor(distance / (1000 * 60 * 60 * 24));
                hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                second = Math.floor((distance % (1000 * 60)) / 1000);
            }else{
                if(hours){
                    hour = Math.floor(distance / (1000 * 60 * 60));
                    minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    second = Math.floor((distance % (1000 * 60)) / 1000);
                }else{
                    if(minutes){
                        minute = Math.floor(distance / (1000 * 60));
                        second = Math.floor((distance % (1000 * 60)) / 1000);
                    }else{
                        second = Math.floor(distance / 1000);
                    }
                }
            }
            if(day){
                const dayHTML = days.find('.countdown-value');
                dayHTML.html(day);
            }
            if(hour){
                const hourHTML = hours.find('.countdown-value');
                hourHTML.html(hour);
            }
            if(minute){
                const minuteHTML = minutes.find('.countdown-value');
                minuteHTML.html(minute);
            }
            if(second){
                const secondHTML = seconds.find('.countdown-value');
                secondHTML.html(second);
            }
        }
    }
}

export default GutenverseCountdown;