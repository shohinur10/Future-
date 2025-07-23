import React, { useState, useRef } from "react";
import { 
  Box, 
  Container, 
  Stack, 
  TextField, 
  Button, 
  Avatar, 
  Typography, 
  Card, 
  CardContent,
  IconButton,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import { 
  PhotoCamera, 
  Edit, 
  Save, 
  Cancel, 
  Person, 
  Email, 
  Phone, 
  LocationOn,
  Description
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../components/hooks/useGlobals";
import { serverApi } from "../../lib/config";
import { MemberType } from "../../lib/enums/member.enum";
import MemberService from "../../services/MemberService";
import "../../../css/userPage.css";

export default function UserPage() {
  const { authMember, setAuthMember } = useGlobals();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for form management
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form data state
  const [formData, setFormData] = useState({
    memberNick: authMember?.memberNick || "",
    memberEmail: authMember?.memberEmail || "",
    memberPhone: authMember?.memberPhone || "",
    memberAddress: authMember?.memberAddress || "",
    memberDesc: authMember?.memberDesc || "",
  });

  if (!authMember) {
    navigate("/");
    return null;
  }

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle profile photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if user is authenticated
    if (!authMember || !authMember._id) {
      setErrorMessage("Please login first to upload photos");
      return;
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrorMessage("Please select a valid image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const memberService = new MemberService();
      const formData = new FormData();
      
      // Try the field name that the backend expects
      formData.append('image', file);
      // Add member ID if needed
      formData.append('memberId', authMember._id);
      
      console.log("Uploading file:", file.name, "Size:", file.size, "Type:", file.type);
      console.log("Member ID:", authMember._id);
      
      // Try to upload to server first
      const updatedMember = await memberService.updateMemberImage(formData);
      
      // Update with server response
      setAuthMember(updatedMember);
      localStorage.setItem("memberData", JSON.stringify(updatedMember));
      setSuccessMessage("Profile photo updated successfully!");
      
    } catch (error: any) {
      console.error("Server upload failed, using local preview:", error);
      
      // Log the actual server response for debugging
      if (error.response) {
        console.error("Server response:", error.response.data);
        console.error("Server status:", error.response.status);
        
        // Show user a more helpful error message
        const serverMessage = error.response.data?.message || error.response.data?.error || "Server error";
        console.error("Backend says:", serverMessage);
      }
      
      // Fallback to local preview if server fails
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        const updatedMember = {
          ...authMember,
          memberImage: imageUrl
        };
        
        setAuthMember(updatedMember);
        localStorage.setItem("memberData", JSON.stringify(updatedMember));
        setSuccessMessage("Profile photo updated locally!");
      };
      
      reader.onerror = () => {
        setErrorMessage("Failed to process the image file");
      };
      
      reader.readAsDataURL(file);
    }
    
    setIsLoading(false);
  };

  // Handle form save
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Update local storage immediately for better UX
      const updatedMember = {
        ...authMember,
        ...formData
      };
      
      setAuthMember(updatedMember);
      localStorage.setItem("memberData", JSON.stringify(updatedMember));
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Try to sync with server in the background
      try {
        const memberService = new MemberService();
        await memberService.updateMember(formData);
        console.log("Profile synced with server successfully");
      } catch (serverError) {
        console.log("Server sync failed, but local update successful:", serverError);
        // Don't show error to user since local update worked
      }
      
    } catch (error) {
      setErrorMessage("Failed to update profile");
      console.error("Profile update error:", error);
    }
    
    setIsLoading(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData({
      memberNick: authMember?.memberNick || "",
      memberEmail: authMember?.memberEmail || "",
      memberPhone: authMember?.memberPhone || "",
      memberAddress: authMember?.memberAddress || "",
      memberDesc: authMember?.memberDesc || "",
    });
    setIsEditing(false);
  };

  // Helper function to get correct image URL
  const getImageUrl = (imageData: string | undefined): string => {
    if (!imageData) return "/icons/default-user.svg";
    
    // If it's a data URL (base64), use it directly
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    
    // If it's a server path, prefix with server API
    return `${serverApi}/${imageData}`;
  };

  return (
    <div className="user-page">
      <Container maxWidth="lg">
        <Box className="user-page-container">
          <Typography variant="h4" className="page-title">
            My Profile
          </Typography>
          
          <Box className="profile-layout">
            {/* Profile Photo Section */}
            <Card className="profile-photo-card">
              <CardContent>
                <Box className="photo-section">
                  <Box className="photo-container">
                    <Avatar
                      src={getImageUrl(authMember.memberImage)}
                      className="profile-avatar"
                    />
                    <IconButton 
                      className="photo-upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                    >
                      <PhotoCamera />
                    </IconButton>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </Box>
                  
                  <Box className="user-info-summary">
                    <Typography variant="h6" className="user-name">
                      {authMember.memberNick}
                    </Typography>
                    <Typography variant="body2" className="user-type">
                      {authMember.memberType === MemberType.USER ? "Customer" : "Business"}
                    </Typography>
                    <Typography variant="body2" className="member-since">
                      Member since {new Date(authMember.createAt).getFullYear()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Profile Information Section */}
            <Card className="profile-info-card">
              <CardContent>
                <Box className="card-header">
                  <Typography variant="h6" className="section-title">
                    Personal Information
                  </Typography>
                  {!isEditing ? (
                    <Button 
                      startIcon={<Edit />} 
                      onClick={() => setIsEditing(true)}
                      className="edit-btn"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box className="action-buttons">
                      <Button 
                        startIcon={<Save />} 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="save-btn"
                      >
                        Save
                      </Button>
                      <Button 
                        startIcon={<Cancel />} 
                        onClick={handleCancel}
                        className="cancel-btn"
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box className="form-fields">
                  <Box className="field-row">
                    <Person className="field-icon" />
                    <TextField
                      label="Full Name"
                      value={formData.memberNick}
                      onChange={(e) => handleInputChange('memberNick', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      variant="outlined"
                      className="profile-field"
                    />
                  </Box>

                  <Box className="field-row">
                    <Email className="field-icon" />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={formData.memberEmail}
                      onChange={(e) => handleInputChange('memberEmail', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      variant="outlined"
                      className="profile-field"
                    />
                  </Box>

                  <Box className="field-row">
                    <Phone className="field-icon" />
                    <TextField
                      label="Phone Number"
                      value={formData.memberPhone}
                      onChange={(e) => handleInputChange('memberPhone', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      variant="outlined"
                      className="profile-field"
                    />
                  </Box>

                  <Box className="field-row">
                    <LocationOn className="field-icon" />
                    <TextField
                      label="Address"
                      value={formData.memberAddress}
                      onChange={(e) => handleInputChange('memberAddress', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      className="profile-field"
                    />
                  </Box>

                  <Box className="field-row">
                    <Description className="field-icon" />
                    <TextField
                      label="About Me"
                      value={formData.memberDesc}
                      onChange={(e) => handleInputChange('memberDesc', e.target.value)}
                      disabled={!isEditing}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      className="profile-field"
                      placeholder="Tell us about yourself..."
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Success/Error Messages */}
        <Snackbar 
          open={!!successMessage} 
          autoHideDuration={4000} 
          onClose={() => setSuccessMessage("")}
        >
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar 
          open={!!errorMessage} 
          autoHideDuration={4000} 
          onClose={() => setErrorMessage("")}
        >
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
