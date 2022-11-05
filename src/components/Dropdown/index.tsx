type OptionValue = {
    id: string | number;
};
type Props<T> = {
    options: T[];
    onChange: (opt?: T) => void;
    isSelectedOption: (opt: T) => boolean;
    getLabel: (opt: T) => string;
    name: string;
};
function Dropdown<T extends OptionValue>({
    options,
    onChange,
    isSelectedOption,
    getLabel,
    name,
}: Props<T>) {
    function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
        const { selectedIndex } = e.currentTarget;
        const selectedOption = options[selectedIndex];
        onChange(selectedOption);
    }
    return (
        <select
            value={options.find((opt) => isSelectedOption(opt))?.id}
            onChange={handleOnChange}
            name={name}
        >
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {getLabel(option)}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
