import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: 'E-Tutor',
  description: 'Educating the future',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
