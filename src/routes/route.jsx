import SearchPage from 'pages/search/searchPage';

const { default: RootLayout } = require('layouts/layout');
const { default: MainPage } = require('pages/main/mainPage');
const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <MainPage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
        ],
    },
]);
export default router;
