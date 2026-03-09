import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { Select } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { ProLock } from 'gutenverse-core/controls';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { isOnEditor } from 'gutenverse-core/helper';
const MenuControl = (props) => {
    const { label, allowDeviceControl, value = allowDeviceControl ? {} : undefined, onValueChange, description = '', noOptionsText, proLabel } = props;
    const noOptionsMessage = () => (noOptionsText ? noOptionsText : __('No Option', 'gutenverse'));
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!isOnEditor()) return;
        apiFetch({
            path: addQueryArgs('/gutenverse-client/v1/menu'),
        }).then((data) => {
            setOptions(data);
        });
    }, []);

    const onChange = (value) => {
        onValueChange(value);
    };

    const customStyles = {
        input: (provided) => {
            return {
                ...provided,
                padding: 0,
                margin: 0,
            };
        },
        control: (provided) => {
            return {
                ...provided,
                borderRadius: '1px',
            };
        },
        menu: (provided) => {
            return {
                ...provided,
                zIndex: 99999,
            };
        },
    };

    const id = useInstanceId(MenuControl, 'inspector-select-menu-control');

    const formatOptionLabel = ({ label, pro }) => {
        return (
            <div className={`select-option${pro && ' pro'}`}>
                <div>{label}</div>
                {pro && <ProLock />}
            </div>
        );
    };

    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (value) {
            options.map((option) => {
                if (option.value === value) {
                    setSelectedValue(option);
                }
            });
        } else {
            setSelectedValue(null);
        }
    }, [value, options]);

    return (
        <div id={id} className={'gutenverse-control-wrapper gutenverse-control-select'}>
            <ControlHeadingSimple id={`${id}-select`} label={label} description={description} proLabel={proLabel} allowDeviceControl={allowDeviceControl} />
            <div className={'control-body'}>
                <div className={'control-select'}>
                    <Select
                        id={`${id}-select`}
                        styles={customStyles}
                        value={selectedValue}
                        onChange={(option) => (onChange(option.value))}
                        options={options}
                        noOptionsMessage={noOptionsMessage}
                        formatOptionLabel={formatOptionLabel}
                        isOptionDisabled={(option) => option.disabled || option.pro}
                        isDisabled={proLabel}
                    />
                </div>
            </div>
        </div>
    );
};

export default compose(withParentControl, withDeviceControl)(MenuControl);
