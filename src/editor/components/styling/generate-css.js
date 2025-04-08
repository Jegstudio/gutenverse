
export const plainGeneratorFunction = (value, props) => {
    const {
        functionName,
        functionProps,
        attribute
    } = props;
    switch (functionName) {
        case 'postBlockContentAlign':
            const { selectorType } = functionProps;
            if(attribute !== 'end') {
                switch (selectorType) {
                    case 'first':
                        value = 'height: 100%; display: grid; grid-template-rows: 1fr auto;';
                        break;
                    case 'second':
                        value = `align-self: ${attribute}`;
                        break;
                    default:
                        break;
                }
            }
            break;
        default:
            break;
    }
    return value;
};