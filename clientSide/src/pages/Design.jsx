import './Design.scss'
import { RiAddCircleLine, RiDeleteBin2Line, RiStarLine } from 'react-icons/ri'
import { useState, useEffect, useContext, createContext } from 'react'
import { Exchange } from '../elements/fetch'

const context = createContext() // Criei o contexto

export default function Design() {
	const title = document.getElementsByTagName('title')[0]
	title.innerHTML = 'App Note'
	const [DB, setDB] = useState([])
	const [show, setShow] = useState(true)

	return (
		<context.Provider value={[DB, setDB, show, setShow]}>
			<div className='box'>
				<MenuApp />
				<NotesField />
			</div>
		</context.Provider>
	)
}

function MenuApp() {
	const [DB, setDB, , setShow] = useContext(context)

	const createNote = async () => {
		// Conexão com API
		const valor = await Exchange(
			{ title: '', content: '' },
			'http://127.0.0.1:5000/toDo/cards',
			'POST'
		)
		setDB([...DB, valor])
	}

	return (
		<div className='menuApp'>
			<button className='buttonMenu' onClick={() => setShow(true)}>
				All
			</button>
			<button className='buttonMenu' onClick={() => setShow(false)}>
				Favorites
			</button>
			<span className='nameApp'>LEMURE</span>
			<button className='createNote' onClick={() => createNote()}>
				<RiAddCircleLine /> criar nota
			</button>
		</div>
	)
}

function NotesField() {
	const [DB, setDB, show] = useContext(context)

	useEffect(() => {
		try {
			const x = async () => {
				const resp = await (
					await fetch('http://127.0.0.1:5000/toDo/cards')
				).json()
				setDB([...DB, ...resp])
			}
			x()
		} catch (error) {
			console.log(`Error: ${error}`)
		}
	}, [])

	return (
		<div className='notesField'>
			{show
				? DB.map((item) => <Note item={item} key={item.id} />)
				: DB.filter((item) => true === item.favorited).map((item) => (
						<Note item={item} key={item.id} />
				  ))}
		</div>
	)
}

function Note(props) {
	const [DB, setDB] = useContext(context)
	const [title, setTitle] = useState(props.item.title)
	const [content, setContent] = useState(props.item.content)
	const [favo, setFavo] = useState(props.item.favorited)

	const Delete = (id) => {
		const newDB = DB.filter((item) => item.id !== id)
		setDB(newDB)
		Exchange(id, `http://127.0.0.1:5000/toDo/cards/${id}`, 'DELETE')
	}

	const Update = (id) => {
		const item = DB.map((task) => {
			if (task.id === id) {
				return { ...task, title: title, content: content, favorited: favo }
			} else {
				return task
			}
		})
		setDB(item)

		Exchange(
			{ title: title, content: content, favorited: favo },
			`http://127.0.0.1:5000/toDo/cards/${id}`,
			'PUT'
		)
	}

	const ActionDelete = (target) =>{
		console.log(target)
	} 

	useEffect(() => {
		Update(props.item.id)
	}, [title, content, favo])

	return (
		<div className='note'>
			<div className='formNote'>
				<input
					type='text'
					placeholder='Title...'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
					}}
				/>
				<textarea
					placeholder='Content...'
					value={content}
					onChange={(e) => {
						setContent(e.target.value)
					}}
				/>
				<div className='toolsNote'>
					<button className='deleteNote' onClick={() => Delete(props.item.id)}>
						<RiDeleteBin2Line />
					</button>
					<button className='saveNote' onClick={() => setFavo(!favo)}>
						<RiStarLine style={{ color: favo ? '#ffaa33' : '' }} />
					</button>
					<span>{props.item.date}</span>
				</div>
			</div>
		</div>
	)
}
