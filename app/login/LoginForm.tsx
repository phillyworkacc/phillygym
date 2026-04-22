'use client'
import "@/styles/auth.css"
import PoweredByMinweb from '@/components/PoweredByMinweb/PoweredByMinweb'
import ImageViewer from "@/components/Icons/ImageViewer"
import Spacing from "@/components/Spacing/Spacing"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import { posterBannerImage } from "@/utils/images"
import { useState } from "react"
import { toast } from "sonner"
import { isValidEmail } from "@/utils/validate"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSignIn = async (callback: Function) => {
      if (email == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      if (password == "") {
         toast.error("Please enter your password");
         callback();
         return;
      }
      if (!isValidEmail(email)) {
         toast.error("Please enter a valid email");
         callback();
         return;
      }
      const response = await signIn("credentials", { email, password, redirect: false });
      if (response?.error) {
         toast.error("Failed to log you in");
         callback();
         return;
      }
      redirect("/");
   }
   
   return (
      <div className='auth'>
         <div className="auth-container">
            <Spacing size={2} />
            <div className="box full pdx-2 dfb align-center justify-center">
               <ImageViewer
                  src={posterBannerImage}
                  borderRadius="30px"
                  width="100%"
                  height="150px"
                  maxWidth="400px"
               />
            </div>
            <Spacing />
            <div className="text-l full bold-700 text-center">Philly Gym Community</div>
            <div className="text-s full bold-500 text-center">Join or Sign In to your account</div>
            <Spacing />
            <div className="form-content">
               <input 
                  type="email"
                  className="xs pd-12 pdx-15"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div className="form-content">
               <input 
                  type="password"
                  className="xs pd-12 pdx-15"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <div className="form-content">
               <AwaitButton 
                  className="xxs pd-12 pdx-6"
                  onClick={handleSignIn}
               >Continue</AwaitButton>
            </div>
            <Spacing />
            <PoweredByMinweb />
         </div>
      </div>
   )
}
