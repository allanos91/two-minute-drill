import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import CreateContest from './components/CreateContest';
import AllContests from './components/AllContests';
import ContestDetails from './components/ContestDetails';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/create-contest',
        element: <CreateContest/>
      },
      {
        path: '/contests',
        element: <AllContests/>
      },
      {
        path: '/contests/:contestId',
        element: <ContestDetails/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
