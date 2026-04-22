'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import Card from "@/components/Card/Card"
import Spacing from "@/components/Spacing/Spacing"
import Select from "@/components/Select/Select"
import { Heading, SubHeading, FormContent } from "@/components/CourseFormats/CourseFormats"
import { useState } from "react"
import { toast } from "sonner"
import { formatNumber } from "@/utils/num"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"

const activityLevelsOptions = [
   "Sedentary (little exercise)",
   "Light exercise (1-3 days/week)",
   "Moderate exercise (3-5 days/week)",
   "Hard exercise (6-7 days/week)",
   "Athlete / very active job"
];
const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9];

export default function ProteinGoalForm () {
   const [weight, setWeight] = useState("");
   const [calculatedProteinGoal, setCalculatedProteinGoal] = useState<string | null>(null);

   function calculateProteinGoal (callback: Function) {
      if (weight == "") {
         toast.error("Please enter your weight");
         callback();
         return;
      }
      const minProteinGoal = 1.6 * parseFloat(weight);
      const maxProteinGoal = 2.2 * parseFloat(weight);
      setCalculatedProteinGoal(`${minProteinGoal.toFixed(1)}g - ${maxProteinGoal.toFixed(1)}g`);
      callback();
   }
   
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Protein Goal</Heading>
         <SubHeading>Calculate your Protein Goal by filling the fields below</SubHeading>
         {(calculatedProteinGoal !== null) && (<div className="box pd-15 full dfb flex-wrap gap-10">
            <Card styles={{
               width: "100%",
               maxWidth: "400px",
               border: "1px solid #ececec",
               borderRadius: "20px",
               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.094)",
               padding: "20px", background: "#ffb6dea0"
            }}>
               <div className="text-xxxs full bold-500 grey-5">Your Protein Goal</div>
               <div className="text-l bold-800 full">{calculatedProteinGoal}</div>
            </Card>
         </div>)}
         <SubHeading>Weight in kg</SubHeading>
         <FormContent>
            <input 
               type="number"
               className="xs pd-14 pdx-2"
               placeholder="Weight (kg)"
               value={weight}
               onChange={e => setWeight(e.target.value)}   
            />
         </FormContent>
         <Spacing />
         <FormContent styles={{ padding: "20px 0" }}>
            <AwaitButton
               className="xs pd-15 pdx-6"
               onClick={calculateProteinGoal}
            >
               Calculate
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
