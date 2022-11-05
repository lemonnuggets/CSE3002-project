import upload from "assets/upload.png";
import ReportRow from "components/ReportRow";
import Layout from "layout/patient";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";
const Reports = () => {
    const { data: reports, isFetching: isFetchingReports } =
        trpc.reports.getAllReports.useQuery();
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Layout>
            <div className={styles.content}>
                <h1 className={styles.pageTitle}>Reports</h1>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        {reports && (
                            <>
                                <h2 className={styles.columnTitle}>
                                    Previous Reports
                                </h2>
                                {isFetchingReports && (
                                    <div className={styles.loader}>
                                        Loading...
                                    </div>
                                )}
                                <div className={styles.columnContent}>
                                    {reports.map((report) => {
                                        return (
                                            <ReportRow
                                                report={report}
                                                key={`${report.id}-report`}
                                            />
                                        );
                                    })}
                                </div>
                            </>
                        )}
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
                                        onClick={() => {
                                            setFiles((prevFiles) =>
                                                prevFiles.filter(
                                                    (prevFile) =>
                                                        prevFile.name !==
                                                        file.name
                                                )
                                            );
                                        }}
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
