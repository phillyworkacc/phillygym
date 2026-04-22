'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import ImageGallery from "@/components/ImageGallery/ImageGallery"
import Spacing from "@/components/Spacing/Spacing"
import { Heading, SubHeading, BodyContent } from "@/components/CourseFormats/CourseFormats"
import { mealImages } from "@/utils/images"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"

export default function IngredientsPage () {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Ingredients</Heading>
         <SubHeading>My highly suggested list of groceries/ingredients to get for your meals:</SubHeading>
         <BodyContent>Some form of bread (Brioche Buns)</BodyContent>
         <BodyContent>Peanut Butter (Make sure it has a fairly low fat to protein ratio)</BodyContent>
         <BodyContent>Lean Beef</BodyContent>
         <BodyContent>Fruit Juice (Orange Juice or Apple Juice)</BodyContent>
         <BodyContent>Waffles</BodyContent>
         <BodyContent>Eggs</BodyContent>
         <BodyContent>Chicken Breasts</BodyContent>
         <BodyContent>Butter and Spices (for flavour, don't over do it)</BodyContent>
         <Spacing />
         <ImageGallery images={[ mealImages.mealIngredients ]} />
         <Spacing />
         
      </AppWrapper>
   )
}
