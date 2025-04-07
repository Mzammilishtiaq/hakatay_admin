import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

function AdminContainer() {
    return (
        <div className='flex flex-col'>
            {/* Sidebar */}
           <Sidebar  /> 
           <div className="w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminContainer
