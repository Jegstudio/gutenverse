const DoubleUnderline = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-double-underline">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M3,59.5s152.5-13,493-3"
                transform="translate(-2.62 -48.22)"
            />
            <path
                ${commonPathProps}
                d="M3,83.5s200.54-11,493,0"
                transform="translate(-2.62 -48.22)"
            />
        </svg>
    `;
};

export default DoubleUnderline;