'use client'
import "./CourseItems.css"
import { Apple, BicepsFlexed, ChartSpline, CookingPot, Dumbbell, Home, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Card from "../Card/Card"

export const courseItems = [
   {
      name: "Muscles",
      url: "/muscles",
      icon: BicepsFlexed,
      color: "#ffa162"
   },
   {
      name: "Workouts",
      url: "/workouts",
      icon: Dumbbell,
      color: "#84ff3d"
   },
   {
      name: "Tracking",
      url: "/tracking",
      icon: ChartSpline,
      color: "#a662ff"
   },
   {
      name: "Meals",
      url: "/meals",
      icon: CookingPot,
      color: "#ff6abc"
   },
   {
      name: "Ingredients",
      url: "/ingredients",
      icon: Apple,
      color: "#ff5e5e"
   },
   {
      name: "Progress",
      url: "/progress",
      icon: Star,
      color: "#6b61ff"
   },
]

export default function CourseItems() {
   const router = useRouter();

   return (
      <div className="course-items">
         {courseItems.map(courseItem => (
            <Card 
               key={courseItem.name} 
               className="course-item-card" 
               styles={{ background: `${courseItem.color}60` }}
               onClick={() => router.push(courseItem.url)}
            >
               <div className="course-item-icon" style={{ background: courseItem.color }}>
                  <courseItem.icon size={20} />
               </div>
               <div className="text-m bold-800 full">{courseItem.name}</div>
            </Card>
         ))}
      </div>
   )
}

export function CourseItemsNavBar () {
   const router = useRouter();

   return (
      <div className="course-items-navbar">
         <div 
            className="course-item-navbar-item" 
            style={{ background: `#b0bcff60` }}
            onClick={() => router.push("/")}
         >
            <Home size={20} />
            <div className="text-xxs bold-800 fit">Home</div>
         </div>
         {courseItems.map(courseItem => (
            <div 
               key={courseItem.name} 
               className="course-item-navbar-item" 
               style={{ background: `${courseItem.color}60` }}
               onClick={() => router.push(courseItem.url)}
            >
               <courseItem.icon size={20} />
               <div className="text-xxs bold-800 fit">{courseItem.name}</div>
            </div>
         ))}
      </div>
   )
}
