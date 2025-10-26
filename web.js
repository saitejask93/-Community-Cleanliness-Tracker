// Select form and container
const reportForm = document.getElementById("reportForm");
const reportsList = document.getElementById("reportsList");

// Load reports from localStorage on page load
window.onload = function() {
  const savedReports = JSON.parse(localStorage.getItem("reports")) || [];
  savedReports.forEach((report, index) => addReportToUI(report, index));
};

// Form submission
reportForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const issue = document.getElementById("issue").value;

  const report = { name, location, issue, date: new Date().toLocaleString() };

  // Save to localStorage
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));

  // Show on UI
  addReportToUI(report, reports.length - 1);

  // Reset form
  reportForm.reset();
});

// Function to add report card to UI
function addReportToUI(report, index) {
  const div = document.createElement("div");
  div.classList.add("report-card");

  div.innerHTML = `
    <h3>${report.location}</h3>
    <p><strong>Reported by:</strong> ${report.name}</p>
    <p><strong>Issue:</strong> ${report.issue}</p>
    <p><small><em>${report.date}</em></small></p>
    <button class="delete-btn" onclick="deleteReport(${index})">🗑 Delete</button>
  `;

  reportsList.appendChild(div);
}

// Function to delete a report
function deleteReport(index) {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.splice(index, 1); // remove selected report
  localStorage.setItem("reports", JSON.stringify(reports));

  // Refresh UI
  reportsList.innerHTML = "";
  reports.forEach((report, i) => addReportToUI(report, i));
}