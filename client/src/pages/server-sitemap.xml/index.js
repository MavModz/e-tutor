require("dotenv").config();
import { getServerSideSitemap } from "next-sitemap";
export const getServerSideProps = async (ctx) => {
    let posts = await fetch("https://e-tutor-gules.vercel.app/course");
    posts = await posts.json();
    const newsSitemaps = posts.map((item) => ({
        loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${item.courseName.toString()}`,
        lastmod: new Date().toISOString(),
    }));

    const fields = [...newsSitemaps];

    return getServerSideSitemap(ctx, fields);
};

export default function Site() { }