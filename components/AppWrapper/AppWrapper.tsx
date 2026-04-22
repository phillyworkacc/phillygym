'use client'
import "@/styles/site.css"
import PoweredByMinweb from "../PoweredByMinweb/PoweredByMinweb"
import Header from "../Header/Header";
import Spacing from "../Spacing/Spacing";
import { useEffect } from "react";
import { useModal } from "../Modal/ModalContext";
import { WelcomeInstallation } from "../ModalForms/ModalForms";

type AppWrapperProps = {
   children: React.ReactNode;
}

export default function AppWrapper ({ children }: AppWrapperProps) {
   const { showModal } = useModal();
   function handleShowWelcomeMessage () {
      showModal({
         modalBoxStyles: { padding: 0, overflow: "hidden" },
         content: <WelcomeInstallation />,
         noCloseBtn: true
      })
   }

   useEffect (() => {
      const seen = localStorage.getItem("philly-gym-seen-welcome-minweb");
      if (!seen) {
         handleShowWelcomeMessage();
         localStorage.setItem("philly-gym-seen-welcome-minweb", "true");
      }
   }, []);

   return (
      <div className="pgc">
         <Header />
         <div className="pgc-app">
            <div className="pgc-container">
               {children}
            </div>
            <Spacing />
            <PoweredByMinweb />
            <Spacing size={8} />
         </div>
      </div>
   )
}
