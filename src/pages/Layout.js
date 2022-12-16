import './Layout.scss';
import {Link} from "react-router-dom";

function Layout({children}) {
    return (
        <div className="Layout">
            <header className='header'>
                <nav className='navigation-btns'>
                    <ul>
                        <li><Link to="/photogram">Photogram</Link></li>
                        <li><Link to="/quiz">Quiz</Link></li>
                        <li><Link to="/exchanger">Exchanger</Link></li>
                    </ul>
                </nav>
            </header>
            <main className='main-content'>{children}</main>
            <footer className='footer'>
            </footer>
        </div>
    );
}

export default Layout;