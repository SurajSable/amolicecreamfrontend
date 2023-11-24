import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { getCategorySubs } from "../../functions/category";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [showsubs, setShowsubs] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event, value) => {
        setAnchorEl(event.currentTarget);
        setShowsubs(false);
        getCategorySubs(value).then((res) => {
            setSubOptions(res.data);
            setShowsubs(true);
        });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log("Error:", err));
    }, []);
    const handleItemClick = (e, value) => {
        e.preventDefault();
        navigate(`/sub/${value}`)
        handleClose()
    }

    return (
        <div className="bg-dark navbar navbar-expand-lg navbar-light d-flex w-100 justify-content-between align-items-center p-3 font-weight-bold">
            {categories.map((elem, index) => (
                <div key={index} className="dropdown">
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        className="text-white"
                        onClick={(e) => handleClick(e, elem._id)}
                    >
                        {elem.name} <ExpandMoreIcon />
                    </Button>
                    {showsubs && (
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            {subOptions?.map((e) => <MenuItem key={e._id} onClick={(event) => handleItemClick(event, e.slug)}>{e.name}</MenuItem>)}
                        </Menu>)}
                </div>
            ))}
        </div>
    );
};

export default CategoryNav;



