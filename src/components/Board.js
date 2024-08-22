import React, { useContext } from 'react'
import { WordleContext } from '../App'
import Grid from './Grid/Grid'
import Keyboard from './Keyboard/Keyboard'
import WikiPage from './Page/WikiPage'

export default function Board() {
    const {word} = useContext(WordleContext)
    const content = WikiPage()
    const extract = <div dangerouslySetInnerHTML={{ __html: content.extract }} />
    const links = content.links && Array.isArray(content.links) ? (
        <div>
            <ul>
                {content.links.map((link, index) => (
                    <li key={index}>
                        <a href="#" onClick={() => window.location.reload()}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    ) : null ;
    // const links = (<div> <ul> {content.links.map((link, index) => (<li key={index}>{link.title}</li> ))} </ul> </div>);
    // const links = content.links && Array.isArray(content.links) ? (
    //     <div>
    //       <ul>
    //         {content.links.map((link, index) => (
    //           <li key={index}>{link.title}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   ) : null ;
    return (
        <div className="flex flex-col justify-center items-center" >
            <h1 className="font-extrabold text-5xl m-4">Totally not WORDLE</h1>
            <Grid/>
            <Keyboard/>
            {/* <WikiPage/> */}
            {extract}
            {links}
            <small className='m-5' >#Refresh Page to play again with different word.</small>
            <small className='rotate-180 text-[4px]' > {word} </small>

          {/* <h4>Source Code: <a className='text-blue-400 hover:text-decoration-line' href='https://github.com/ksekwamote/wordle_clone.git'>https://github.com/ksekwamote/wordle_clone.git</a></h4>
            <div className="m-10">
            <h2 className='text-center font-bold' >My Journey Of Creating The Wordle Game</h2>
                <iframe
                width="653"
                height="400"
                src={`https://www.youtube.com/embed/svhDCPX5xN4`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
        </div> */}
        </div>
    )
}
