'use client'
import "./TrackingTools.css"
import { Activity, Beef, Flame } from "lucide-react"
import { useRouter } from "next/navigation"
import Card from "../Card/Card"

export const trackingTools = [
   {
      name: "BMI Calculator",
      url: "/bmi-calculator",
      icon: Activity,
      color: "#ffa162"
   },
   {
      name: "Maintenance Calories",
      url: "/maintenance-calories",
      icon: Flame,
      color: "#84ff3d"
   },
   {
      name: "Protein Goals",
      url: "/protein-goal",
      icon: Beef,
      color: "#a556ff"
   }
]

export default function TrackingTools () {
   const router = useRouter();

   return (
      <div className="tracking-tools">
         {trackingTools.map(trackingTool => (
            <Card 
               key={trackingTool.name} 
               className="tracking-tool-card" 
               styles={{ background: `${trackingTool.color}60` }}
               onClick={() => router.push(trackingTool.url)}
            >
               <div className="tracking-tool-icon" style={{ background: trackingTool.color }}>
                  <trackingTool.icon size={20} />
               </div>
               <div className="text-m bold-800 full">{trackingTool.name}</div>
            </Card>
         ))}
      </div>
   )
}
