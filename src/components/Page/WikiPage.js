import React, { useState, useEffect } from 'react'

// export default function WikiPage() {
//     console.log('hello 3')
//     return "Hello world 3";
// }

// export default function WikiPage({ title }) {
export default function WikiPage() {
    const [content, setContent] = useState('Loading...');
    const [error, setError] = useState(null);
    // const title = 'Creative Commons license'
    const title = 'title'

    useEffect(() => {
        async function fetchData() {
            // const url = `https://en.wikipedia.org/wiki/Wikipedia`;
            const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|links&format=json&exintro=&titles=Stack%20Overflow&origin=*`;
            // const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
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
                // setContent(extract);
                // setContent(links);
                setContent({ extract, links });
            } catch (error) {
                setError('There has been a problem with your fetch operation: ' + error.message);
            }
        }

        fetchData();
    }, [title]);

    if (error) {
        return <div>{error}</div>;
    }
    // return <div dangerouslySetInnerHTML={{ __html: content }} />;
    // console.log('here')
    // console.log(content)
    // console.log(content.extract)
    // console.log(content.links[1]['title'])
    // console.log('here2')
    // return <div dangerouslySetInnerHTML={{ __html: content.extract }} />;
    // return (
    //     <div>
    //         <div dangerouslySetInnerHTML={{ __html: content.extract }} />
    //         <ul>
    //             {content.links.map((link, index) => (
    //                 <li key={index}>{link.title}</li>
    //             ))}
    //         </ul>
    //     </div>
    // );
    return content
}
