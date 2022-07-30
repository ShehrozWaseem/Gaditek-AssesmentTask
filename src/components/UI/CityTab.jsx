import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { Alert, Avatar, Button, Stack } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

export default function CityTab() {
  const countryList = useSelector((state) => state.countryList);
  const { loading, fetchedCountries, error } = countryList;
  return (
    <div>
      {fetchedCountries && !loading ? (
        fetchedCountries.map((i) => (
          <Accordion key={i.name.common} sx={{ width: 450, marginBottom: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Avatar
                sx={{ marginRight: 1 }}
                alt={i.name.common}
                src={i.flags.png}
              />{" "}
              <Typography>{i.name.common}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Population: <li>{i.population}</li>
              </Typography>
              <Typography>
                TimeZones:{" "}
                {i.timezones.length > 0
                  ? i.timezones.map((tz, index) => (
                      <li key={index}>{`${tz}` + ", "}</li>
                    ))
                  : "No timezone"}
              </Typography>
              <Typography>
                Capital:{" "}
                {i.capital && i.capital.length > 0
                  ? i.capital.map((capital) => (
                      <li key={Math.random()}>{capital}</li>
                    ))
                  : "No timezone"}
              </Typography>
              <Button size="small" color="primary">
                More info
              </Button>
            </AccordionDetails>
          </Accordion>
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
      {loading && (
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
        />
      )}
    </div>
  );
}
