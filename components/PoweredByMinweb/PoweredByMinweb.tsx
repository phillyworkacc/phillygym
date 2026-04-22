'use client'
import { MinwebLogo } from "../Icons/Icon"

export default function PoweredByMinweb() {
   return (
      <div className="footer-powered-by-minweb">
         <div className="text-xxxs fit whitespace-nowrap dfb align-center gap-5">
            <span>Powered By Minweb</span>
            <MinwebLogo size={18} />
         </div>
      </div>
   )
}
