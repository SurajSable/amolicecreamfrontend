import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import firebase from "../../firebase";
import logoutUser from '../../redux/actions/logoutUser';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function UserDropdown() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user)
  const [options, setOption] = React.useState(['Dashboard', `${data?.email.split("@")[0]}`, 'Logout', 'Wishlist']);
  React.useEffect(() => {
    setOption(['Dashboard', `${data?.name}`, 'Logout', 'Wishlist'])
  }, [data])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (index === 0) {
      if (data && data.role === "subscriber") {
        navigate("/user/history")
      } else if (data && data.role === "admin") {
        navigate("/admin/dashboard")
      }
    }
    if (index === 2) {
      //logout
      firebase.auth().signOut();
      dispatch(logoutUser());
      navigate("/login");
    }
    if (index === 3) {
      //wishlist
      navigate("/user/wishlist")
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <React.Fragment>
      <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick} className="btn-link text-white">
          {options[1]}
        </Button>
        <Button
          size="sm"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          className="btn-link"
        >
          {/* <ArrowDropDownIcon /> */}
          < ManageAccountsIcon className='text-white' />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options?.map((option, index) => (
                    <MenuItem
                      key={option}
                      //disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}