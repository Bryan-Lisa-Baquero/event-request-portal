import { FaClipboardList } from "react-icons/fa";
import ButtonCardList from "../components/cards/ButtonCardList";
import type { ButtonCardProps } from "../components/cards/ButtonCard";
import { IoBarChartSharp } from "react-icons/io5";
import { TbUfo } from "react-icons/tb";
import { GiInfo } from "react-icons/gi";
import type { JSX } from "react";

/**
 * Home Page Component.
 *
 * Renders a list of available tools using {@link ButtonCardList}.
 *
 * @component
 * @returns {JSX.Element} The rendered Home page.
 *
 * @remarks
 * This page displays a selectable list of tool categories. Each tool is
 * represented by a {@link ButtonCardProps} object including its description,
 * icon, and navigation route.
 *
 * @see ButtonCardList
 * @see ButtonCardProps
 */
export default function Home(): JSX.Element {

    const buttonCardList: ButtonCardProps[] = [
        {
            description: "Management Tools (P1)",
            icon: <FaClipboardList />,
            routePath: "/management"
        },
        {
            description: "Reporting Tools (P2)",
            icon: <IoBarChartSharp />,
            routePath: "/reporting"
        },
        {
            description: "Forecasting Tools (P3)",
            icon: <TbUfo />,
            routePath: "/forecasting"
        },
        {
            description: "Help or Innovative Ideas",
            icon: <GiInfo />,
            routePath: "/help"
        }
    ]    

    return(
        <>
            <h1>Select your Tool</h1>
            <ButtonCardList buttonCards={buttonCardList} />
        </>
    )
}