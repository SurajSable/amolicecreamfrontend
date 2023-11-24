import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector((state) => state.user)
  const fileUploadAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = values.images
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          350,
          350,
          "JPEG",
          100,
          0,
          (uri) => {
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, { images: uri },
              {
                headers: { authtoken: user ? user.token : "" },
              }
            )
              .then((res) => {
                setLoading(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, image: allUploadedFiles })
              })
              .catch((err) => {
                setLoading(false)
                console.log("CLOUDINARY UPLOAD ERR", err)
              })
          },
          "base64"
        )
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  }
  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        try {
          const { images } = values;
          let filteredImages = images.filter((item) => {
            return item.public_id !== public_id;
          });
          setValues({ ...values, images: filteredImages });
        } catch (error) {
          console.log("Error inside .then() block:", error);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row mb-2">
        <Stack direction="row" spacing={2}>
          {values.images &&
            values.images.map((image) => (
              <Badge
                key={image.public_id}
              >
                <CancelIcon
                  onClick={() => handleImageRemove(image.public_id)}
                  style={{ fontSize: '1.5rem', color: 'red', cursor: "pointer", position: "relative", left: "18%", zIndex: "1" }} />
                <Avatar
                  key={image.public_id}
                  src={image.uri}
                  size={100}
                  style={{ width: '100px', height: '100px', borderRadius: 0 }}
                />
              </Badge>
            ))}
        </Stack>
      </div>
      <div className="input-group mb-3">
        <input type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
          className="form-control"
          id="inputGroupFile02" />
      </div>
    </>
  )
}





export default FileUpload;