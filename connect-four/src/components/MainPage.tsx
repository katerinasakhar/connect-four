import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
function MainPage(){
    return(
        <div>
            <div>
                <NavLink to='/human-and-human'>Играть с другом</NavLink>
                <button>настройки</button>
            </div>
            <div>
                <NavLink to='/bot-and-human'>Играть с ботом</NavLink>
                <button>настройки</button>
            </div>
        </div>
    )
}
export default MainPage