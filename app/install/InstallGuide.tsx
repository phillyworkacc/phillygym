'use client'
import { Heading, SubHeading, BodyContent } from "@/components/CourseFormats/CourseFormats"
import { installImages } from "@/utils/images"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import ImageGallery from "@/components/ImageGallery/ImageGallery"
import Spacing from "@/components/Spacing/Spacing"

export default function InstallGuide () {
   return (
      <AppWrapper>
         <Heading>Install as an App Guide (iOS)</Heading>
         <SubHeading>Step 1</SubHeading>
         <BodyContent>
            Share the website
         </BodyContent>
         <ImageGallery images={[ installImages.step1 ]} />
         <Spacing />

         <SubHeading>Step 2</SubHeading>
         <BodyContent>
            Tap "View More"
         </BodyContent>
         <ImageGallery images={[ installImages.step2 ]} />
         <Spacing />
         
         <SubHeading>Step 3</SubHeading>
         <BodyContent>
            Tap "Add to Home Screen"
         </BodyContent>
         <ImageGallery images={[ installImages.step3 ]} />
         <Spacing />
         
         <SubHeading>Step 4</SubHeading>
         <BodyContent>
            Make sure "Open as Web App" is on/checked, then Tap "Add"
         </BodyContent>
         <ImageGallery images={[ installImages.step4 ]} />
         <Spacing />
         
         <SubHeading>Step 5</SubHeading>
         <BodyContent>Done!</BodyContent>
      </AppWrapper>
   )
}
