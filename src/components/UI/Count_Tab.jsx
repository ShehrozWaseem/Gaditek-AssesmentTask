import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Alert,
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import CityTab from "./CityTab";

export default function Count_Tab() {
  const [value, setValue] = React.useState("1");
  // const countryList = useSelector((state) => state.countryList);
  const countryList = useSelector((state) => state.countryList);

  const { loading, fetchedCountries, error } = countryList;
  // console.log(countryList)
  // console.log(fetchedCountries);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   console.log(countries.slice(0,50))
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", typography: "body1" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Countries" value="1" />
            <Tab label="Countries Info" value="2" />
          </TabList>
        </Box>

        {/* {arr.map(i=>(<TabPanel direction="column" value="1">{i}<br/></TabPanel>
                ))} */}

        <TabPanel direction="column" value="1">
          {!loading && fetchedCountries ? (
            fetchedCountries.map((i) => (
              <Stack direction="column"  key={i.name.common}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={1}
                  marginTop={1}
                 
                >
                  <Avatar
                    sx={{ marginRight: 1 }}
                    alt={i.name.common}
                    src={i.flags.png}
                  />
                  <Typography width="250px">{i.name.common}</Typography>{" "}
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1, width: 100 }}
                  >
                    one
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1, width: 100 }}
                  >
                    two
                  </Button>
                </Stack>
                <Divider />
              </Stack>
            ))
          ) : (
            <TailSpin
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
            />
          )}

          {error && !loading && (
            <Alert severity="error" sx={{ marginTop: 5 }}>
              Error Detected: {error} <br />
              Something went wrong
            </Alert>
          )}
        </TabPanel>

        <TabPanel direction="column" value="2">
          {error ? (
            <Alert severity="error" sx={{ marginTop: 5 }}>
              Error Detected: {error} <br />
              Something went wrong
            </Alert>
          ) : (
            <CityTab />
          )}
        </TabPanel>
      </TabContext>
    </Stack>
  );
}
