'use client'
import AppWrapper from '../AppWrapper/AppWrapper'
import LoadingCard from '../Card/LoadingCard'

export default function LoadingPage() {
   return (
      <AppWrapper>
         <div className="box full dfb column gap-10">
            {Array.from({ length: 3 }, (_, i) => i+1).map(i => (
               <LoadingCard
                  key={i}
                  styles={{ width: "100%", maxWidth: "600px", height: "100px" }}
               />
            ))}
         </div>
      </AppWrapper>
   )
}
