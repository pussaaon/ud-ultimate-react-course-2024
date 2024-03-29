import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import AddForm from './components/AddForm';
import './index.css';

function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/app" element={<AppLayout />}>
                        <Route index element={<CityList />} />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<AddForm />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}

export default App;