//-- Imports 
import { useState } from 'react'
import './style.css'

// Ou uso fetch() ou Axios
export default function App(){
	const [DB, setDB] = useState([])
	const [count, setCount] = useState(1)
	
	const TakeData = () => {
		const title = document.getElementById('dataTitle')
		const content = document.getElementById('dataContent')

		if (title.value.length != 0 && content.value.length != 0)	{
			setDB([...DB, {
				id : count,
				title: title.value,
				content : content.value 
			}])
			setCount(count + 1)
			
			title.value = ''
			content.value = ''
		} else {
			alert("Preencha todos os campos")

		}
	}

	return(<>
		<div className="wall">
			<div className="inputCard">
				<input id="dataTitle" placeholder='Title'></input>
				<textarea id="dataContent" placeholder='Content'></textarea>
				<button onClick={TakeData}>Criar</button>
			</div>
	
			<div className="fieldCards">
				{DB.map((item) => (
					<Card DB={DB} setDB={setDB} item={item} key={item.id} />
				))}
			</div>
		</div>
	</>)
}

function Card(props){
	const [title, setTitle] = useState(props.item.title)
	const [content, setContent] = useState(props.item.content)
	
	const Delete = (id) => {
		props.setDB(props.DB.filter((item) => item.id != id ? true : false))
	}

	const [blink, setBlink] = useState(false)
	const Update = (id) =>{
		const p = props.DB.map((task) => {
			if(task.id == id){
				return {...task, title : title, content : content}
			}else{
				return task
			}
		})
		setBlink(!blink)
		props.setDB(p)
	}
	
	return (<>
		<div key={props.item.id} className='card'> 
			<div className='cardTitle'>
				<input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value) } />
			</div>
			<div className='cardContent'>
				<textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value) } />
			</div>
			<div className='cardTools'>
				<p className={(blink ? 'saved' : '')}>{(props.item.id < 10)? `0${props.item.id}` : props.item.id}</p>
				<button className="btSave" onClick={() => Update(props.item.id)}>save</button>
				<button className='btDelete' onClick={() => Delete(props.item.id)}>delete</button>
				{/* Sem arrow function, a função é executada automaticamente */}
			</div>
		</div>
	</>);
}
