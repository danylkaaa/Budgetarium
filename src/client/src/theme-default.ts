import createMuiTheme from "material-ui/styles/createMuiTheme";
import createPalette from "material-ui/styles/createPalette";
import createTypography from "material-ui/styles/createTypography";
import * as Colors from "material-ui/colors";

const palette = createPalette({
    primary: {light:Colors.amber[300],main:Colors.amber[500], dark:Colors.amber[900]},
    secondary:  {light:Colors.grey[300],main:Colors.grey[500], dark:Colors.grey[700]},
    error: Colors.red,
    type: "dark"
} as any);

const typography = createTypography(palette, {   
});
const themeDefault = createMuiTheme({
    palette,
    typography
});


export default themeDefault;