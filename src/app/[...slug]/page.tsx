import pandoc from "node-pandoc";
import fs from "fs";
import { notFound } from "next/navigation";

function pandoc_async(src: string, args: string): Promise<string> {
    const p = new Promise<string>((resolve, reject) => {

        pandoc(src, args, (error: string, result: string) => {
            if (error) {
                reject(new Error(error))
                return;
            }

            resolve(result)
        })

    })

    return p;
}

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

export default async function Page({params}: any) {
    
    let { slug }: {slug: [string];} = await params;
    let page_path = "pages/" + slug.join("/") + ".md";

    if (!fs.existsSync(page_path))
        notFound();

    const md_html = await pandoc_async(page_path, "-f markdown -t html --mathml")

    // TODO: Double check this is safe. Possible attack surface.
    return <div>
        <div dangerouslySetInnerHTML={{ __html: md_html }} />
    </div>
}
