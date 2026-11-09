import { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { getCocktail, scaleCocktail } from '../api'

function CocktailDetail(){
    const { id } = useParams()
    const [cocktail, setCocktail] = useState(null)
    const [scaled, setScaled] = useState(null)
    const [servings, setServings] = useState(1)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCocktail(id)
          .then((data) => {
            setCocktail(data)
            setError('')
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false))
    }, [id])

    function handleScale(){
        scaleCocktail(id, servings)
          .then((data) => {
            setScaled(data)
            setError('')
          })
          .catch((err) => setError(err.message))
    }

    if (loading) {
        return <p className="text-muted">Loading...</p>
    }

    if(!cocktail) {
        return <div className="alert alert-danger">{error || 'Cocktail not found'}</div>    
    }

    const items = scaled
      ?scaled.items.map((item) => ({ name: item.ingredient, amount: item.amount, ml: item.millilitres }))
      :cocktail.items.map((item) => ({ name: item.ingredient.name, amount: `${item.quantity} ${item.unit}`, ml: null }))
    
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3 mb-0">{cocktail.name}</h1>
          <Link className="btn btn-outline-dark" to="/">Back to list</Link>
        </div>

        <p className="text-muted">
          {cocktail.glass || 'No glass'} · {cocktail.category || 'Uncategorised'}
        </p>

        <p>{cocktail.instructions}</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex align-items-end gap-2 mb-3">
          <div>
            <label className="form-label small mb-1" htmlFor="servings">Servings</label>
            <input 
            id="servings"
            type="number"
            min="1"
            max="50"
            className="form-control"
            value={servings}
            onChange={(event) => setServings(Number(event.target.value))} 
            />
          </div>
          <button className="btn btn-dark" onClick={handleScale}>Scale</button>
          {scaled && (
            <button className="btn btn-outline-secondary" onClick={() => setScaled(null)}>Reset</button>
          )}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Amount</th>
              <th>Millilitres</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.ml === null?'-': item.ml}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )

}


export default CocktailDetail