const Underline = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-underline">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M3,77.5s200.54-11,493,0"
                transform="translate(-2.75 -68.11)"
            />
        </svg>
    `;
};

export default Underline;