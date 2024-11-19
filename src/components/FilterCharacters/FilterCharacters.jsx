import s from './FilterCharacters.module.scss'

const FilterCharacters = ({ setAliveStatus, setGenderFilter, genderFilter, aliveStatus, species, setSpecies, setCharName, charName }) => {

  return (
    <div className={s.filter__cont}>
      <div className={s.filter}><input onChange={(e) => setCharName(e.target.value)} type={s.filter} placeholder='Name' value={charName} /></div>
      <div className={s.filter}>
        <select onChange={e => setSpecies(e.target.value)} value={species}>
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
      </div>
      <div className={s.filter}>
        <select onChange={e => setGenderFilter(e.target.value)} value={genderFilter}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className={s.filter}>
        <select onChange={e => setAliveStatus(e.target.value)} value={aliveStatus}>
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  )
}

export default FilterCharacters;