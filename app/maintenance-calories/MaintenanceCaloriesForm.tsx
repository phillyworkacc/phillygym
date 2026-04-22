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

export default function MaintenanceCaloriesForm() {
   const [weight, setWeight] = useState("");
   const [height, setHeight] = useState("");
   const [age, setAge] = useState("");
   const [gender, setGender] = useState<"Male" | "Female">("Male");
   const [activityLevel, setActivityLevel] = useState<number>(0);
   const [calculatedMaintenanceCals, setCalculatedMaintenanceCals] = useState<number | null>(null);

   function calculateMaintenanceCalories (callback: Function) {
      if (weight == "") {
         toast.error("Please enter your weight");
         callback();
         return;
      }
      if (height == "") {
         toast.error("Please enter your height");
         callback();
         return;
      }
      if (age == "") {
         toast.error("Please enter your age");
         callback();
         return;
      }
      let bmr = 0;
      if (gender == "Male") {
         bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseInt(age)) + 5;
      } else {
         bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseInt(age)) - 161;
      }
      const maintenanceCalories = bmr * activityMultipliers[activityLevel];
      setCalculatedMaintenanceCals(maintenanceCalories);
      callback();
   }
   
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Maintenance Calories</Heading>
         <SubHeading>Calculate your Maintenance Calories by filling the fields below</SubHeading>
         {(calculatedMaintenanceCals !== null) && (<div className="box pd-15 full dfb flex-wrap gap-10">
            <Card styles={{
               width: "100%",
               maxWidth: "400px",
               border: "1px solid #ececec",
               borderRadius: "20px",
               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.094)",
               padding: "20px", background: "#8dffcfa0"
            }}>
               <div className="text-xxxs full bold-500 grey-5">Your Maintenance Calories</div>
               <div className="text-l bold-800 full">
                  {formatNumber(calculatedMaintenanceCals, {
                     showDecimals: false,
                     useCommas: true,
                     useShorthand: false
                  })} kCal
               </div>
            </Card>
         </div>)}
         <SubHeading>Male or Female</SubHeading>
         <FormContent>
            <Select 
               options={["Male", "Female"]}
               style={{ width: "100%", maxWidth: "400px" }}
               selectedOptionStyle={{ padding: "6px 10px" }}
               optionStyle={{ padding: "8px 10px" }}
               onSelect={option => setGender(option)}   
            />
         </FormContent>
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
         <SubHeading>Height in centimetres</SubHeading>
         <FormContent>
            <input 
               type="number"
               className="xs pd-14 pdx-2"
               placeholder="Height (cm)"
               value={height}
               onChange={e => setHeight(e.target.value)}   
            />
         </FormContent>
         <Spacing />
         <SubHeading>How old are you?</SubHeading>
         <FormContent>
            <input 
               type="number"
               className="xs pd-14 pdx-2"
               placeholder="Age"
               value={age}
               onChange={e => setAge(e.target.value)}   
            />
         </FormContent>
         <Spacing />
         <SubHeading>How often do you exercise ?</SubHeading>
         <FormContent>
            <Select 
               options={activityLevelsOptions}
               style={{ width: "100%", maxWidth: "400px" }}
               selectedOptionStyle={{ padding: "6px 10px" }}
               optionStyle={{ padding: "8px 10px" }}
               onSelect={(option, index) => setActivityLevel(index!)}   
            />
         </FormContent>
         <FormContent styles={{ padding: "20px 0" }}>
            <AwaitButton
               className="xs pd-15 pdx-6"
               onClick={calculateMaintenanceCalories}
            >
                  Calculate
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
