// Styles to be applied to the `<Modal>` component:
//
// Usage:
// <Modal style={modalStyles} />
export const modalStyles = {
  content: {
    margin: 'auto',
    maxWidth: '30rem',
    maxHeight: '20rem',
  },
};

// correlates to the base url for the server.
//
// 'http://localhost' in development mode
// 'http://<whatever>' in prod 
export const serverUrl = `http://${window.location.host}`;