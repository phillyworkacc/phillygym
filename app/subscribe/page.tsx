'use client'
import "@/styles/paywall.css"
import { PhillyGymLogo } from "@/components/Icons/Icon"
import { posterBannerImage } from "@/utils/images"
import ImageViewer from "@/components/Icons/ImageViewer"
import Spacing from "@/components/Spacing/Spacing"
import Link from "next/link"
import { useSessionUser } from "@/helpers/useSessionUser"
import LoadingPage from "@/components/LoadingPage/LoadingPage"
import { redirect } from "next/navigation"

export default function Subscribe () {
   const { user } = useSessionUser();

   const paymentLink = "https://buy.stripe.com/bJe8wRbrVdde6oZdfY8k80h";

   if (user == null) return <LoadingPage />;

   if (user.premiumAccess) redirect("/");

   return (
      <div className='subscribe-pay-wall'>
         <div className="box full dfb column gap-10 mw-700">
            <div className="box full dfb align-center justify-center"><PhillyGymLogo size={30} /></div>
            <div className="text-sm full text-center bold-700">Get the Philly Gym Guide</div>
            <div className="text-xxxs full text-center">
               Everything you need in one place to train smarter and see better results.
            </div>
            <div className="box full dfb align-center justify-center">
               <ImageViewer
                  src={posterBannerImage}
                  borderRadius="30px"
                  width="100%"
                  height="150px"
                  maxWidth="400px"
               />
            </div>
            <div className="text-s bold-600 full mt-05">What's Included</div>
            <div className="box full dfb column gap-5">
               <div className="text-xxs full">💪 Beginner-friendly workout plans</div>
               <div className="text-xxs full">🍽️ Nutrition and meal guidance</div>
               <div className="text-xxs full">📈 Progressive overload tips</div>
               <div className="text-xxs full">📝 Tracking and progress calculators</div>
               <div className="text-xxs full">🎯 Common mistakes to avoid</div>
               <div className="text-xxs full">📚 Easy-to-follow explanations</div>
            </div>
            <br />
            <div className="text-s full text-center bold-700">Unlock Full Access Below</div>
            <div className="text-xxxs full text-center">
               Start today and you will be jacked in the next 6 months. If you follow the plan. Stay Consistent.
            </div>
            <div className="box full pd-2">
               <Link href={`${paymentLink}?prefilled_email=${user.email}`} target="_blank">
                  <button className="s pd-13 full radius-40" style={{ fontWeight: "700" }}>Join Now!</button>
               </Link>
            </div>
            <Spacing size={5} />
         </div>
      </div>
   )
}
