import Layout from "layout/patient";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

const Patient = () => {
    const router = useRouter();
    const { data } = trpc.user.getIfUserRegistered.useQuery();
    useEffect(() => {
        if (data?.patient === undefined) {
            router.push("/");
        } else {
            router.push("/patient/dashboard");
        }
    }, [router, data]);
    return <Layout>Patient Page</Layout>;
};

export default Patient;
