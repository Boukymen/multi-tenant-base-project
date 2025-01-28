export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: {
    avatar: string;
    welcomeMessage: string;
    bio: string;
    preferences: string;
  };
}
