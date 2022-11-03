import edit from "assets/edit.svg";
import Image from "next/image";
import { useState } from "react";
import styles from "./EditableInput.module.css";

const EditableInput = ({ initialValue = "", id = "" }) => {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(initialValue);
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    if (editable) setValue(e.target.value);
                }}
                className={`${editable ? styles.editable : styles.uneditable}`}
                onBlur={() => {
                    setEditable(false);
                }}
                disabled={!editable}
                id={id}
            />
            <button
                className={styles.editButton}
                onClick={() => {
                    setEditable(true);
                }}
            >
                <Image src={edit} alt="Edit Icon" height={30} />
            </button>
        </div>
    );
};

export default EditableInput;
