import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CocktailList from './pages/CocktailList'
import CocktailDetail from './pages/CocktailDetail'
import CocktailForm from './pages/CocktailForm'
import Cabinet from './pages/Cabinet'
import Suggestions from './pages/Suggestions'

function App() {
  return(
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CocktailList />}/>
        <Route path="/cocktails/new" element={<CocktailForm />}/>
        <Route path="/cocktails/:id" element={<CocktailDetail />}/>
        <Route path="/cocktails/:id/edit" element={<CocktailForm />}/>
        <Route path="/cabinet" element={<Cabinet />}/>
        <Route path="/suggestions" element={<Suggestions />}/>
      </Route>
    </Routes>
  ) 
}


export default App
