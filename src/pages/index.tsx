import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";

const Home: NextPage = () => {
    const { status, data } = trpc.user.getIfUserRegistered.useQuery();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const { data: sessionData } = useSession();
    if (sessionData && data?.user?.name === undefined) {
        router.push("/addinfo");
    }

    if (status === "success") {
        if (data.role !== undefined) {
            router.push(`/${data.role}`);
        }
    }

    return (
        <>
            <Head>
                <title>💩 Stupid unnamed project</title>
                <meta name="description" content="Continuous authentication" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.pageContainer}>
                <form className={styles.pageContainer}>
                    <label htmlFor="email">Email</label>
                    <input
                        id={"email"}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className={styles.inputField}
                    />
                    <input
                        type={"submit"}
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            signIn("email", { email });
                        }}
                        value="Sign in with email"
                    />
                </form>
                {/* {status === "loading" && <div>Loading...</div>} */}
                {/* {status !== "loading" && (status === "error" || !sessionData) && (
          <form className="container flex min-w-min flex-col items-center justify-center gap-4">
            <label htmlFor="email">Email</label>
            <input
              id={"email"}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="rounded border-2 border-solid border-black bg-blue-100 px-6 py-3 text-black"
            />
            <input
              type={"submit"}
              className="rounded border-2 border-solid border-black bg-blue-400 px-6 py-3 text-black"
              onClick={(e) => {
                e.preventDefault();
                signIn("email", { email });
              }}
              value="Sign in with email"
            />
          </form>
        )} */}
            </main>
        </>
    );
};

export default Home;
