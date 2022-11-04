import upload from "assets/upload.png";
import Layout from "layout/patient";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
const Reports = () => {
    const [files, setFiles] = useState<File[]>([]);
    const results = [
        {
            id: "result-1",
            date: "01-9-22",
            result: "Negative",
            location: "ABC Hospital, Bengaluru",
        },
        {
            id: "result-2",
            date: "10-9-22",
            result: "Positive",
            location: "DEF Hospital, Delhi",
        },
        {
            id: "result-3",
            date: "20-9-22",
            result: "Positive",
            location: "GHI Hospital, Mumbai",
        },
    ];

    return (
        <Layout>
            <div className={styles.content}>
                <h1 className={styles.pageTitle}>Reports</h1>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Previous Results</h2>
                        <div className={styles.columnContent}>
                            {results.map((result) => {
                                return (
                                    <div
                                        className={styles.result}
                                        key={result.id}
                                    >
                                        <div className={styles.date}>
                                            Date: {result.date}
                                        </div>
                                        <div className={styles.location}>
                                            Location: {result.location}
                                        </div>
                                        <div
                                            className={`${styles.value} ${
                                                styles[result.result]
                                            }`}
                                        >
                                            {result.result}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${styles.column} ${styles.uploadColumn}`}>
                        <h2 className={styles.columnTitle}>Add Result</h2>
                        <label
                            className={`${styles.columnContent} ${styles.scans}`}
                            htmlFor="scans"
                        >
                            <div className={styles.labelText}>
                                Upload your scans
                            </div>
                            <Image
                                src={upload}
                                alt="Upload Icon"
                                height={100}
                            />
                            <input
                                type="file"
                                name="scans"
                                id="scans"
                                onChange={(e) => {
                                    if (e.target.files)
                                        setFiles(Array.from(e.target.files));
                                    else setFiles([]);
                                }}
                                className={styles.fileUpload}
                                multiple
                            />
                        </label>
                        <div className={styles.uploads}>
                            {files.map((file) => {
                                return (
                                    <div
                                        className={styles.upload}
                                        key={`${file.lastModified}-${file.name}`}
                                    >
                                        {file.name}
                                    </div>
                                );
                            })}
                        </div>
                        {files.length > 0 && (
                            <input
                                type={"submit"}
                                value={"Submit"}
                                className={styles.submitButton}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Reports;
