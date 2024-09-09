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
        
        // Fetch initial content
        const fetchData = async () => {
            const data = await fetchWikiPage({ title: title });
            setContent(data);
        }
        fetchData()
    }, []);

    // Function to handle link click and update counter
    const handleLinkClick = (link_title) => {
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
    
    const extract = <div dangerouslySetInnerHTML={{ __html: content.extract }} />
    const links = content.links && Array.isArray(content.links) ? (
        <div>
            <ul>
                {content.links.map((link, index) => (
                    <li key={index}>
                        <a href="#" onClick={() => handleLinkClick(link.title)}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    ) : null ;

    return (
        <div className="flex flex-col justify-center items-center" >
            {/* <h1 className="font-extrabold text-5xl m-4">Totally not WORDLE</h1> */}
            {/* <Grid/> */}
            {/* <Keyboard/> */}
            {/* <WikiPage/> */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <h2 className="font-extrabold text-3xl m-4">Go from "{initialPage}" to "{targetPage}" in the fewest links</h2>
            <h3>Currently at {title}, with {counterValue} links</h3>
            <h2 className="font-extrabold text-2xl m-4">{victory}</h2>
            {/* {extract}
            {links} */}
            <div>Counter: {counterValue}</div> {/* Display the counter value */}
            <div><a href="#" onClick={() => handleLinkClick()}>{'botao teste'}</a></div>
            <small className='m-5' >#Refresh Page to play again with different word.</small>
            <small className='rotate-180 text-[4px]' > {word} </small>
        </div>
    )
}
