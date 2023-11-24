import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CallIcon from '@mui/icons-material/Call';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function BasicTabs({ description }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" />
          <Tab label="More" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {description}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Call on : <CallIcon /> +91-9664535305
        <br />
        Address : 4,Shivaji nagar, Limbayat,Surat,Gujrat
        <br />
        Pin Code : 394210
        <br />
      </CustomTabPanel>
    </Box>
  );
}