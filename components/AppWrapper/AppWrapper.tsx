'use client'
import "@/styles/site.css"
import PoweredByMinweb from "../PoweredByMinweb/PoweredByMinweb"
import Header from "../Header/Header";
import Spacing from "../Spacing/Spacing";

type AppWrapperProps = {
   children: React.ReactNode;
}

export default function AppWrapper ({ children }: AppWrapperProps) {
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
