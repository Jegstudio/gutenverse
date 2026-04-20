import { renderIcon } from 'gutenverse-core/helper';


const ProgressContent = ({ attributes }) => {
    const {
        title,
        style,
        arrowIcon,
        percentage,
        duration,
        arrowIconType,
        arrowIconSVG
    } = attributes;

    const content = () => {
        switch (style) {
            case 'switch':
                return <>
                    <div className="content-group">
                        <div className="skill-bar-content">
                            <span className="skill-title">{title}</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-track" data-width={percentage} data-duration={duration}>
                            </div>
                        </div>
                    </div>
                    <div className="number-percentage-wrapper">
                        <span className="number-percentage loaded"></span>
                    </div>
                </>;

            default:
                return <>
                    <div className="skill-bar-content">
                        <span className="skill-title">{title}</span>
                    </div>
                    <div className="skill-bar">
                        <div className="skill-track" data-width={percentage} data-duration={duration}>
                            {['inner-content'].includes(style) && <span className="skill-track-icon">
                                {renderIcon(arrowIcon, arrowIconType, arrowIconSVG)}
                            </span>}
                            <div className="number-percentage-wrapper">
                                <span className="number-percentage loaded"></span>
                            </div>
                        </div>
                    </div>
                </>;
        }
    };

    return content();
};

export default ProgressContent;