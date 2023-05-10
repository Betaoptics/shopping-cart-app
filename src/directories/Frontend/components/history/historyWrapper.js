'use strict';
import { useTranslation } from "react-i18next";
import NavigationBar from "../navigationbar/navigationBar";
import PurchaseHistory from "../../views/purchaseHistory";

function HistoryWrapper() {

    const [t] = useTranslation("main");

    return (
        <>
        <NavigationBar/>
        <PurchaseHistory/>
        </>
    );
}

export default HistoryWrapper;