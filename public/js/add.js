const businessForm = document.getElementById("business-form");
const businessID = document.getElementById("business-id");
const businessAddress = document.getElementById("business-address");

// Send POST to API to add business
async function addBusiness(e){
  e.preventDefault();

  if(businessID.value === '' || businessAddress.value === ''){
    alert('Please fill in fields')
  }

  const sendBody = {
    businessID: businessID.value,
    businessAddress: businessAddress.value,
  }

  try{
    const res = await fetch('/api/v1/business', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if(res.status === 400){
      throw Error('Business already exists!')
    }

    alert('Business added!');
    window.location.href = '/index.html';

  } catch (err) {
    alert('err');
    return;
  }
}

// Event listener on the form
businessForm.addEventListener('submit', addBusiness);