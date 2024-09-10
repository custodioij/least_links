// check also https://www.npmjs.com/package/wikijs
// and https://www.npmjs.com/package/sanitize-html

export default async function fetchWikiPage({ title = 'Katarzyna Niewiadoma' }) {
    // Alternative API call
    // const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|links&pllimit=${pllimit}&plnamespace=${plnamespace}&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
    // https://en.wikipedia.org/w/api.php?action=parse&section=0&format=json&prop=text&page=Katarzyna_Niewiadoma&origin=*
    const url = `https://en.wikipedia.org/w/api.php?action=parse&section=0&format=json&prop=text&page=${encodeURIComponent(title)}&redirects&origin=*`;
    let pageText = 'init';
    console.log(url)
    const separatorBox = "</tr></tbody></table>\n<p>";
    const separatorCitations = '<ol class="references">';
    // Would be better to remove the whole line where it appears
    try {
        const response = (await fetch(url));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        pageText = data.parse.text['*'];
        // Remove box and other preamble IF it exists
        console.log(pageText)
        if (pageText.includes(separatorBox)) {
            const partsBox = pageText.split(separatorBox);
            // console.log(parts[1])
            // console.log(parts[2])
            pageText = '<p>'.concat(partsBox[1])
            console.log(pageText)
        }
        // Remove citations at the bottom IF it exists
        if (pageText.includes(separatorCitations)) {
            const partsCitations = pageText.split(separatorCitations);
            pageText = partsCitations[0]
            console.log(pageText)
        }
        // Remove footnote marks
        // Everything between <sup ... class="reference"> ... </sup>
        // Let's try Regex. See for an example: https://stackoverflow.com/questions/22677593/replace-all-instances-of-anchor-tag-in-a-large-string
        // Also see https://regex101.com/ to try out
        // console.log(pageText.replace(/<sup.*?<\/sup>/g, ""))
        pageText = pageText.replace(/<sup.*?<\/sup>/g, "")
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
    return pageText;
}