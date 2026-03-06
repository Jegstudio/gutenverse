const Double = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;
    return <>
        <svg {...svgProps} className="svg-double">
            <defs>{gradientSvg}</defs>
            <path
                {...commonPathProps}
                d="M3.69,18.7s240.11-30,492.31,0"
                transform="translate(-3.14 -0.87)"
            />
            <path
                {...commonPathProps}
                d="M3.65,144S248.43,128,496,144"
                transform="translate(-3.14 -0.87)"
            />
        </svg>
    </>;
};

export default Double;