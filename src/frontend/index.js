import { GutenverseVideo, u } from 'gutenverse-core-frontend';
import GutenverseTabs from './blocks/tab';
import GutenverseAccordion from './blocks/accordion';
import GutenverseTeam from './blocks/team';
import GutenverseProgressBar from './blocks/progress-bar';
import GutenverseFunFact from './blocks/fun-fact';
import GutenverseNavMenu from './blocks/nav-menu';
import GutenverseTestimonials from './blocks/testimonials';
import GutenverseClientLogo from './blocks/client-logo';
import GutenverseGallery from './blocks/gallery';
import GutenverseAnimatedText from './blocks/animated-text';
import GutenversePostblock from './blocks/postblock';
import GutenversePostlist from './blocks/postlist';
import GutenversePopupBuilder from './popup-fallback/popup-builder';
import GutenverseSearch from './blocks/search';
import GutenverseFormValidation from './form_fallback/form-builder';
import GutenverseInputDate from './form_fallback/input-date';
import GutenverseInputSelect from './form_fallback/input-select';
import GutenverseMultiInputSelect from './form_fallback/input-multiselect';

let gutenClasses = {
    ['tabs']: GutenverseTabs,
    ['accordions']: GutenverseAccordion,
    ['video-wrapper']: GutenverseVideo,
    ['team']: GutenverseTeam,
    ['progress-bar']: GutenverseProgressBar,
    ['fun-fact']: GutenverseFunFact,
    ['nav-menu']: GutenverseNavMenu,
    ['testimonials']: GutenverseTestimonials,
    ['client-logo']: GutenverseClientLogo,
    ['gallery']: GutenverseGallery,
    ['animated-text']: GutenverseAnimatedText,
    ['post-block']: GutenversePostblock,
    ['post-list']: GutenversePostlist,
    ['search']: GutenverseSearch,
};

//gutenverse-form functionality
let { activePlugins } = window['GutenverseData'];
if( !activePlugins.includes('gutenverse-form/gutenverse-form.php' )){
    let formGutenClass = {
        ['form-builder']: GutenverseFormValidation,
        ['form-input-date']: GutenverseInputDate,
        ['form-input-select']: GutenverseInputSelect,
        ['form-input-multiselect']: GutenverseMultiInputSelect,
    };
    gutenClasses = {...gutenClasses, ...formGutenClass};
}

//gutenverse-popup functionality
if( !activePlugins.includes('gutenverse-popup/gutenverse-popup.php' )){
    let popupGutenClass = {
        ['popup-builder']: GutenversePopupBuilder,
    };
    gutenClasses = {...gutenClasses, ...popupGutenClass};
}

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

const elementPlaceholder = u('[data-image-placeholder]');
const { image_placeholder } = window['GutenverseFrontendConfig'];
elementPlaceholder.nodes.map(element => {
    const data = u(element).data('image-placeholder');
    if('gutenverse-image-placeholder' === data){
        u(element).attr('src', image_placeholder);
    }
});