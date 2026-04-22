'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import { Heading, SubHeading, BodyContent } from "@/components/CourseFormats/CourseFormats"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"
import Spacing from "@/components/Spacing/Spacing"
import TrackingTools from "@/components/TrackingTools/TrackingTools"

export default function TrackingPage() {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Tracking</Heading>
         <BodyContent>
            Don't over complicate things with AI apps that use photos, even though they might seem to work well.
         </BodyContent>
         <BodyContent>
            I suggest you use ChatGPT and just tell it exactly what you're eating and be very specific, so it can calculate your protein, fat and calorie intake for that meal. It'll help you have a better understanding of what you're eating and how it affects your body and your muscle growth journey.
         </BodyContent>
         <BodyContent>
            Always remember, most things vary for people but the overall concept of muscle growth works for everyone and you'll be jacked in due time.
         </BodyContent>
         <BodyContent>
            Here are some tools to help you, these will help you calculate values you'll need to keep in mind. Your maintenance calories, protein goals and BMI.
         </BodyContent>
         <Spacing size={2} />
         <TrackingTools />
      </AppWrapper>
   )
}
