import { createMuiTheme } from "@material-ui/core/styles"
/**
 * material-ui theme color pallete
 * @see https://material-ui.com/style/color/
 */
export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#e73b40",
      main: "#e73b40",
      dark: "#e73b40",
    },
    secondary: {
      light: "#e73b40",
      main: "#e73b40",
      dark: "#e73b40",
    },
  },
  typography: {
    // fontFamily: "helveticaneue-medium",
    // "fontSize": 15,
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        // '& $notchedOutline': {
        //     borderColor: '#be1128',
        // },
        // '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
        //     borderColor: '#be1128',
        //     boxShadow: "0px 0px 5px 0px #d68387",
        //     // Reset on touch devices, it doesn't add specificity
        //     '@media (hover: none)': {
        //         borderColor: 'rgba(0, 0, 0, 0.23)',
        //     },
        // },
        "&$focused $notchedOutline": {
          borderColor: "#e73b40",
          boxShadow: "0px 0px 5px 0px #d68387",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#e73b40",
        },
      },
    },
  },
})
