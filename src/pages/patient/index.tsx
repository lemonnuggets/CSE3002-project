import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const Patient = () => {
    const router = useRouter();
    const { data } = trpc.user.getIfUserRegistered.useQuery();
    if (data?.doctor === undefined) {
        router.push("/");
    }
    return <div>Patient Page</div>;
};

export default Patient;
