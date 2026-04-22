'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import ImageGallery from "@/components/ImageGallery/ImageGallery"
import { BodyContent, BoldColourLink, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { mealImages } from "@/utils/images"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"

export default function MealsPage() {
   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>Meals</Heading>
         <SubHeading>Protein</SubHeading>
         <BodyContent>
            Protein is the nutrient that builds muscle and we need loads of it in our meals to maximise our gains. It repairs our muscle tissues and makes them bigger so that the next time we exercise we can do more. The best protein sources for muscle growth are eggs, chicken, beef, fish and sometimes milk.
         </BodyContent>

         <SubHeading>Protein Shakes</SubHeading>
         <BodyContent>
            These should not be a daily thing, they are a supplement for when you can't hit your protein goal that day. The best protein shakes are either the ones you make yourself using protein powder or Premier Protein, the best i've had so far.
         </BodyContent>
         <ImageGallery images={[ mealImages.premierProteinShake ]} />
         <Spacing />
         
         <SubHeading>Fat</SubHeading>
         <BodyContent>
            Fat is in all sorts of food and they are stored in the body for long term energy, they start to burn right after we've used all the disposable energy in our bodies. We cannot control where fat is stored in the body but we can reduce the amount of it. Fat gives us energy but we sacrifice us looking chubby, unkept and feeling insecure.
         </BodyContent>

         <SubHeading>Fat to Protein Ratios</SubHeading>
         <BodyContent>
            Every food has a fat to protein ratio, this is how much fat we must consume to get to a certain amount of protein in a specified serving or size of that food item.
         </BodyContent>
         <BodyContent>
            To make it simpler: <Spacing />
            If you eat 100g of bread, you get 5g of fat but you get 13g of protein, so the fat to protein ratio is low (5:13) <br />
            If you ate 100g of cheese, you get 40g of fat but you get 25g of protein, so the fat to protein ratio is high (40:25)
         </BodyContent>
         <BodyContent>
            A high fat to protein ratio means we need to get a lot of fat in order to reach a low amount of protein, which is not good if we want to build muscle and lower our fat levels.
         </BodyContent>
         <BodyContent>
            A low fat to protein ratio means that we need a very low amount of fat to reach high amounts of protein, which is perfect if we want to build muscle and lower our fat levels.
         </BodyContent>
         <BodyContent>
            So, when eating you need to eat foods with a low fat to protein ratio so that you're building muscle without gaining excess fat that will make you look bloated and undefined.
         </BodyContent>
         
         <SubHeading>Some Meals I usually eat</SubHeading>
         <BodyContent styles={{ textDecoration: "underline" }}>Meal 1</BodyContent>
         <BodyContent>
            Rice, Eggs and Lean Beef (you can add spices and butter for flavour).
         </BodyContent>
         <ImageGallery images={[ mealImages.mealRiceEggsBeef ]} />
         <Spacing />
         <BodyContent styles={{ textDecoration: "underline" }}>Meal 2</BodyContent>
         <BodyContent>
            6 eggs and waffles (really basic but you can get a lot of protein from it and it tastes good).
         </BodyContent>
         <ImageGallery images={[ mealImages.mealChocWafflesEggs ]} />
         <Spacing />
         <BodyContent styles={{ textDecoration: "underline" }}>Meal 3</BodyContent>
         <BodyContent>
            Rice and chicken (I know everyone says this but you can spice up your chicken, add sauces and stuff to make it taste good but don't do too much so you're not just eating more fat than protein).
         </BodyContent>
         <ImageGallery images={[ mealImages.mealChopstixRiceChicken2 ]} />
         <Spacing />
         <BodyContent styles={{ textDecoration: "underline" }}>Meal 4</BodyContent>
         <BodyContent>
            Peanut Butter and Oats (Oats have fibre and give you good carbs, peanut butter has a lot of protein - quick note, make sure you look for peanut butter with a low fat to protein ratio, so less fat than protein per serving).
         </BodyContent>
         <ImageGallery images={[ mealImages.mealOatsPeanutButter ]} />
         <Spacing />
         
         <SubHeading>Calories</SubHeading>
         <BodyContent>
            Calories are energy units given to us from the food we eat, it varies for everyone due to weight, metabolism and activity throughout the day. Consuming more calories than you burn leads to weight gain, while consuming fewer results in weight loss. To bulk up and gain muscle without gaining fat, you need to eat about 200-300 calories above your <BoldColourLink url="/maintenance-calories">maintenance calories</BoldColourLink> and make sure your meals have a low fat to protein ratio.
         </BodyContent>
      </AppWrapper>
   )
}
