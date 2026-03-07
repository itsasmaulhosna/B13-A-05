const signIn = document
  .getElementById('signIn')
  .addEventListener('click', function () {
    // get user
    const userInput = document.getElementById('userName');
    const userId = userInput.value;
    console.log(userId);
    // get pin
    const pinInput = document.getElementById('pin');
    const pinId = pinInput.value;
    console.log(pinId);
    // match
    if (userId === 'admin' && pinId === 'admin123') {
      alert('Sign In successfully');
    } else {
      alert('Sign In failed');
      return;
    }
  });
