/**
 * Render icon (font icon or SVG)
 * @param {string} icon - Icon class name
 * @param {string} iconType - Type of icon ('icon' or 'svg')
 * @param {string} iconSVG - Base64 encoded SVG data
 * @returns {JSX.Element|null} - Rendered icon element
 */
export const renderIcon = (icon, iconType = 'icon', iconSVG = '', showAriaHidden = false) => {
    if (iconType === 'svg' && iconSVG) {
        try {
            const svgData = atob(iconSVG);
            return (
                <div
                    className="gutenverse-icon-svg"
                    dangerouslySetInnerHTML={{ __html: svgData }}
                />
            );
        } catch (e) {
            return null;
        }
    }

    if (icon) {
        if (showAriaHidden) {
            return <i aria-hidden="true" className={`fa-lg ${icon}`}></i>;
        } else {
            return <i className={`fa-lg ${icon}`}></i>;
        }

    }

    return null;
};