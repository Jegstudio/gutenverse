const Curly = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-curly">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M6.5,75.5s25-29,50,0,50,0,50,0,25-32,50,0,50-1,50-1,25-30,50,1,50,0,50,0,27-28,50,0,50,0,50,0,26-25,50,0,36,7,36,7"
                transform="translate(-3.09 -56.78)"
            />
        </svg>
    `;
};

export default Curly;