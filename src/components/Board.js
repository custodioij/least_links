import React, { useContext , useState, useRef, useEffect} from 'react'
import { WordleContext } from '../App'
// import Grid from './Grid/Grid'
// import Keyboard from './Keyboard/Keyboard'
import fetchWikiPage from './Page/WikiPage'
import LinkCounter from './Page/LinkCounter'

export default function Board() {
    const {word} = useContext(WordleContext)
    // let extract = 'initial'
    // let links = 'initial'
    // const content = WikiPage({ title: 'Wikipedia' });
    // let title = 'Wikipedia'

    // Use useRef to persist the incrementCounter function
    const counterRef = useRef(null);

    // State to keep track of the counter value
    const [counterValue, setCounterValue] = useState(0);

    // State to keep track of the content
    const [content, setContent] = useState({ extract: 'teste', links: [] });
    const [title, setTitle] = useState('Wikipedia')
    // const [content, setContent] = useState(fetchWikiPage({ title: 'Wikipedia' }));

    // Fetch initial content
    useEffect(() => {
        // const initialContent = WikiPage({ title: 'Wikipedia' });
        // setContent(initialContent);
        // setContent(fetchWikiPage({ title: 'Wikipedia' }));
        // console.log(content.extract)

        const fetchData = async () => {
            const data = await fetchWikiPage({ title: title });
            setContent(data);
        }
        fetchData()
        console.log(content.extract)
        // extract = <div dangerouslySetInnerHTML={{ __html: content.extract }} />
        // console.log(extract)
    }, []);

    // Fetch initial content using the custom hook
    // const content = WikiPage('Wikipedia');
    
    // Initialize the counter only once
    useEffect(() => {
        counterRef.current = LinkCounter();
    }, []);

    // Function to handle link click and update counter
    const handleLinkClick = (link_title) => {
        const newCount = counterRef.current();
        setCounterValue(newCount);
        // const newContent = fetchWikiPage({ title: 'Stack Overflow' });
        // console.log(newContent)
        // const newContent = {extract: 'hello', links: []};
        // setContent(newContent); // Update state with the new content
        setTitle(link_title);
        console.log('title: '.concat(title));
        const fetchData = async () => {
            const data = await fetchWikiPage({ title: link_title });
            setContent(data);
        }
        fetchData()
        console.log(content.extract);
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
            <h1 className="font-extrabold text-5xl m-4">Totally not WORDLE</h1>
            {/* <Grid/> */}
            {/* <Keyboard/> */}
            {/* <WikiPage/> */}
            {extract}
            {links}
            <div>Counter: {counterValue}</div> {/* Display the counter value */}
            <div><a href="#" onClick={() => handleLinkClick()}>{'botao teste'}</a></div>
            <small className='m-5' >#Refresh Page to play again with different word.</small>
            <small className='rotate-180 text-[4px]' > {word} </small>
        </div>
    )
}
