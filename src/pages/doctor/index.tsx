import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

const DoctorPage = () => {
    const router = useRouter();
    const { data } = trpc.user.getIfUserRegistered.useQuery();
    useEffect(() => {
        if (data?.doctor === undefined) {
            router.push("/");
        }
    }, [router, data?.doctor]);
    return <div>Doctor Page</div>;
};

export default DoctorPage;
