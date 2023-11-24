import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createSelector } from 'reselect';
import icecreamd from "../../images/icecreamd.png";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const drawerCartData = createSelector(
    state => state.drawer,
    state => state.cart,
    (drawer, cart) => ({ drawer, cart })
);

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector(drawerCartData);
    const imageStyle = {
        width: "100%",
        height: "150px",
        objectFit: "cover",
    };
    return (
        <div>
            <Drawer
                sx={{
                    width: "320px", // Set the desired width here
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: "320px", // Set the same width for the paper inside
                        boxShadow: "10px 10px 10px 10px", borderRadius: "2%",
                    },
                }}
                anchor="right" // You can change the anchor position
                open={!!drawer}
                // Set this to true to make the drawer op
                onClose={() => {
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    });
                }}
                visible={drawer.toString()}
            >
                <div className="">
                    <h4 className="bg-info p-2 text-center">Cart-{cart.length} Product</h4>
                    {cart.map((p) => (
                        <div key={p._id} className="row">
                            <div className="col">
                                {p.images[0] ? (
                                    <>
                                        <img src={p.images[0].uri} style={imageStyle} alt="" />
                                        <p className="text-center bg-primary-subtle text-emphasis-primary">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img src={icecreamd} style={imageStyle} alt="" />
                                        <p className="text-center bg-primary-subtle text-emphasis-primary">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <Link to="/cart">
                        <Button variant="contained"
                            onClick={() =>
                                dispatch({
                                    type: "SET_VISIBLE",
                                    payload: false,
                                })
                            }
                            className="btn btn-outline-primary rounded-pill text-center"
                            style={{ width: '300px' }}
                        >
                            Go To Cart
                        </Button>
                    </Link>
                </div>
            </Drawer>
        </div>
    )
};

export default SideDrawer;

