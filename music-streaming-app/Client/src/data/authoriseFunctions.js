
export const authenticate = () => {
    localStorage.setItem('isAuthenticated', 'Yes')
  };
export const unauthenticate = () => {
    localStorage.setItem('isAuthenticated', 'No');
    localStorage.setItem('isArtist', 'No');
  };

export const authenticateArtist = () => {
    localStorage.setItem('isAuthenticated', 'Yes');
    localStorage.setItem('isArtist', 'Yes');

  };



