// ===== Profile Data =====
// Edit this array to add, remove, or update profiles.
const profiles = [
  {
    name: "Arshadeen",
    profession: "Biomedical Engineer",
    salary: 20000,
    age: 24,
    location: "Coimbatore",
    education: "B.E. Biomedical Engineering",
    image: "images/arshadeen.jpg"
  },
  {
    name: "Thameem",
    profession: "AI Developer",
    salary: 25000,
    age: 24,
    location: "Coimbatore",
    education: "B.E/B.Tech (AI & ML)",
    image: "images/thameem.jpg"
  },
  {
    name: "Shafeek",
    profession: "MERN Stack Developer",
    salary: 30000,
    age: 24,
    location: "Coimbatore",
    education: "B.E Computer Science",
    image: "images/shafeek.jpg"
  },
  {
    name: "Ijas",
    profession: "IT Consultant",
    salary: 28000,
    age: 25,
    location: "Coimbatore",
    education: "B.Sc / MCA",
    image: "images/ijas.jpg"
  },
  {
    name: "Aadhil",
    profession: "Java Developer",
    salary: 35000,
    age: 25,
    location: "Coimbatore",
    education: "B.E Computer Science",
    image: "images/aadhil.jpg"
  },
  {
    name: "Salman",
    profession: "DevOps Engineer",
    salary: 25000,
    age: 24,
    location: "Coimbatore",
    education: "B.E/B.Tech IT",
    image: "images/salman.jpg"
  },
  {
    name: "Afsal",
    profession: "Event Manager",
    salary: 40000,
    age: 26,
    location: "Coimbatore",
    education: "BBA / Event Management",
    image: "images/afsal.jpg"
  },
  {
    name: "Irfan",
    profession: "Business",
    salary: 50000,
    age: 27,
    location: "Coimbatore",
    education: "B.Com",
    image: "images/irfan.jpg"
  },
  {
    name: "Thanseer",
    profession: "Full Stack Developer",
    salary: 80000,
    age: 24,
    location: "Coimbatore",
    education: "MERN Stack Developer",
    image: "images/thanseer.jpg"
  }
];

const grid = document.getElementById("profileGrid");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const professionFilter = document.getElementById("professionFilter");
const sortSelect = document.getElementById("sortSelect");
const statTotal = document.getElementById("statTotal");

// Populate profession dropdown
function populateProfessions() {
  const unique = [...new Set(profiles.map(p => p.profession))];
  unique.forEach(prof => {
    const opt = document.createElement("option");
    opt.value = prof;
    opt.textContent = prof;
    professionFilter.appendChild(opt);
  });
}

function formatSalary(num) {
  return "₹" + num.toLocaleString("en-IN");
}

function renderProfiles(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    noResults.classList.remove("d-none");
    return;
  }
  noResults.classList.add("d-none");

  list.forEach((p, index) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="profile-card">
        <div class="corner-tick"><i class="fa-solid fa-heart"></i></div>
        <div class="profile-photo-wrap">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="profile-body">
          <h4>${p.name}</h4>
          <p class="profession">${p.profession}</p>
          <div class="salary">${formatSalary(p.salary)} / month</div>
          <div>
            <button class="btn btn-view" data-index="${index}">View Details</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });

  // Attach modal listeners
  document.querySelectorAll(".btn-view").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = list[btn.dataset.index];
      openModal(p);
    });
  });
}

function openModal(p) {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p class="modal-profession">${p.profession}</p>
    <div class="detail-row"><span>Age</span><span>${p.age} yrs</span></div>
    <div class="detail-row"><span>Education</span><span>${p.education}</span></div>
    <div class="detail-row"><span>Monthly Salary</span><span>${formatSalary(p.salary)}</span></div>
    <div class="detail-row"><span>Location</span><span>${p.location}</span></div>
  `;
  const modal = new bootstrap.Modal(document.getElementById("profileModal"));
  modal.show();
}

function applyFilters() {
  let result = [...profiles];

  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.profession.toLowerCase().includes(query)
    );
  }

  const profVal = professionFilter.value;
  if (profVal) {
    result = result.filter(p => p.profession === profVal);
  }

  const sortVal = sortSelect.value;
  if (sortVal === "salary-high") {
    result.sort((a, b) => b.salary - a.salary);
  } else if (sortVal === "salary-low") {
    result.sort((a, b) => a.salary - b.salary);
  } else if (sortVal === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProfiles(result);
}

// Animate the stat counter
function animateCount() {
  let count = 0;
  const target = profiles.length;
  const interval = setInterval(() => {
    count++;
    statTotal.textContent = count;
    if (count >= target) clearInterval(interval);
  }, 120);
}

// Init
populateProfessions();
renderProfiles(profiles);
animateCount();

searchInput.addEventListener("input", applyFilters);
professionFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
