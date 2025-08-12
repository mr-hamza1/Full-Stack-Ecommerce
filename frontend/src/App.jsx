import { lazy, Suspense, useEffect } from 'react';
import { Routes, BrowserRouter, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Listing from './pages/Listing';
import NewProduct from './pages/Admin/Management/NewProduct';
import ProtectRoute from './auth/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from './layout/Loader';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { Toaster } from 'react-hot-toast';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));

// Admin pages dashboard
const Products = lazy(() => import('./pages/Admin/Products'));
const Customer = lazy(() => import('./pages/Admin/Customer'));
const ManageNewProduct = lazy(() => import('./pages/Admin/Management/ManageNewProduct'));



// Admin Apps
const StopWatch = lazy(() => import('./pages/Admin/Apps/StopWatch'));
const Cupone = lazy(() => import('./pages/Admin/Apps/Cupone'));

const App = () => {
    const {user, loading} = useSelector((state) => state.userReducer)
   
  const dispatch = useDispatch();

  useEffect(() => {
    axios
.get(`${import.meta.env.VITE_SERVER}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExist(data.user)))
      .catch((err) => dispatch(userNotExist()));

  }, [dispatch]);


  return (
     loading? <Loader />:
       (<BrowserRouter>
      <MainLayout user={user} />
    </BrowserRouter>)
  );
};

const MainLayout = ({user}) => {
  const location = useLocation();

  // Paths where Header & Footer should NOT appear
  const hideLayoutPaths = ['/Login'];
  const shouldHideLayout =
    hideLayoutPaths.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Listing />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          
               <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
                    <Route element={<ProtectRoute user={user} redirect='/login'/>}>
                              <Route path="/cart" element={<Cart />} />
                    </Route>


          {/* Admin Routes */}
          <Route element={
               <ProtectRoute  
                  user={user}
                  adminOnly={true}
                  admin={user? (user.role=== "admin"? true : false) : false}
               />
              
          }>
               <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/product/:id" element={<ManageNewProduct />} />
          <Route path="/admin/app/stopwatch" element={<StopWatch />} />
          <Route path="/admin/app/cupon" element={<Cupone />} />
          </Route>
       
        </Routes>
      </Suspense>
            <Toaster position='bottom-center'/>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
