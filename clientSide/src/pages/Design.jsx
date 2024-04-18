import './Design.scss'
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiAddCircleLine, RiBox3Line, RiCheckboxCircleLine, RiDeleteBin2Line } from "react-icons/ri";

import { useState, useEffect } from 'react';
import { Exchange } from '../elements/fetch';

export default function Design() {
	const title = document.getElementsByTagName('title')[0]
	title.innerHTML = 'New Design'

	return (
		<div className='box'>
			<MenuApp />
			<NotesField />
		</div>
	)
}

function MenuApp() {

	return (
		<div className='menuApp'>
			<button className='buttonMenu'>All</button>
			<button className='buttonMenu'>Favorites</button>
			<button className='buttonMenu'>Trash</button>
			<span className='nameApp'> OHKEN</span>
			<button className='createNote'> <RiAddCircleLine/> criar nota</button>
		</div>
	)
}

function NotesField() {
	const [DB, setDB] = useState([])
	
	useEffect(() => {
		try {
			const x = async () => {
				const resp = await (
					await fetch('http://127.0.0.1:5000/toDo/cards')
				).json()
				setDB([...DB, ...resp])
				console.log(resp)
			}
			x()
		} catch (error) {
			console.log(`Error: ${error}`)
		}
	}, [])

	return (
		<div className='notesField'>
			{DB.map((item, index) => (
				<Note DB={DB} setDB={setDB} item={item} key={index} />
			))}
		</div>
	)
}

function Note(s){
	const [title, setTitle] = useState(s.item.title)
	const [content, setContent] = useState(s.item.content)

	const Delete = (id) => {
		const newDB = s.DB.filter((item) => item.id !== id)
		console.log(s.DB)
		s.setDB(newDB)
		console.log(s.DB)
		Exchange(id, `http://127.0.0.1:5000/toDo/cards/${id}`, 'DELETE')
	}

	const Update = (id) => {
		const p = s.DB.map((task) => {
			if (task.id === id) {
				Exchange(
					{ title: title, content: content },
					`http://127.0.0.1:5000/toDo/cards/${id}`,
					'PUT'
				)
				return { ...task, title: title, content: content }
			} else {
				return task
			}
		})
		s.setDB(p)
		console.log(s.DB)
	}

	return(
		<div className='note'>
			<div className='formNote'>
				<input type='text' placeholder='Title...' value={title} onChange={(e) => {setTitle(e.target.value); Update(s.item.id)} } />
				<textarea placeholder='Content...' value={content} onChange={(e) => {setContent(e.target.value); Update(s.item.id)}}/>
				<div className='toolsNote'>
					<button className='deleteNote' onClick={() => Delete(s.item.id)}>
						<RiDeleteBin2Line/>
					</button>
					<button className='saveNote'>
						<RiCheckboxCircleLine/>
					</button>
					<span>19 Fev, 2024</span>
				</div>
			</div>
		</div>
	)
}
