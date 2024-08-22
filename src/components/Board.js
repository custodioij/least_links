import React, { useContext , useState, useRef, useEffect} from 'react'
import { WordleContext } from '../App'
// import Grid from './Grid/Grid'
// import Keyboard from './Keyboard/Keyboard'
import WikiPage from './Page/WikiPage'
import LinkCounter from './Page/LinkCounter'

export default function Board() {
    const {word} = useContext(WordleContext)
    const content = WikiPage()

    // Use useRef to persist the incrementCounter function
    const counterRef = useRef(null);
    
    // Initialize the counter only once
    useEffect(() => {
        counterRef.current = LinkCounter();
    }, []);
    
    // State to keep track of the counter value
    const [counterValue, setCounterValue] = useState(0);

    // Function to handle link click and update counter
    const handleLinkClick = () => {
        const newCount = counterRef.current();
        setCounterValue(newCount);
    };
    
    const extract = <div dangerouslySetInnerHTML={{ __html: content.extract }} />
    const links = content.links && Array.isArray(content.links) ? (
        <div>
            <ul>
                {content.links.map((link, index) => (
                    <li key={index}>
                        {/* <a href="#" onClick={() => window.location.reload()}>{link.title}</a> */}
                        <a href="#" onClick={() => handleLinkClick()}>{link.title}</a>
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
            <small className='m-5' >#Refresh Page to play again with different word.</small>
            <small className='rotate-180 text-[4px]' > {word} </small>
        </div>
    )
}
