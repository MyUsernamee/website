import fs, { Dirent } from 'fs';
import fsAsync from 'fs/promises';

async function get_blog_pages() : Promise<Dirent[]>{
    let f_promise = new Promise<any>((resolve, reject) => {
        fs.readdir("pages_md/blog/", {withFileTypes : true}, (err, files) => {
            if (err)
                reject(err);

            resolve(files)
        })
    })

    return f_promise;
}

export default async function Blog() {
    // Get blog pages

    let page_dirents = await get_blog_pages();
    let pages = page_dirents.map((value, _, __) => {
        // If this is a dir, then we need to get the actual page.md
        if (value.isDirectory())
            return value.name + "/page.md";
        return value.name;
    })
    const titles: Promise<string[]>[] = pages.map(async (value, _, __) => {
        // Read the first line from the Files and then the second line is the description
        const file_lines = (await fsAsync.readFile("pages_md/blog/" + value, {encoding: "utf-8"})).split("\n"); 
        const title = file_lines[0].replaceAll("#", "").trim();
        const desc = file_lines[1].replaceAll("#", "").trim();

        return [title, desc, value.slice(0, value.length - 3)];
    });

    return <ul>
        {titles.map(async (value, _, __) => (
            <li><a href={"/blog/" + (await value)[2]}>{(await value)[0]}</a> - {(await value)[1]}</li>
        ))}
    </ul>
}
