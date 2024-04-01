import './Test.css'

const title = document.getElementsByTagName('title')[0]
title.innerHTML = "Test"

export default function Test(){
    return (<>
        <div className="base">
            <div className='red'></div>
            <div className='green'></div>
            <div className='blue'></div>
        </div>
    </>)
}