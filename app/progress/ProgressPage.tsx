'use client'
import { BodyContent, Heading } from "@/components/CourseFormats/CourseFormats"
import { physiqueImages } from "@/utils/images"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import ImageGallery from "@/components/ImageGallery/ImageGallery"
import Spacing from "@/components/Spacing/Spacing"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"

export default function ProgressPage () {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>My Progress</Heading>
         <BodyContent>
            This is my current physique, some images of the beginning and during the grind.
         </BodyContent>
         <Spacing />
         <ImageGallery
            images={[
               physiqueImages.phillyProgressPic,
               physiqueImages.phillyAbsPhoto,
               physiqueImages.phillyBack,
               physiqueImages.phillyFullPhysique5,
               physiqueImages.phillyFullPhysique3,
               physiqueImages.phillyPicMirrorSleeveless,
               physiqueImages.physiqueInMirror,
               physiqueImages.phillyStandingPoseShirtless,
               physiqueImages.phillyStandingPose,
               physiqueImages.phillyStandingPoseWhiteSleevelessArmsMirror,
               physiqueImages.phillyStandingPose2,
               physiqueImages.phillyOldPhysique,
            ]}
         />
      </AppWrapper>
   )
}
