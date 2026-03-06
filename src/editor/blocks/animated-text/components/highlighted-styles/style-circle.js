const Circle = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;
    return <>
        <svg {...svgProps} className={'svg-circle'}>
            <defs>{gradientSvg}</defs>
            <path
                {...commonPathProps}
                d="M281.68,15.89S135.3,14.19,22.05,81.45s331.78,76.17,441,35.68S363.86-35.6,178.77,26.39"
                transform="translate(0.75 -3.61)"
            />
        </svg>
    </>;
};

export default Circle;