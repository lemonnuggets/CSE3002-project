export type SidebarLink = {
    href: string;
    imgSrc: any;
    imgAlt: string;
    imgHeight?: number;
    imgWidth?: number;
    text: string;
};
export type Activity = {
    id: string;
    description: string;
    date: Date | null;
    type: "appointment" | "result" | "prescription";
};
export type ClientActivities = Activity & {
    icon: any;
    iconAlt: string;
};
