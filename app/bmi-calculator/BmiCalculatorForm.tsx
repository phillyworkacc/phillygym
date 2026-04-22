'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Spacing from "@/components/Spacing/Spacing";
import Card from "@/components/Card/Card";
import { FormContent, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { useState } from "react";
import { toast } from "sonner";
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems";

export default function BmiCalculatorForm() {
   const [weight, setWeight] = useState("");
   const [height, setHeight] = useState("");
   const [calculatedBMI, setCalculatedBMI] = useState<number | null>(null);

   function getBMICategory(bmi: number) {
      if (bmi < 18.5) return { result: "Underweight", color: "#ff4f4f" };
      if (bmi < 25) return { result: "Normal weight", color: "#53ff4d" };
      if (bmi < 30) return { result: "Overweight", color: "#ff9b3e" };
      return { result: "Obese", color: "#ff4f4f" };
   }

   function calculateBMI (callback: Function) {
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
      const bmi = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
      setCalculatedBMI(Number(bmi.toFixed(2)));
      callback();
   }

   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>BMI Calculator</Heading>
         <SubHeading>Calculate your BMI by filling the fields below</SubHeading>
         {(calculatedBMI !== null) && (<div className="box pd-15 full dfb flex-wrap gap-10">
            <Card styles={{
               width: "100%",
               maxWidth: "400px",
               border: "1px solid #ececec",
               borderRadius: "20px",
               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.094)",
               padding: "20px"
            }}>
               <div className="text-xxxs full bold-500 grey-5">BMI</div>
               <div className="text-l bold-800 full">{calculatedBMI}</div>
            </Card>
            <Card styles={{
               width: "100%",
               maxWidth: "400px",
               border: "1px solid #ececec",
               borderRadius: "20px",
               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.094)",
               padding: "20px",
               background: `${getBMICategory(calculatedBMI).color}60`
            }}>
               <div className="text-xxxs full bold-500 grey-5">BMI Category</div>
               <div className="text-l bold-800 full">{getBMICategory(calculatedBMI).result}</div>
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
         <SubHeading>Height in metres</SubHeading>
         <FormContent>
            <input 
               type="number"
               className="xs pd-14 pdx-2"
               placeholder="Height (m)"
               value={height}
               onChange={e => setHeight(e.target.value)}   
            />
         </FormContent>
         <FormContent styles={{ padding: "20px 0" }}>
            <AwaitButton
               className="xs pd-15 pdx-6"
               onClick={calculateBMI}
            >
                  Calculate BMI
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
