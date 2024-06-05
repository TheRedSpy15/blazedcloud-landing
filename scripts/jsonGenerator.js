import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import { settings } from "../src/config/config.json";
const { blog_folder } = settings;
const jsonDir = "./.json";

// get data from markdown
const getData = (folder) => {
    const getPath = readdirSync(join(folder));
    const sanitizeData = getPath.filter((item) => item.includes(".md"));
    const filterData = sanitizeData.filter((item) => item.match(/^(?!_)/));
    const getData = filterData.map((filename) => {
        const file = readFileSync(join(folder, filename), "utf-8");
        const { data } = matter(file);
        const content = matter(file).content;
        const slug = data.slug ? data.slug : filename.replace(".md", "");

        return {
            frontmatter: data,
            content: content,
            slug: slug,
        };
    });
    const publishedPages = getData.filter(
        (page) => !page.frontmatter?.draft && page
    );
    return publishedPages;
};

// get post data
const posts = getData(`src/content/${blog_folder}`);

try {
    // creare folder if it doesn't exist
    if (!existsSync(jsonDir)) {
        mkdirSync(jsonDir);
    }

    // create posts.json file
    writeFileSync(`${jsonDir}/posts.json`, JSON.stringify(posts));
} catch (err) {
    console.error(err);
}
