
import Newsletter from './Newsletter'
import Column from './Column'
import Copyright from './Copyright'

export default function Footer() {
  return (
    <footer>
      <div className="pl-40 pr-40 bg-gray-100">
       <Newsletter/>
      </div>
      <div className="pl-40 pr-40  ">
      <Column /> 
      </div>
      <div className='bg-gray-50'>
      <Copyright />
      </div>
    </footer>
  )
}
