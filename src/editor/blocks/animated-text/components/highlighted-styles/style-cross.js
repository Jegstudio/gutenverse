const Cross = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return <>
        <svg {...svgProps} className="svg-cross">
            <defs>{gradientSvg}</defs>
            <path
                {...commonPathProps}
                d="M7.5,6.5s257,84,483,136"
                transform="translate(-6.1 -2.22)"
            />
            <path
                {...commonPathProps}
                d="M490.5,6.5s-310,103-483,136"
                transform="translate(-6.1 -2.22)"
            />
        </svg>
    </>;
};

export default Cross;