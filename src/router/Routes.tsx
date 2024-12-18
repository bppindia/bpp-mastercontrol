import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '@/app/login';
import { useAuth } from '@/context/AuthContext';
import Dashboard from '@/pages/dashboard';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route path="auth">
                    {/* <Route path="signup" element={<Register />} /> */}
                    <Route path="login" element={<LoginPage />} />
                </Route>


                <Route
                    path="dashboard/*"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Routes>
                                <Route path="home" element={<Dashboard />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

                {/* 404 Route */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;









{/* Protected Routes (requires authentication) */ }
//  <Route
//  path="/membership"
//  element={
//    <ProtectedRoute isAuthenticated={isAuthenticated}>
//      <Route>
//        <Route path="join-now" element={<Join />} />
//        <Route path="renewals" element={<MembershipRenewal />} />
//      </Route>
//    </ProtectedRoute>
//  }
// />

{/* Private Routes (requires authentication + specific roles) */ }
{/* <Route
 path="/admin"
 element={
   <PrivateRoute
     isAuthenticated={isAuthenticated}
     userRole={userRole}
     allowedRoles={['admin']}
   >
     <Route>
       <Route path="dashboard" element={<AdminDashboard />} />
       <Route path="users" element={<UserManagement />} />
     </Route>
   </PrivateRoute>
 }
/> */}

{/* Error Routes */ }
{/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */ }