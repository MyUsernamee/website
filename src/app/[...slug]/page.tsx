import pandoc from "node-pandoc";
import fs from "fs";
import { promises as fsp } from "fs";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

export async function generateStaticParams() {

    const entries = fs.readdirSync("public/pages_md/", {withFileTypes: true, recursive: true});

    let paths = [];

    for (const path of entries) {
        if (path.isFile()) {
            paths.push({ slug: path.name.split("/")});
        }
    }
    return paths;
}

export default async function Page({params}: any) {
    
    const { slug }: {slug: [string];} = await params;
    const page_path = "public/pages_md/" + slug.join("/");
    const file_path = "/pages_md/" + slug.join("/");

    let page_raw_md_path = page_path + ".md";
    let page_md_path = page_path + "/page.md";

    if (!fs.existsSync(page_raw_md_path) && !fs.existsSync(page_md_path)) {
        redirect(file_path)
    }

     
    let md_html = "";

    if (fs.existsSync(page_md_path))
         md_html = await pandoc_async(page_md_path, "-f markdown -t html --mathml")
    if (fs.existsSync(page_raw_md_path))
         md_html = await pandoc_async(page_raw_md_path, "-f markdown -t html --mathml")

    // TODO: Double check this is safe. Possible attack surface.
    return <div>
        <div dangerouslySetInnerHTML={{ __html: md_html }} />
    </div>
}
