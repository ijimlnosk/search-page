const { Outlet } = require('react-router-dom');
const { default: Header } = require('./Header');
const { default: Footer } = require('./Footer');

const RootLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
export default RootLayout;
