const Strikethrough = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-strikethrough">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M7.5,75.5s200,10,485,0"
                transform="translate(-7.28 -71)"
            />
        </svg>
    `;
};

export default Strikethrough;