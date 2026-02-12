import { __ } from '@wordpress/i18n';


const IconTitleImageExcerpt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false"><path d="M7 9h34v6H7V9zm12 8H7v1h12v-1zm18 3H7v1h30v-1zm0 18H7v1h30v-1zM7 35h12v1H7v-1zm34-8H7v6h34v-6z"></path></svg>
);

const IconTitleImage = () => (
    <svg width="48" height="48" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="7" width="12" height="1" fill="currentColor" />
        <rect y="18" width="12" height="1" fill="currentColor" />
        <rect y="29" width="12" height="1" fill="currentColor" />
        <rect width="34" height="6" fill="currentColor" />
        <rect y="11" width="34" height="6" fill="currentColor" />
        <rect y="22" width="34" height="6" fill="currentColor" />
    </svg>
);

const IconTitleExcerpt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false"><path d="M41 9H7v3h34V9zm-4 5H7v1h30v-1zm4 3H7v1h34v-1zM7 20h30v1H7v-1zm0 12h30v1H7v-1zm34 3H7v1h34v-1zM7 38h30v1H7v-1zm34-11H7v3h34v-3z"></path></svg>
);

const VariationButton = ({ title, icon, onClick }) => {
    return (
        <li className="section-variation-picker-item">
            <button
                className="section-variation-picker-item-button"
                onClick={onClick}
            >
                <div className="variation-icon">
                    {icon}
                </div>
                <span className="variation-label">{title}</span>
            </button>
        </li>
    );
};

const QueryLoopVariationPicker = ({ onSelect }) => {
    return (
        <div className={'column-picker'}>
            <h3 className="select-column-variation">{__('Select Layout', 'gutenverse')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Query Loop variations', 'gutenverse')} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <VariationButton
                    onClick={() => onSelect('title-image-excerpt')}
                    title={__('Title, Image, & Excerpt', 'gutenverse')}
                    icon={<IconTitleImageExcerpt />}
                />
                <VariationButton
                    onClick={() => onSelect('title-image')}
                    title={__('Title & Image', 'gutenverse')}
                    icon={<IconTitleImage />}
                />
                <VariationButton
                    onClick={() => onSelect('title-excerpt')}
                    title={__('Title & Excerpt', 'gutenverse')}
                    icon={<IconTitleExcerpt />}
                />
            </ul>
        </div>
    );
};

const QueryLoopVariation = ({ onSelect, wrapper }) => {
    return (
        <div className={wrapper}>
            <div className={'section-variation-picker-choose section-variation-picker-container'}>
                <QueryLoopVariationPicker onSelect={onSelect} />
            </div>
        </div>
    );
};

export default QueryLoopVariation;
