import './App.scss';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Photogram from "./pages/Photogram";
import Exchanger from "./pages/Exchanger";
import Quiz from "./pages/Quiz";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Photogram />} />
                <Route path='photogram' element={<Photogram />} />
                <Route path='exchanger' element={<Exchanger />} />
                <Route path='quiz' element={<Quiz />} />
                <Route path='*' element={<Photogram />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
