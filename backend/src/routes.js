import { Routes, Route } from 'react-router-dom'

//pages
import Admin from "./pages/admin"

const Router = () => {

    return (
        <Routes>
            <Route path="/admin-analista" element={<Admin/>}/>
        </Routes>
    )

}

export default Router