// We can fetch the whole page, cut after the introduction, and display the links properly. 
// For this, look for:
// the <p> after
// </tr></tbody></table> 
// and before:
// <meta property="mw:PageProp/toc" />

// check also https://www.npmjs.com/package/wikijs
// and https://www.npmjs.com/package/sanitize-html

export default async function fetchWikiPage({ title = 'Katarzyna Niewiadoma' }) {
    // Alternative API call
    // const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|links&pllimit=${pllimit}&plnamespace=${plnamespace}&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
    // https://en.wikipedia.org/w/api.php?action=parse&section=0&format=json&prop=text&page=Katarzyna_Niewiadoma&origin=*
    const url = `https://en.wikipedia.org/w/api.php?action=parse&section=0&format=json&prop=text&page=${encodeURIComponent(title)}&origin=*`;
    let pageText = 'init';
    const separator = "</tr></tbody></table>\n<p>";
    const separatorCitations = '<ol class="references">';
    // Would be better to remove the whole line where it appears
    try {
        const response = (await fetch(url));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Remove box and other preamble
        pageText = data.parse.text['*'];
        const parts = pageText.split(separator);
        // console.log(parts[1])
        // console.log(parts[2])
        pageText = '<p>'.concat(parts[1])
        // Remove citations at the bottom
        const partsCitations = pageText.split(separatorCitations);
        pageText = partsCitations[0]
        // Remove footnote marks
        // Everything between <sup ... class="reference"> ... </sup>
        // Let's try Regex. See for an example: https://stackoverflow.com/questions/22677593/replace-all-instances-of-anchor-tag-in-a-large-string
        // Also see https://regex101.com/ to try out
        // console.log(pageText.replace(/<sup.*?<\/sup>/g, ""))
        pageText = pageText.replace(/<sup.*?<\/sup>/g, "")

        // const pageTitle = data.parse.title
        // const pageID = data.parse.pageID
        // const page = data.query.pages;
        // const pageId = Object.keys(page)[0];
        // const extract = page[pageId].extract;
        // const links = page[pageId].links;
        // setContent({ extract, links });
        // content = { pageText, a: [] }
        // console.log('Fetch OK: '.concat(extract.substr(0, 200)));
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
    return pageText;
}