import type { User } from '@/payload-types';
import { getCurrentUser } from '@/actions/auth';


const UserInfoPage = async () => {
  let user: User | null = null;

  try {
    user = getCurrentUser()
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }

  if (!user) {
    return <div>No user information available.</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {/* Display user information here */}
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      {/* Add more user fields as needed */}
    </div>
  );
};

export default UserInfoPage;
