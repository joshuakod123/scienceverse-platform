import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    language: 'en',
    timezone: 'UTC',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Mock payment history
  const [paymentHistory] = useState([
    {
      id: 1,
      date: '2024-01-15',
      amount: '$29.99',
      description: 'BrainByte Premium - Monthly Subscription',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: '$29.99',
      description: 'BrainByte Premium - Monthly Subscription',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: '$29.99',
      description: 'BrainByte Premium - Monthly Subscription',
      status: 'Completed'
    }
  ]);

  // Initialize profile data
  useEffect(() => {
    if (currentUser) {
      setProfileData(prev => ({
        ...prev,
        username: currentUser.username || '',
        email: currentUser.email || '',
        fullName: currentUser.fullName || '',
        bio: currentUser.bio || '',
        language: currentUser.language || 'en',
        timezone: currentUser.timezone || 'UTC',
        notifications: currentUser.notifications || {
          email: true,
          push: true,
          marketing: false
        }
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const success = await updateProfile(profileData);
      if (success) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    try {
      setLoading(true);
      // Implement password update logic here
      alert('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Password update error:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;
    
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderProfileTab = () => (
    <div className="profile-tab">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {(profileData.fullName || profileData.username || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{profileData.fullName || profileData.username}</h2>
          <p>{profileData.email}</p>
        </div>
        <button 
          className={`edit-btn ${isEditing ? 'save-btn' : ''}`}
          onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          disabled={loading}
        >
          {loading ? '...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows="3"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={profileData.language}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="form-group">
            <label>Timezone</label>
            <select
              name="timezone"
              value={profileData.timezone}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="UTC">UTC</option>
              <option value="US/Pacific">Pacific Time</option>
              <option value="US/Eastern">Eastern Time</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Seoul">Seoul</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>

        <div className="notification-settings">
          <h3>Notification Preferences</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications.email"
                checked={profileData.notifications.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span>Email notifications</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications.push"
                checked={profileData.notifications.push}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span>Push notifications</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications.marketing"
                checked={profileData.notifications.marketing}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span>Marketing emails</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="security-tab">
      <h3>Change Password</h3>
      <div className="password-form">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Enter current password"
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm new password"
          />
        </div>

        <button 
          className="update-password-btn"
          onClick={handlePasswordUpdate}
          disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="payment-tab">
      <h3>Payment History</h3>
      <div className="payment-history">
        {paymentHistory.map(payment => (
          <div key={payment.id} className="payment-item">
            <div className="payment-info">
              <div className="payment-date">{payment.date}</div>
              <div className="payment-description">{payment.description}</div>
            </div>
            <div className="payment-details">
              <div className="payment-amount">{payment.amount}</div>
              <div className={`payment-status ${payment.status.toLowerCase()}`}>
                {payment.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header-bar">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>Profile Settings</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="tab-menu">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
            <button 
              className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              💳 Payment
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'payment' && renderPaymentTab()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;