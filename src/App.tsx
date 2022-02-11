import { useEffect, useState } from 'react'
import './styles.css'

export function App() {
  const [search, setSearch] = useState<string>('')
  const [info, setInfo] = useState<any>([])

  const lowerSearch = search.toLowerCase()

  useEffect(() => {
    const baseURl = `https://api.github.com/users/RamboGj`
    const url = `${baseURl}/repos`
    fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log('response :', response)
      setInfo(response)
      console.log('infos :',info)
    })
  }, [])

  const filteredChapters = info.filter((inf: any) => {
    return inf.name.toLowerCase().includes(lowerSearch)
  })
 
  return (
    <body>
      <div className="text-input">
        <label htmlFor="searchbox">Search</label>
        <input 
        className= "searchbox"
        id='searchbox'
        value={search}
        type="search" 
        onChange={(e) => setSearch(e.target.value)}
        />
        <span className="separator"> </span>
      </div>
      <div>
        <ul className="repoList">
          {filteredChapters.map((repoData: any) => {
            return (
              <li>
                <a href={`https://github.com/RamboGj/${repoData.name}`} >
                  {repoData.full_name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </body>
  )
}