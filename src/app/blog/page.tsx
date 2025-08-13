import fs from 'fs';
import fsAsync from 'fs/promises';

async function get_blog_pages(){
    let f_promise = new Promise<string[]>((resolve, reject) => {
        fs.readdir("pages_md/blog/", (err, files) => {
            if (err)
                reject(err);

            resolve(files)
        })
    })

    return f_promise;
}

export default async function Blog() {
    // Get blog pages

    let pages = await get_blog_pages();
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
