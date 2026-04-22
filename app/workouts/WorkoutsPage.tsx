'use client'
import { Heading, SubHeading, BodyContent } from '@/components/CourseFormats/CourseFormats'
import { CourseItemsNavBar } from '@/components/CourseItems/CourseItems'
import { physiqueImages } from '@/utils/images'
import AppWrapper from '@/components/AppWrapper/AppWrapper'
import ImageGallery from '@/components/ImageGallery/ImageGallery'
import Spacing from '@/components/Spacing/Spacing'

export default function WorkoutsPage() {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>WorkOuts</Heading>
         <SubHeading>Split</SubHeading>
         <BodyContent><b>Monday</b> - Chest and Triceps</BodyContent>
         <BodyContent><b>Tuesday</b> - Back and Biceps</BodyContent>
         <BodyContent><b>Wednesday</b> - Legs</BodyContent>
         <BodyContent><b>Thursday</b> - Shoulders and Abs</BodyContent>
         <BodyContent><b>Friday</b> - Chest and Triceps</BodyContent>
         <BodyContent><b>Saturday and Sunday</b> - Rest</BodyContent>
         <Spacing />
         <BodyContent>This is what people call the <b>PPL (Push, Pull, Legs)</b> split.</BodyContent>
         <Spacing />
         <BodyContent>I'd suggest that you do:</BodyContent>
         <BodyContent><b>Chest and Biceps</b> on the same day</BodyContent>
         <BodyContent><b>Back and Triceps</b> on the same day.</BodyContent>
         <BodyContent>That's more optimal but either one you're comfortable with, both work really well.</BodyContent>

         <SubHeading>Exercises</SubHeading>
         <BodyContent styles={{ textDecoration: "underline" }}>Chest</BodyContent>
         <BodyContent>Incline Bench Press</BodyContent>
         <BodyContent>Chest Press</BodyContent>
         <BodyContent>Pec Flys</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Triceps</BodyContent>
         <BodyContent>Tricep Pushdowns</BodyContent>
         <BodyContent>Tricep Extension</BodyContent>
         <BodyContent>Dips</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Back</BodyContent>
         <BodyContent>Cable Rows</BodyContent>
         <BodyContent>Lat Pulldowns</BodyContent>
         <BodyContent>Pull ups</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Biceps</BodyContent>
         <BodyContent>Bicep curls</BodyContent>
         <BodyContent>Seated hammer curls</BodyContent>
         <BodyContent>Preacher curls</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Legs</BodyContent>
         <BodyContent>Leg press</BodyContent>
         <BodyContent>Hack squat</BodyContent>
         <BodyContent>Calf raises</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Shoulders</BodyContent>
         <BodyContent>Lateral raises</BodyContent>
         <BodyContent>Shoulder press</BodyContent>
         <BodyContent>Rear delt flys</BodyContent>
         <Spacing />

         <BodyContent styles={{ textDecoration: "underline" }}>Abs</BodyContent>
         <BodyContent>Crunches</BodyContent>
         <BodyContent>Russian twists</BodyContent>
         <Spacing />
         
         <Heading>Gym Bro</Heading>
         <BodyContent>Always make sure you have a gym bro to make you push harder</BodyContent>
         <ImageGallery
            images={[ physiqueImages.tobiPhysique1, physiqueImages.tobiPhysique2, physiqueImages.tobiPhysique3 ]}
         />
      </AppWrapper>
   )
}
