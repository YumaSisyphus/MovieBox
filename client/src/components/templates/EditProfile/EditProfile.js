import { ThemeProvider } from "@emotion/react";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const EditProfile = () => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header />
                <Footer />
            </div>

        </ThemeProvider>
    )

}

export default EditProfile;