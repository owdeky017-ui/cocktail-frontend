import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getIngredients, suggestCocktails } from "../api";

function Suggestions(){
    const [ingredients, setIngredients] = useState([])
    const [selected, setSelected] = useState([])
    const [results, setResults] = useState([])
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

  function toggle(name) {
    if (selected.includes(name)) {
        setSelected(selected.filter((item) => item !== name))
    } else {
        setSelected([...selected, name])
    }    
  }

  function handleSuggest() {
    if (selected.length === 0) {
        setError('Select at lest one ingredient')
        return
    }
    suggestCocktails(selected)
      .then((data) => {
        setResults(data)
        setError('')
      })
      .catch((err) => setError(err.message))
  }

  if (loading) {
    return <p className="text-muted">Loading...</p>
  }

    return (
      <>
        <h1 className="h3 mb-3">Suggestions</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="row g-4">
            <div className="col-md-5">
                <h2 className="h6 text-muted">What do you have?</h2>
                <div className="border rounded p-3 mb-3" style={{ maxHeight: '360px', overflowY: 'auto'}}>
                    {ingredients.map((ingredient) => (
                        <div className="form-check" key={ingredient.id}>
                            <input 
                               className="form-check-input"
                               type="checkbox"
                               id={`ingredient-${ingredient.id}`}
                               checked={selected.includes(ingredient.name)}
                               onChange={() => toggle(ingredient.name)}
                             />
                             <label className="form-check-label" htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
                        </div>
                    ))}
                </div>
                <button className="btn btn-dark" onClick={handleSuggest}>Find cocktails</button>
            </div>

            <div className="col-md-7">
                <h2 className="h6 text-muted">Best matches</h2>
                {results.length === 0?(
                    <p className="text-muted">Nothing yet.</p>
                ):(
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Cocktail</th>
                                <th>Match</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.id}>
                                    <td>{result.name}</td>
                                    <td>{Math.round(result.score * 100)}%</td>
                                    <td>
                                        <Link className="btn btn-sm btn-outline-dark" to={`/cocktails/${result.id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                    
                )}
            </div>
        </div>
      </>
    )
}


export default Suggestions