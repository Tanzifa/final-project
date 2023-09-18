import React from 'react'
import classes from '../components/Search.module.css'
const Search = ({title,list,filter}) => {
  return (
<>
     <h2>{title}</h2>
     <span>{list}</span>
    <form >
    <label htmlFor="field">Input field</label><br/>
    <input type="text" name="field" id="field"/>
    <button className={classes.btn}>Search</button>
    <p className={classes.filter}>{filter}</p>
    </form>
   </>
  )
}

export default Search