import '@/app/globals.css';
import DraggableMenu from '@/components/Static/draggableMenu/DraggableMenu';
import '@/styles/course/courseDetails.css';
import '@/styles/course/responsive.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DraggableMenu />
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}
