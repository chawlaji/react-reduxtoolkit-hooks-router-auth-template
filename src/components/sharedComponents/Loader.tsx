import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useEffect } from "react";

export default function Loader({ loaderState }: { loaderState: boolean }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loaderState}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
