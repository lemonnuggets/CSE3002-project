import { useQuery } from "@tanstack/react-query";
import { fetchCovidData } from "./api";
import styles from "./StatisticsWidget.module.css";
const StatisticsWidget = () => {
    const { isLoading, isError, data } = useQuery(
        ["statistics"],
        fetchCovidData
    );
    return (
        <div className={styles.widget}>
            <h2 className={styles.widgetTitle}>
                Today&apos;s COVID-19 Statistics
            </h2>
            <div className={styles.contentWrapper}>
                {isLoading && "Loading..."}
                {!isLoading && isError && "Unable to fetch COVID-19 statistics"}
                {!isLoading &&
                    !isError &&
                    data["Message"] !== "Caching in progress" && (
                        <table className={styles.displayTable}>
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Cases</th>
                                    <th>Deaths</th>
                                    <th>Recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data["Countries"].map((countryData: any) => {
                                    const countryName = countryData["Country"];
                                    const confirmedCases = Number(
                                        countryData["TotalConfirmed"]
                                    ).toLocaleString();
                                    const newCases = Number(
                                        countryData["NewConfirmed"]
                                    ).toLocaleString();
                                    const totalDeaths = Number(
                                        countryData["TotalDeaths"]
                                    ).toLocaleString();
                                    const newDeaths = Number(
                                        countryData["NewDeaths"]
                                    ).toLocaleString();
                                    const totalRecovered = Number(
                                        countryData["TotalRecovered"]
                                    ).toLocaleString();
                                    const newRecovered = Number(
                                        countryData["NewRecovered"]
                                    ).toLocaleString();
                                    return (
                                        <tr key={countryData["ID"]}>
                                            <td>{countryName} </td>
                                            <td>
                                                {confirmedCases}{" "}
                                                {Number(newCases) > 0 && (
                                                    <span
                                                        className={styles.grey}
                                                    >
                                                        +{newCases}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                {totalDeaths}{" "}
                                                {Number(newDeaths) > 0 && (
                                                    <span
                                                        className={styles.red}
                                                    >
                                                        +{newDeaths}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                {totalRecovered}{" "}
                                                {Number(newRecovered) > 0 && (
                                                    <span
                                                        className={styles.green}
                                                    >
                                                        +{newRecovered}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
            </div>
        </div>
    );
};

export default StatisticsWidget;
