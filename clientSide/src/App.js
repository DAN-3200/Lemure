//-- Imports 
import { useState, useEffect } from 'react'
import './style.css'

/* Ou uso fetch() ou Axios
	fetch('url',{...}).then(function(response){});
*/
function Exchange(dict, url, method){
	return new Promise((resolve, reject) => fetch(url, {
			method : method,
			credentials : 'include',
			body : JSON.stringify(dict),
			cache : 'no-cache',
			headers : new Headers({
				"content-type" : "application/json"
			})
		}).then((response) => {
			if (response.status !== 200){
				console.log("dado instável")
				return;
			}
			return response.json();
		}).then((newData) => {
				return resolve(newData)
		}).catch((error)=>
			reject(error)
		)
	)
}

// -- Função principal
export default function App(){
	const [DB, setDB] = useState([])
	const [view, setView] = useState('vazio')

	// Pegar todos dados do API: uma única vez 
	useEffect(() =>{
		try {
			const x = async () =>{
				const resp = await (await fetch('http://127.0.0.1:5000/toDo/cards')).json()
				setDB([...DB, ...resp])	
				console.log(resp)
			} 
			x()
		} catch (error) {
			console.log(`Error: ${error}`)
		}
	},[]) 

	const TakeData = async () => {
		const title = document.getElementById('dataTitle')
		const content = document.getElementById('dataContent')

		if (title.value.length !== 0 && content.value.length !== 0){
			// Conexão com API
			const valor = await Exchange({title : title.value, content : content.value}, 'http://localhost:5000/create', 'POST')
			setView(`PyBanco : Title ${valor.title}, Content  ${valor.content}`)
			setDB([...DB, valor])

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
			<p style={{color: 'white'}}>{view}</p>
			<div className="fieldCards">
				{DB.map((item, index) => (
					<Card DB={DB} setDB={setDB} item={item} key={index} />
				))}
			</div>
		</div>
	</>)
}

// -- Card componente
function Card(props){
	const [title, setTitle] = useState(props.item.title)
	const [content, setContent] = useState(props.item.content)
	
	const Delete = (id) => {
		props.setDB(props.DB.filter((item) => item.id !== id ? true : false))
	}

	const [blink, setBlink] = useState(false)
	const Update = (id) =>{
		const p = props.DB.map((task) => {
			if(task.id === id){
				return {...task, title : title, content : content}
			}else{
				return task
			}
		})
		setBlink(true)
		props.setDB(p)
	}

	useEffect(() => {
		async function blinkDaley() {
		  await new Promise((resolve) => setTimeout(resolve, 2*1000));
		  setBlink(false);
		}
		
		blinkDaley();
	}, [blink]);
	  
	
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

