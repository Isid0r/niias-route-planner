import { Alert } from "@mui/material";

export function RoutePlannerError() {
  return (
    <Alert
      sx={{
        "& .MuiAlert-icon": {
          fontSize: 64,
        },
        fontSize: 64,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      severity="error"
    >
      Возникла ошибка во время загрузки данных!
    </Alert>
  );
}
