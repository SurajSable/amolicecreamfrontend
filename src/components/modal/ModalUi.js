// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import {useSelector} from "react-redux"
// import StarRatings from "react-star-ratings"
// import { Paper } from '@mui/material';
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

// export default function NestedModal(_id) {
  

//   const user = useSelector((state) => state.user);
//   const [open, setOpen] = useState(false);
//   const navigate= useNavigate()

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOk = () => {
//     handleClose();
//     toast.success("Thanks for your review. It will apper soon");
//   };
  
//   const handleCancel = () => {
//     handleClose();
//   };

//   const handleModal = () => {
//     if (user && user.token) {
//      setOpen(true);
//     } else {
//     navigate("/login")
//     }
//   };
 
//   return (
//     <div>
//       <div onClick={handleOpen}>
//       <StarBorderIcon className="text-danger " /> <br />Leave rating
//       </div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//         <Box sx={{ ...style, width: 400 }}>
//           <h2 id="child-modal-title">
//         {user ? "Leave rating" : "Please log in to continue"}
//       </h2>
//         <StarRatings  
//            name={_id}
//           numberOfStars={5}
//           rating={2}
//           changeRating={(newRating, name) =>
//             console.log("newRating", newRating, "name", name)
//           }
//           isSelectable={true}
//           starRatedColor="red" 
//           />
//           <Button onClick={handleOk} color="primary">
//         OK
        
//       </Button>
//       <Button onClick={handleCancel} color="primary">
//         Cancel
//       </Button>
//       {user ? (
//        <div></div>
//       ) : (
//         <Button onClick={handleModal} color="primary">
//           Login
//         </Button>
//       )}
//       </Box>
//          </Paper>
//       </Modal>
//     </div>
//   );
// }
