import edit from "assets/edit.svg";
import Image from "next/image";
import { useState } from "react";
import styles from "./EditableInput.module.css";
type Props = {
    id: string;
    value: string;
    setValue: (val: string) => void;
};
const EditableInput = ({ id, value, setValue }: Props) => {
    const [editable, setEditable] = useState(false);
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    if (editable) setValue(e.target.value);
                }}
                className={`${editable ? styles.editable : styles.uneditable} ${
                    styles.inputField
                }`}
                onBlur={() => {
                    setEditable(!editable);
                }}
                disabled={!editable}
                id={id}
            />
            <button
                className={styles.editButton}
                onClick={() => {
                    setEditable(!editable);
                }}
            >
                <Image src={edit} alt="Edit Icon" height={30} />
            </button>
        </div>
    );
};

export default EditableInput;
