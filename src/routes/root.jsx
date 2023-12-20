import {Link, Outlet} from "react-router-dom";

export default function Root() {
    return(
        <>
            <div id="sidebar">
                <h1>Currency Exchanger</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/exchanger`}>Exchanger</Link>
                        </li>
                        <li>
                            <Link to={`/rate`}>Current Exchange Rate</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}