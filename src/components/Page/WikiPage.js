export default async function fetchWikiPage({ title = 'Stack Overflow' }) {
    // Uses the WikiMedia API
    const pllimit = 'max'
    const plnamespace =  0 //'main'
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|links&pllimit=${pllimit}&plnamespace=${plnamespace}&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
    let content = { extract: 'teste 2', links: [] }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];
        const extract = page[pageId].extract;
        const links = page[pageId].links;
        // setContent({ extract, links });
        content = { extract, links }
        // console.log('Fetch OK: '.concat(extract.substr(0, 200)));
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
    return content;
}

// We can fetch the whole page, cut after the introduction, and display the links properly. 
// For this, look for:
// the <p> after
// </tr></tbody></table> 
// async function fetchFullWikiPage() {
//     return null
// }