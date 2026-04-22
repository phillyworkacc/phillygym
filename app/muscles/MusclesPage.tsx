'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import ImageGallery from "@/components/ImageGallery/ImageGallery"
import { BodyContent, BoldColour, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { mealImages } from "@/utils/images"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"

export default function MusclesPage() {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Muscles</Heading>
         <SubHeading>Failure</SubHeading>
         <BodyContent>
            When training you want to make sure you are training with intensity till failure, this way you can push your muscles to their breaking point (where growth happens).
         </BodyContent>
         <BodyContent>
            When you lift till failure, the point where your muscles fail is when your muscle tissues are completely torn and have been destroyed. Your body then uses protein in your body to repair the broken tissues and because our bodies are smart, they overcompensate and give us more muscle tissues so that when we lift again we can push further, do more reps or even increase the weight, this is where <BoldColour>Progressive Overload</BoldColour> comes in.
         </BodyContent>
         
         <SubHeading>Progressive Overload</SubHeading>
         <BodyContent>
            Progressive Overload is the most effective way to build muscle insanely quick and effectively. In simple terms, progressive overload is when you increase your levels at the gym over a few weeks to maximise your muscle growth.
         </BodyContent>
         <BodyContent>
            For Instance: <Spacing />
            You're doing bicep curls and you lift 10kg for 8-10 reps (where you reach failure) for 3 sets. The next time you hit those bicep curls, you must either add another rep or you up the weight to 12kg. I suggest you track your lifts if you can but over time you won't need to.
         </BodyContent>
         
         <SubHeading>Sleep</SubHeading>
         <BodyContent>
            Sleep is one of the most important things you can do outside the gym that will increase your gains. Getting at least 7-8 hours of sleep everyday is very necessary.
         </BodyContent>
         <BodyContent>
            Your body needs sleep for it to properly recover and use the protein in your body to repair broken tissues in your muscles which will enable you to lift and push weights at your next gym session with more strength, energy and confidence. Training with not fully repaired muscle tissues can lead to fatigue, less intensity and weakness.
         </BodyContent>
         
         <SubHeading>Creatine</SubHeading>
         <BodyContent>
            Creatine is scientifically the best supplement for muscle growth. It is genuinely life changing at the gym, it makes you stronger, fuller, energetic, makes you drink water and keeps you good mentality.
         </BodyContent>
         <BodyContent>
            Creatine basically just holds water in our muscles making them hydrated and fuller, making us stronger and look amazing.
         </BodyContent>    
         <BodyContent>
            Creating is in every meal we eat but not the amount we need to grow big muscles, take creatine everyday and drink loads of water and you will grow stronger and bigger fast, of course if you put in the work at the gym and eat properly.
         </BodyContent>
         <ImageGallery images={[ mealImages.creatine ]} />
         
         <SubHeading>Mentality</SubHeading>
         <BodyContent>
            You need to push yourself, train till you can't push that weight anymore (intensity), no half reps. The more you push and train the muscles to failure, the muscle tissues break even more which allows for more growth.
         </BodyContent>
      </AppWrapper>
   )
}
