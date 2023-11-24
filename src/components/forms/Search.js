import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import searchQuery from "../../redux/actions/searchQuery";
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const search = useSelector((state) => state.search)
  const { text } = search
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    dispatch(searchQuery({ text: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  }
  return (
    <>
      <form className="form-inline my-2 my-lg-0 d-flex" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="search"
          value={text}
          className="form-control mr-sm-2"
          placeholder="Search"
        />
        <button className="me-1"><SearchIcon onClick={handleSubmit} style={{ cursor: "pointer" }} /></button>
      </form>
    </>
  )
}
export default Search