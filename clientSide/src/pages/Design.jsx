import './Design.scss'

export default function Design() {
	return (
		<>
			<div className='box'>
				<div className='menuApp'>
               <button className="buttonMenu">All</button>
               <button className="buttonMenu">Favorites</button>
               <button className="buttonMenu">Trash</button>
               <span className="nameApp">OHKEN</span>
               <button className="createNote"> + criar nota</button>
            </div>
				<div className='notesField'>
					<div className="note">
                  <div className="colorNote"></div>
                  <div className="formNote">
                     <input type="text" name="" id="" placeholder='Title...' />
                     <textarea name="" id="" cols="30" rows="10" placeholder='Content...'></textarea>
                     <div className="toolsNote">
                        <span>19 Fev, 2024</span>
                     </div>
                  </div>
               </div>
				</div>
			</div>
		</>
	)
}
