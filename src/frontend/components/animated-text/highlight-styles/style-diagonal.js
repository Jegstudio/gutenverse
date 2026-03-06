const Diagonal = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-diagonal">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M7.5,6.5s257,84,483,136"
                transform="translate(-6.1 -2.22)"
            />
        </svg>
    `;
};

export default Diagonal;