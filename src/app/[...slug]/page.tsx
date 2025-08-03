import {pandoc} from "node-pandoc";
import fs from "fs";

export async function generateStaticPaths() {

    const entries = fs.readdirSync("pages/", {withFileTypes: true});

    let paths = [];

    for (const path of entries) {
        if (path.isFile()) {
            paths.push(path);
        }
    }
    return paths;
}

export default async function Page({params}: {params: Promise<{slug: [string]}>}) {
    
    let { slug }: {slug: [string];} = await params;
    let page_path = "pages/" + slug.join("/");

    return <div>Hello {slug.join("/")}</div>;
}
