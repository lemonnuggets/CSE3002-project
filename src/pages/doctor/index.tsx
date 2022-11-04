import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const DoctorPage = () => {
    const router = useRouter();
    const { data } = trpc.user.getIfUserRegistered.useQuery();
    if (data?.doctor === undefined) {
        router.push("/");
    }
    return <div>Doctor Page</div>;
};

export default DoctorPage;
