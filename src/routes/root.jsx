export default function Root() {
    return(
        <>
            <div id="sidebar">
                <h1>Currency Exchanger</h1>
                <nav>
                    <ul>
                        <li>
                            <a href={`/exchanger`}>Exchanger</a>
                        </li>
                        <li>
                            <a href={`/rate`}>Current Exchange Rate</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}