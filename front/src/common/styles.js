import { makeStyles } from "@mui/styles"

export const header = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    alignSelf: "center",
  },
  logo: {
    marginLeft: "auto",
    width: "300px",
  },
  searchContainer: {
    display: "flex",
    padding: "0px 12px",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginTop: "17px",
  },
})

export const nav = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    bgcolor: "#000d3e",
  },
  btnContainer: {
    display: "flex",
    bgcolor: "white",
    padding: "20px 20px",
    justifyContent: "center",
    margin: "0 10%",
  },
})
