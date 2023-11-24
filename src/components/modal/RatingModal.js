
import React, { useState } from "react";
import { Button, Modal, Box, Typography, Paper } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const { slug } = useParams()
  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    // Handle the "OK" button action here
    // For example, submit form data, save changes, etc.
    toast.success("Thanks for your review. It will apper soon");
    handleClose();
  };

  const handleCancel = () => {
    // Handle the "Cancel" button action here
    // For example, reset form fields, discard changes, etc.
    handleClose();
  };

  const modalBody = (
    <Box sx={{ p: 2, minWidth: 300 }}>
      <Typography variant="h6" id="child-modal-title"> {user ? "Leave rating" : "Please log in to continue"}</Typography>
      {children}
    </Box>
  );

  const modalActions = (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <Button onClick={handleCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={handleOk} color="primary">
        OK
      </Button>
    </Box>
  );
  const handleModal = () => {
    if (user && user.token) {
      setOpen(true);
    } else {
      navigate("/login",
        {
          state: { from: `/product/${slug}` },
        });
    }
  };

  return (
    <div>
      <div onClick={handleModal}>
        <StarBorderIcon className="text-danger ms-4" /> <br />
        {" "}
        {user?.email ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {modalBody}
          {modalActions}
        </Paper>
      </Modal>
    </div>
  );
};
export default RatingModal;