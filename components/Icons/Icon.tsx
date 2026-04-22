"use client"
import "./Icon.css"
import PhillyGymLogoGraphicBlack from "@/public/brand/PhillyGymGraphicBlack.png"
import Instagram from "@/public/platforms/instagram.png"
import Tiktok from "@/public/platforms/tiktok.png"

type IconProps = {
   size: number;
}

type CustomIconProps = {
   size: number;
   url: string;
   round?: boolean;
}

export function MinwebLogo ({ size }: IconProps) {
   return (
      <div className='icon' style={{
         width: `${size}px`, height: `${size}px`
      }}>
         <img src={"/minwebapplogo.png"} alt="logo" />
      </div>
   )
}

export function PhillyGymLogo ({ size }: IconProps) {
   return (
      <div 
         className='icon' 
         style={{ width: `${size * (657/121)}px`, height: `${size}px` }}
      >
         <img 
            src={PhillyGymLogoGraphicBlack.src} 
            alt="logo"
         />
      </div>
   )
}

export function CustomIcon ({ size, url, round }: CustomIconProps) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={url} alt="icon" width={size} height={size} />
   </div>
}

export function CustomUserIcon ({ size, url, round }: CustomIconProps) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={url} alt="icon" width={size} height={size} />
   </div>
}

export function InstagramIcon ({ size, round }: Omit<CustomIconProps, "url">) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={Instagram.src} alt="icon" width={size} height={size} />
   </div>
}

export function TiktokIcon ({ size, round }: Omit<CustomIconProps, "url">) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={Tiktok.src} alt="icon" width={size} height={size} />
   </div>
}