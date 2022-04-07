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
    zIndex: 2,
    marginTop: "-30px",
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    borderRadius: "7px",
    padding: "15px 20px",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "space-around",
    margin: "0 10%",
  },
})
