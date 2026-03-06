const UnderlineZigzag = (props) => {
    const {
        svgProps,
        gradientSvg,
        commonPathProps,
    } = props;

    return `
        <svg ${svgProps} class="svg-underline-zigzag">
            <defs>${gradientSvg}</defs>
            <path
                ${commonPathProps}
                d="M9.5,52.5s361-31,478,0"
                transform="translate(-9.11 -34.22)"
            />
            <path
                ${commonPathProps}
                d="M484.5,55.5s-386-2-432,15c0,0,317-12,358,5,0,0-177-4-227,11"
                transform="translate(-9.11 -34.22)"
            />
        </svg>
    `;
};

export default UnderlineZigzag;