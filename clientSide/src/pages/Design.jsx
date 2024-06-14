import './Design.scss'
import { RiAddCircleLine, RiDeleteBin2Line, RiStarLine } from 'react-icons/ri'
import { FaCheckSquare } from 'react-icons/fa'
import { useState, useEffect, useContext, createContext } from 'react'
import { Exchange } from '../elements/fetch'
import moment from 'moment'

const context = createContext() // Criei o contexto

export default function Design() {
	const title = document.getElementsByTagName('title')[0]
	title.innerHTML = 'App Task'
	const [DB, setDB] = useState([])
	const [show, setShow] = useState(1)

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
	const [DB, setDB, show, setShow] = useContext(context)

	const createNote = async () => {
		// Conexão com API
		const valor = await Exchange(
			{ title: '', content: '', favorited: show == 2 ? true : false },
			'http://127.0.0.1:5000/toDo/cards',
			'POST'
		)
		// Atualizar o Local DB dos dados salvados no serverSide
		setDB([...DB, valor])
	}

	return (
		<div className='menuApp'>
			<button className='buttonMenu' onClick={() => setShow(1)}>
				<span className={`${show == 1 && 'onAba'}`}>Todos</span>
			</button>
			<button className='buttonMenu' onClick={() => setShow(2)}>
				<span className={`${show == 2 && 'onAba'}`}>Concluidos </span>
			</button>
			<button className='buttonMenu' onClick={() => setShow(3)}>
				<span className={`${show == 3 && 'onAba'}`}>Pendente </span>
			</button>
			<input
				className='dateInput'
				type='date'
				onChange={(e) => setDay(e.target.value)}
			/>
			{/* <span className='nameApp'>LEMURE</span> */}
			<button className='createNote' onClick={() => createNote()}>
				<RiAddCircleLine /> Create Note
			</button>
		</div>
	)
}

function NotesField() {
	const [DB, setDB, show] = useContext(context)

	useEffect(() => {
		// Puxar todos as Tasks do ServerSide
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

	const showFilter = (Day, numb) => {
		const filtro = 0
		if(numb == 2){
			filtro = true
		} else {
			filtro = false
		}

		if (moment(Day, 'YYYY-MM-DD').isValid()) {
			return DB.filter((item) => item.validity === Day && item.favorited == filtro).map((item) => (
				<Note item={item} key={item.id} />
			))
		} else {
			return DB.map((item) => <Note item={item} key={item.id} />)
		}
	}

	return (
		<div className='notesField'>
			{show == 1 && DB.map((item) => <Note item={item} key={item.id} />)}

			{show == 2 &&
				DB.filter((item) => true === item.favorited).map((item) => (
					<Note item={item} key={item.id} />
				))}

			{show == 3 &&
				DB.filter((item) => false === item.favorited).map((item) => (
					<Note item={item} key={item.id} />
				))}
		</div>
	)
}

function Note(props) {
	const [DB, setDB] = useContext(context)
	const [title, setTitle] = useState(props.item.title)
	const [content, setContent] = useState(props.item.content)
	const [validity, setValidity] = useState(props.item.validity)
	const [favo, setFavo] = useState(props.item.favorited)

	const Delete = (id) => {
		const newDB = DB.filter((item) => item.id !== id)
		setDB(newDB)
		Exchange(id, `http://127.0.0.1:5000/toDo/cards/${id}`, 'DELETE')
	}

	const Update = (id) => {
		// Atualizar Local DB
		const item = DB.map((task) => {
			if (task.id === id) {
				return {
					...task,
					title: title,
					content: content,
					favorited: favo,
					validity: validity,
				}
			} else {
				return task
			}
		})
		setDB(item)

		// Atualizar Server DB
		Exchange(
			{ title: title, content: content, favorited: favo, validity: validity },
			`http://127.0.0.1:5000/toDo/cards/${id}`,
			'PUT'
		)
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
					spellCheck='false'
					maxLength={64}
				/>
				<textarea
					placeholder='Content'
					value={content}
					onChange={(e) => {
						setContent(e.target.value)
					}}
					spellCheck='false'
				/>
				<div className='toolsNote'>
					<button className='deleteNote' onClick={() => Delete(props.item.id)}>
						<RiDeleteBin2Line />
					</button>
					<input
						type='date'
						className='validade'
						value={validity}
						onChange={(e) => setValidity(e.target.value)}
						onBlur={(e) => {
							if (moment(e.target.value, 'YYYY-MM-DD').isValid()) {
								Update(props.item.id)
							}
						}}
						min={props.item.date}
					/>
					<button className='saveNote' onClick={() => setFavo(!favo)}>
						<FaCheckSquare style={{ color: favo ? '#4eff98' : '' }} />
					</button>
					<span className='trueDate'>
						{moment(props.item.date).format('DD MMM YYYY')}
					</span>
				</div>
			</div>
		</div>
	)
}
