const data = [
  {
    name: "Apollo Hospitals",
    imgURL:
      "img/hospital1.jpg",
    city: "Mumbai",
    vaccinationsAvailable:"3k",
    vaccinationGiven:"1200"
  },
  {
    name: "Billroth Hospitals ",
    imgURL:
      "img/hospital2.jpg",
      city: "Mumbai",
      vaccinationsAvailable:"2k",
      vaccinationGiven:"10000"
  },
  {
    name: "Care Hospitals",
    imgURL:
      "img/hospital3.jpg",
      city: "Bhopal",
      vaccinationsAvailable:"1.5k",
      vaccinationGiven:"25000"
  },
  {
      name: "Command Hospital",
      imgURL:
        "img/hospital4.jpg",
        city: "Delhi",
        vaccinationsAvailable:"2.6k",
        vaccinationGiven:"23000"
    },
    {
      name: "LifeSpring Hospitals",
      imgURL:
        "img/hospital5.jpg",
        city: "Banglore",
        vaccinationsAvailable:"4k",
        vaccinationGiven:"1250"
    }
];

const profiles = profileIterator(data);

// Call First Profile
nextProfile();

// Next Event
document.getElementById('next').addEventListener('click', nextProfile);

// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;

  if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${currentProfile.name}</li>
      <li class="list-group-item">City: ${currentProfile.city}</li>
      <li class="list-group-item">Vaccines Available: ${currentProfile.vaccinationsAvailable}</li>
      <li class="list-group-item">Vaccines Given: ${currentProfile.vaccinationGiven}</li>
    </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.imgURL}">`;
    } else {
      // No More Profiles
      window.location.reload();
    }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ?
      { value: profiles[nextIndex++], done: false } :
      { done: true }
    }
  };
}