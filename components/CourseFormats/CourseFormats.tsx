'use client'

import { useRouter } from "next/navigation";

type CourseFormatsProps = {
   children: React.ReactNode;
   styles?: React.CSSProperties;
   url?: string;
}

export function Heading ({ children, styles }: CourseFormatsProps) {
   return (<div className="text-l full bold-700" style={styles}>{children}</div>)
}

export function SubHeading ({ children, styles }: CourseFormatsProps) {
   return (<div className="text-sm full bold-600 pd-05 mt-1" style={styles}>{children}</div>)
}

export function BodyContent ({ children, styles }: CourseFormatsProps) {
   return (<div className="text-xxs pd-05 full line-height-15" style={styles}>{children}</div>)
}

export function FormContent ({ children, styles }: CourseFormatsProps) {
   return (<div className="form-content" style={styles}>{children}</div>)
}

export function BoldColour ({ children, styles }: CourseFormatsProps) {
   return (<span className="text-xxs bold-600 bold-colour" style={styles}>{children}</span>)
}

export function BoldColourLink ({ children, styles, url }: CourseFormatsProps) {
   const router = useRouter();
   return (<span className="text-xxs bold-600 bold-colour" style={styles} onClick={() => router.push(url!)}>{children}</span>)
}