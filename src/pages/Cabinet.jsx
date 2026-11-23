import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getIngredients } from "../api"

const STORAGE_KEY = 'cocktail-cabinet'

function Cabinet(){
    const [ingredients, setIngredients] = useState([])
    const [saved, setSaved]  = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getIngredients()
            .then((data) => {
                setIngredients(data)
                setError('')
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    if(loading) {
        return <p className="text-muted">Loading...</p>
    }

    function toggle(name) {
        const next = saved.includes(name)
          ?saved.filter((item) => item !== name)
          :[...saved, name]
        setSaved(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    function clearAll() {
        setSaved([])
        localStorage.removeItem(STORAGE_KEY)
    }

    return(
        <>
            <h1 className="h3 mb-3">My Cabinet</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            
            <p className="text-muted">
                Tick what you keep at home. Saved in this browser, so it is still here next time.
            </p>

            <div className="border rounded p-3 mb-3" style={{maxHeight:'360px', overflowY:'auto'}}>
                {ingredients.map((ingredient) => (
                    <div className="form-check" key={ingredient.id}>
                        <input 
                          className="form-check-input" 
                          type="checkbox"
                          id={`cabinet-${ingredient.id}`}
                          checked={saved.includes(ingredient.name)}
                          onChange={() => toggle(ingredient.name)}
                          />
                          <label className="form-check-label" htmlFor={`cabinet-${ingredient.id}`}>{ingredient.name}</label>
                    </div>
                ))}
            </div>
            <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">{saved.length} selected</span>
                <button className="btn btn-outline-secondary btn-sm" onClick={clearAll}>Clear all</button>
                <Link className="btn btn-dark btn-sm" to="/suggestions">Find cocktails</Link>
            </div>
        </>
    )
}


export default Cabinet