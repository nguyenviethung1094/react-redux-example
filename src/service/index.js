export const fakeRequest = response =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: response,
      });
    }, 1500);
  });