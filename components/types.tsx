import { ReactElement } from "react";

export type SidenavItem = {
    title: ReactElement | string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SidenavItem[];
}