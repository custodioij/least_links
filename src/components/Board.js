import React, { useContext , useState, useRef, useEffect} from 'react'
import { WordleContext } from '../App'
// import Grid from './Grid/Grid'
// import Keyboard from './Keyboard/Keyboard'
import fetchWikiPage from './Page/WikiPage'
import LinkCounter from './Page/LinkCounter'

export default function Board() {
    const {word, initialPage, targetPage} = useContext(WordleContext)

    // Use useRef to persist the incrementCounter function
    const counterRef = useRef(null);
    const contentRef = useRef(null);

    // State to keep track of the counter value
    const [counterValue, setCounterValue] = useState(0);

    // State to keep track of the content
    const [content, setContent] = useState({ pageText: 'teste' });
    const [title, setTitle] = useState(initialPage)
    const [victory, setVictory] = useState('');

    // Fetch initial content
    useEffect(() => {
        // Initialize the counter only once
        counterRef.current = LinkCounter();

        // Example: Add onClick event to all links
        if (contentRef.current) {
            const links = contentRef.current.querySelectorAll('a');
            links.forEach(link => {
                link.onclick = (event) => {
                    event.preventDefault();
                    handleLinkClick(link.title);
                };
            });
        }
        // Fetch initial content
        const fetchData = async () => {
            const data = await fetchWikiPage({ title: title });
            setContent(data);
        }
        fetchData()
    }, [content]);

    // Function to handle link click and update counter
    const handleLinkClick = (link_title) => {
        console.log('here')
        const newCount = counterRef.current();
        setCounterValue(newCount);
        setTitle(link_title);
        if (targetPage === link_title) {
            setVictory('You have won in '.concat(newCount).concat(' steps!'));
        };
        // console.log('title: '.concat(title));
        const fetchData = async () => {
            const data = await fetchWikiPage({ title: link_title });
            setContent(data);
        }
        fetchData()
        // console.log(content.extract);
    };

    // Function to sanitize links
    const sanitizeLink = (link) => {
        // A link will have the format:
        // <a href="/wiki/Bicycle_racing" class="mw-redirect" title="Bicycle racing">racing cyclist</a>
        // We must also eliminate the format:
        // <a href="/wiki/Help:IPA/Polish" title="Help:IPA/Polish">&#91;kataˈʐɨna<span class="wrap"> </span>ɲɛvjaˈdɔma&#93;</a>
        // Let's use Regex
        // 1. Is it IPA pronunciation guide?
        let sanitizedLink = ''
        // const styleStr = 'style="color: red; cursor: pointer; text-decoration: underline;"';
        const styleStr = 'style="text-decoration: underline;"';
        if (link.includes('Help:IPA')) {
            // Then sanitize by keeping the core only and removing link formatting
            sanitizedLink = link.replace(/<a.*?>/g, "").replace(/<\/a>/);
        } else { // Else, it's a proper link
            // Extract the title
            const linkTitle = link.match(/<a.*?>/)[0].replace(/<a.*? title="/, "").replace(/".*?>/, "");
            // sanitizedLink = link.replace(/<a.*?>/, `<a href="#" onClick={handleLinkClick('${encodeURIComponent(linkTitle)}')}>`)
            sanitizedLink = link.replace(/<a.*?>/, `<a href="#" ${styleStr} title="${linkTitle}">`);
            sanitizedLink = sanitizedLink.replace(/<\/a>/, '</a>');
        }
        return sanitizedLink
    }

    // Function to sanitize all links in extract
    const sanitizeExtract = (extract) => {
        if (typeof extract === 'string' || extract instanceof String) {
            return extract.replace(/<a.*?>.*?a>/g, sanitizeLink)
        } else {
            return 'Not a string'
        }
    }
    
    // const extract = <div dangerouslySetInnerHTML={{ __html: content.extract }} />
    // const links = content.links && Array.isArray(content.links) ? (
    //     <div>
    //         <ul>
    //             {content.links.map((link, index) => (
    //                 <li key={index}>
    //                     <a href="#" onClick={() => handleLinkClick(link.title)}>{link.title}</a>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // ) : null ;

    return (
        <div className="flex flex-col justify-center items-center p-20" >
            {/* <h1 className="font-extrabold text-5xl m-4">Totally not WORDLE</h1> */}
            {/* <Grid/> */}
            {/* <Keyboard/> */}
            {/* <WikiPage/> */}
            {/* <a href="#" onClick={() => handleLinkClick('Wikipedia')}>{'Wikipedia'}</a> */}
            <h2 className="font-extrabold text-3xl m-4">Go from "{initialPage}" to "{targetPage}" in the fewest links</h2>
            <h3>Currently at {title}, with {counterValue} links</h3>
            <h2 className="font-extrabold text-2xl m-4">{victory}</h2>
            <div ref={contentRef} dangerouslySetInnerHTML={{ __html: sanitizeExtract(content) }} />
            <div>Counter: {counterValue}</div> {/* Display the counter value */}
            <div><a href="#" onClick={() => handleLinkClick()}>{'botao teste'}</a></div>
            <small className='m-5' >#Refresh Page to play again with different word.</small>
            <small className='rotate-180 text-[4px]' > {word} </small>
        </div>
    )
}
