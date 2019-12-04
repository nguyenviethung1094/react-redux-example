export const fakeRequest = response =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: response,
      });
    }, 1500);
  });
  export const checkUniqueName = response =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: response.toString().toLowerCase() === 'koi the',
      });
    }, 500);
  });