import './Design.scss'
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiAddCircleLine, RiBox3Line } from "react-icons/ri";

export default function Design() {
	return (
		<div className='box'>
			<MenuApp />
			<NotesField />
		</div>
	)
}

function MenuApp() {
   const title = document.getElementsByTagName('title')[0]
	title.innerHTML = 'New Design'

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
	return (
		<div className='notesField'>
			<div className='note'>
				<div className='formNote'>
					<input type='text' name='' id='' placeholder='Title...' />
					<textarea placeholder='Content...'></textarea>
					<div className='toolsNote'>
						<span>19 Fev, 2024</span>
					</div>
				</div>
			</div>
		</div>
	)
}
