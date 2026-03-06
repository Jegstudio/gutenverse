const StarIcons = ({starIcon, rating, total}) => {
    rating = parseFloat(rating);
    total = parseFloat(total);
    const faIcon = (active = false) => {
        switch (starIcon) {
            case 'rounded':
                return active ? 'full fas fa-star' : 'empty far fa-star';
            case 'rounded-fill':
                return active ? 'full fas fa-star' : 'empty fas fa-star';
            case 'sharp':
                return active ? 'full unicode-sharp' : 'empty unicode-sharp-hollow';
            case 'sharp-fill':
                return active ? 'full unicode-sharp' : 'empty unicode-sharp';
            case 'fill':
                return active ? 'full fas fa-star' : 'empty fas fa-star';
            case 'smile-2':
                return active ? 'full fas fa-smile' : 'empty fas fa-frown';
            case 'thumbs':
                return active ? 'full fas fa-thumbs-up' : 'empty fas fa-thumbs-down';
            case 'default':
            default:
                return active ? 'full fas fa-star' : 'empty far fa-star';
        }
    };

    const icons = [];

    for ( let i=0; i<total; i++ ) {
        const fa = i < rating ? faIcon(true) : faIcon();
        icons.push(<i className={fa}></i>);
    }

    return <div className="rating-icons">
        {icons.map(icon => icon)}
    </div>;
};

export default StarIcons;