import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { trpc } from "utils/trpc";

const AddInfo = () => {
    const router = useRouter();
    const { data } = trpc.user.getIfUserRegistered.useQuery();
    if (data?.doctor !== undefined) {
        router.push("/doctor");
    } else if (data?.patient !== undefined) {
        router.push("/patient");
    }
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [selectedRole, setSelectedRole] = useState<"patient" | "doctor">(
        "doctor"
    );
    const registerMutation = trpc.user.registerUser.useMutation({
        onSuccess: (patientOrdoctor, { role }) => {
            switch (role) {
                case "patient":
                    router.push("/patient");
                    break;
                case "doctor":
                    router.push("/doctor");
                    break;
                default:
                    router.push("/");
                    break;
            }
        },
    });
    const { status, data: session } = useSession();
    if (status === "loading") return <div>Loading...</div>;
    console.log(session, status);
    if (!session)
        return (
            <div>
                Unauthenticated. Please <Link href="/">Sign In</Link>.
            </div>
        );

    const roleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.checked &&
            (e.target.value === "patient" || e.target.value === "doctor")
        )
            setSelectedRole(e.target.value);
    };
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerMutation.mutate({
            location,
            name,
            qualifications,
            role: selectedRole,
        });
    };
    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl">Enter your details</h1>
            <form onSubmit={submit} className="flex max-w-md flex-col gap-3">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                        <input
                            type="radio"
                            name="role"
                            value="patient"
                            id="patient"
                            onChange={roleChange}
                            checked={selectedRole === "patient"}
                        />
                        <label htmlFor="patient">patient</label>
                    </div>
                    <div className="flex flex-row gap-3">
                        <input
                            type="radio"
                            name="role"
                            value="doctor"
                            id="doctor"
                            onChange={roleChange}
                            checked={selectedRole === "doctor"}
                        />
                        <label htmlFor="doctor">doctor</label>
                    </div>
                </div>
                <label htmlFor="name">Name</label>
                <input
                    id={"name"}
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="rounded border-2 border-solid border-black bg-blue-100 px-6 py-3 text-black"
                />
                <label htmlFor="location">Location</label>
                <input
                    id={"location"}
                    type="text"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                    className="rounded border-2 border-solid border-black bg-blue-100 px-6 py-3 text-black"
                />
                <label htmlFor="qualifications">Qualifications</label>
                <input
                    id={"qualifications"}
                    type="text"
                    value={qualifications}
                    onChange={(e) => {
                        setQualifications(e.target.value);
                    }}
                    className="rounded border-2 border-solid border-black bg-blue-100 px-6 py-3 text-black"
                />

                <input
                    className="rounded border-2 border-solid border-black bg-blue-100 px-6 py-3 text-black"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
};

export default AddInfo;
