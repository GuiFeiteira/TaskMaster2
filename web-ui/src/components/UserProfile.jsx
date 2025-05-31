import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Import axios

const UserProfile = () => {
    // Directly use authUser and token from context
    const { user: authUser, token, isAuthenticated, loading: authLoading } = useAuth(); 
    // Removed userProfile state as we are using authUser directly
    const [loading, setLoading] = useState(false); // No longer loading profile separately
    const [error, setError] = useState(null); // Keep error state for potential save errors
    const [isEditing, setIsEditing] = useState(false); // State to control edit mode
    const [formData, setFormData] = useState({ // State for form data
        name: authUser?.name || '', // Initialize with authUser data
        email: authUser?.email || '', // Initialize with authUser data
        // Add other fields you want to edit, initialized with authUser data
    });

    useEffect(() => {
        // Update form data if authUser changes (e.g., after login or a successful save)
        setFormData({
            name: authUser?.name || '',
            email: authUser?.email || '',
            // Update other form fields if authUser changes
        });
    }, [authUser]); // Re-run this effect if authUser object changes

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset form data to current userProfile data
        if (authUser) {
            setFormData({
                name: authUser.name,
                email: authUser.email,
                // Reset other form fields
            });
        }
    };

    const handleSaveClick = async () => {
        // Use authUser.id for the PUT request
        // Ensure token is available
        if (!authUser?.id || !token) return; 

        setLoading(true); // Indicate saving is in progress
        try {
            // Assuming a PUT endpoint like /api/users/:userId to update user details
            const response = await axios.put(`/api/users/${authUser.id}`, formData, { // Use authUser.id here
                headers: {
                    Authorization: `Bearer ${token}` // Use token from context
                }
            });
            // No need to set userProfile, maybe update authUser in context if needed
             // Optionally, update user in AuthContext if needed (e.g., if name changes)
            // updateAuthUser(response.data); // You would need to add this function to AuthContext
             // For now, we can just update local form state or refetch if context update is not possible
             // If the backend returns the updated user, you could potentially update authUser in context
             // For simplicity now, let's just rely on the next render using the (potentially stale) authUser
            setIsEditing(false); // Exit edit mode
            setLoading(false); // Stop loading
        } catch (err) {
            console.error('Error saving user profile:', err);
            setError('Failed to save user profile.');
            setLoading(false); // Stop loading
        }
    };

    if (authLoading) { 
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!isAuthenticated) {
         return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h6">Please log in to view your profile.</Typography>
            </Container>
        );    
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!authUser) { // If authenticated but authUser is null (shouldn't happen with proper login flow, but as a fallback)
         return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h6">User data not available.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                User Profile
            </Typography>

            {!isEditing ? (
                <Box>
                    <Typography variant="h6">Name: {authUser.name}</Typography>
                    <Typography variant="h6">Email: {authUser.email}</Typography>
                    {/* Display other authUser details here */}
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleEditClick}>
                        Edit Profile
                    </Button>
                </Box>
            ) : (
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        // Email might be non-editable depending on your requirements
                        // disabled
                    />
                    {/* Add other editable fields */}
                    <Box sx={{ mt: 2, gap: 2, display: 'flex' }}>
                        <Button variant="contained" onClick={handleSaveClick} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                        </Button>
                        <Button variant="outlined" onClick={handleCancelClick} disabled={loading}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default UserProfile; 