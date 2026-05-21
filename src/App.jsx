import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'

function App() {

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout />}>
  <Route index element={<Home />} />



  </Route>
  
</Routes>


</BrowserRouter>


    </>
  )
}

export default App


// import { BrowserRouter,Routes, Route } from "react-router-dom";

// import AdminLayout from "./components/adminLayout";
// import Students from "./pages/Students";
// import Teachers from "./pages/Teachers";
// import Settings from "./pages/Settings";

// export default function App() {
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>

//       {/* Parent */}
//       <Route path="/admin" element={<AdminLayout />}>

//         {/* Enfants */}
//         <Route path="students" element={<Students />} />
//         <Route path="teachers" element={<Teachers />} />
//         <Route path="settings" element={<Settings />} />

//       </Route>

//     </Routes>
//     </BrowserRouter>
//     </>
//   );
// }