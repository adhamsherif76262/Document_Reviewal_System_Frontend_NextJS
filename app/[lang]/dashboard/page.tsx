'use client';
import { useAuth } from '../../context/AuthContext'; // adjust path if needed

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading user info...</div>;

  if (!user) return <div>No user logged in</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow rounded p-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        {user.phone && (<p><strong>Phone:</strong> {user.phone}</p>)}
        {user.lastOTPResend && (
          <p>
            <strong>Last OTP Resend:</strong> {user.lastOTPResend.toLocaleString()}
          </p>
        )}
        {user.adminLevel && (
          <p>
            <strong>Admin Level:</strong> {user.adminLevel}
          </p>
        )}
        {user.preferredVerificationMethod && (
          <p>
            <strong>Preferred Verification:</strong> {user.preferredVerificationMethod}
          </p>
        )}
        <p>
          <strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}
        </p>
        {
          user.createdAt && (<p><strong>Created At:</strong> {user.createdAt.toLocaleString()}</p>)
        }
        {
          user.updatedAt && (<p><strong>Updated At:</strong> {user.updatedAt.toLocaleString()}</p>)
        }
      </div>
    </div>
  );
}
