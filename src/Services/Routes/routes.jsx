import { lazy, useEffect, useState } from "react";

// React Router
import { useRoutes } from "react-router-dom";

// Routes
import RoutesList from "./routesList.json";

// Theme
const theme = import.meta.env.VITE_THEME || "Default";

// Layouts
const Master = lazy(() => import("../../Master"));
const Home = lazy(() => import(`../../Layouts/Home/Home`));
const Error404 = lazy(() => import(`../../Master/Themes/${theme}/Helpers/Error404/Error404.jsx`));

const Routes = () => {
	const Path = "/";
	const [pages, setPages] = useState({});
	const [routesData, setRoutesData] = useState([]);

	// Get Lazy Components
	useEffect(() => {
		if (RoutesList.PAGE?.length) {
			const pages = {};
			for (let Index = 0; Index < RoutesList.PAGE.length; Index++) {
				const Page = RoutesList.PAGE[Index];
				pages[Page.NAME] = lazy(() => import(/* @vite-ignore */ `${Page.REACT_PATH.replaceAll(" ", "")}`));
			}
			setPages(pages);
		}
	}, []);

	// Get Routes
	useEffect(() => {
		if (RoutesList.PAGE?.length && Object.keys(pages).length) {
			const routesData = [];
			for (let Index = 0; Index < RoutesList.PAGE.length; Index++) {
				const Page = RoutesList.PAGE[Index];
				const Element = pages[Page.NAME];
				routesData.push({ path: ((Page.PATH).toLowerCase()).replaceAll(" ", "-"), element: <Element /> });
			}
			setRoutesData(routesData);
		}
	}, [pages]);

	return useRoutes([
		{
			path: Path,
			children: [
				{
					path: "",
					element: <Master />,
					children: [
						{ path: "", element: <Home /> },
						{ path: "", children: routesData }
					]
				}
			]
		},
		{ path: Path + "*", element: routesData.length ? <Error404 /> : "" }
	]);
}

export default Routes;