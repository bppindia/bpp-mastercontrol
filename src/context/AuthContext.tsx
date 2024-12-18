// import { postData } from "@/api/apiClient";
import { postData } from "@/api/apiClient";
import Cookies from 'js-cookie';
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "sonner";

interface User {
    username?: string;
    email?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (registrationData: RegistrationData) => Promise<void>;
    sendOtp: (contact: string, type: 'email' | 'phoneNumber') => Promise<void>;
    verifyOtp: (contact: string, otpNumber: string, type: 'email' | 'phoneNumber') => Promise<void>;
    logout: () => void;
    loading: boolean;
}

interface RegistrationData {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    age: string;
    addressLine1: string;
    addressLine2: string;
    cityOrVillage: string;
    taluka: string;
    district: string;
    state: string;
    pincode: string;
    qualification: string;
    profession: string;
    position: string;
    aadhaarNumber: string;
    voterId: string;
    aadhaarCard: File | null;
    voterCard: File | null;
    password: string;
    referralCode: string;
}


const STATIC_CREDENTIALS = {
    email: 'excellencyservices@rediffmail.com',
    password: 'bppindia@786'
};


interface LoginCredentials {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(
        Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails') || '{}') : null
    );
    const [loading, setLoading] = useState(false);

    // Login method
    // Updated login method with static credential check
    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);

            // Check against static credentials
            if (
                credentials.email === STATIC_CREDENTIALS.email && 
                credentials.password === STATIC_CREDENTIALS.password
            ) {
                // Simulate successful login
                const mockResponse = {
                    token: 'static_mock_token_' + Date.now(),
                    username: 'BPP Admin',
                    email: credentials.email
                };

                // Set authentication token
                Cookies.set('authToken', mockResponse.token, { expires: 4 });
                
                // Set user details
                setUser({ 
                    username: mockResponse.username, 
                    email: mockResponse.email 
                });

                // Save user details in cookie for persistence
                Cookies.set('userDetails', JSON.stringify({
                    username: mockResponse.username, 
                    email: mockResponse.email
                }), { expires: 4 });

                toast.success("Login successful!");
            } else {
                // Throw error if credentials don't match
                toast.success("Login failed!");
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Register method
    const register = async (registrationData: RegistrationData) => {
        try {
            setLoading(true);

            // Create FormData object
            const formData = new FormData();

            // Iterate through all keys in registrationData
            (Object.keys(registrationData) as Array<keyof RegistrationData>).forEach(key => {
                const value = registrationData[key];

                // Special handling for File objects
                if (value instanceof File) {
                    formData.append(key, value, value.name);
                }
                // For other primitive types
                else if (value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            });

            // Update postData to handle FormData
            const response = await postData("/signup", formData);
            toast.success("Registration successful!", response);
        } catch (error) {
            toast.error("Registration failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    // Send OTP method
    const sendOtp = async (contact: string, type: 'email' | 'phoneNumber') => {
        try {
            setLoading(true);
            // Validate input based on type
            if (type === 'email' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contact)) {
                throw new Error('Invalid email format');
            }
            if (type === 'phoneNumber' && !/^(\+91)?[6-9]\d{9}$/.test(contact)) {
                throw new Error('Invalid phone number format');
            }

            // Prepare payload based on type
            const payload = type === 'email' ? { email: contact } : { phoneNumber: contact };

            console.log(payload)
            // Send OTP request with dynamic payload
            await postData('/send-otp', payload);
            toast.success(`OTP sent successfully to your ${type}!`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    // Verify OTP method
    const verifyOtp = async (contact: string, otpNumber: string, type: 'email' | 'phoneNumber') => {
        try {
            setLoading(true);
            // Validate input based on type
            if (type === 'email' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contact)) {
                throw new Error('Invalid email format');
            }
            if (type === 'phoneNumber' && !/^(\+91)?[6-9]\d{9}$/.test(contact)) {
                throw new Error('Invalid phone number format');
            }

            // Prepare payload based on type
            const payload = type === 'email' ? { email: contact, otpNumber } : { phoneNumber: contact, otpNumber };

            // Verify OTP request with dynamic payload
            const response = await postData('/validate-otp', payload);
            Cookies.set('authToken', response.token, { expires: 4 });
            toast.success('OTP verified successfully!');
            return response;
        } catch (error) {
            toast.error('Failed to verify OTP');
            throw error;
        } finally {
            setLoading(false);
        }
    };


    // Logout method
    const logout = () => {
        Cookies.remove('authToken');
        setUser(null);
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!Cookies.get('authToken'),
                login,
                register,
                sendOtp,
                verifyOtp,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
