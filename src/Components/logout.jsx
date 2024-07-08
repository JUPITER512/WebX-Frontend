import { faSignOut, faSwimmer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate=useNavigate()
    const handleLogout=async()=>{
        const headers={
            authorization: "Bearer " + localStorage.getItem('accessToken')
        }
        await axios.post('http://localhost:3000/api/v1/user/logout', {},{headers}).then((res)=>{
            localStorage.clear()
            navigate('/Sign-in')

        }).catch((err)=>{
            console.log(err)
        })
    }

  return (
      <button className='bg-red-400 border-2 p-2 flex items-center rounded-lg hover:bg-red-600 transition-colors duration-200' onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} className='mr-2' />
          <span>Logout</span>
      </button>
  )
}

export default Logout