import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCocktails } from '../api'

function CocktailList() {
    const [cocktails, setCocktails] = useState([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCocktails(query)
            .then((data) => {
                setCocktails(data)
                setError('')
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [query])

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="h3 mb-0">Cocktails</h1>
                <Link className="btn btn-dark" to="/cocktails/new">Add cocktail</Link>
            </div>

            <input className="form-control mb-3"
                    placeholder="Search by name"
                    vlue={query}
                    onChange={(event) => {
                        setQuery(event.target.value) 
                        setLoading(true)}}
            />

            {error ? ( 
                <div className="alert alert-danger">{error}</div>
            ) : loading ? (
                <p className="text-muted">Loading...</p>
            ) : cocktails.length === 0? (
                <p className="text-muted">No cocktails found.</p>
            ) : (
                <div className="row g-3">
                    {cocktails.map((cocktail) => (
                        <div className="col-md-4" key={cocktail.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h2 className="h5 card-title">{cocktail.name}</h2>
                                    <p className="card-text small text-muted mb-3">
                                        {cocktail.category || 'Uncategorised'}
                                    </p>
                                    <Link
                                        className="btn btn-sm btn-outline-dark mt-auto"
                                        to={`/cocktails/${cocktail.id}`}
                                    >
                                        View Recipe
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            )}   
        </>
    )
}


export default CocktailList