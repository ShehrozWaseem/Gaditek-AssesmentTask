import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

export default function UserProfile({ userDetails }) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Stack justifyContent="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={userDetails.userImg}
          sx={{ width: 56, height: 56, marginTop: 1, bgcolor: deepPurple[500] }}
        />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ marginTop: 1 }}
        >
          {userDetails.userName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {userDetails.email}
        </Typography>
        <Button size="small" color="primary">
          More info
        </Button>
      </Stack>
    </Card>
  );
}
