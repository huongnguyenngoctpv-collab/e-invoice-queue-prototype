const invoiceData = [
  {
    caseId: '104927415',
    receivedDate: '2026-03-12',
    time: '10:57:43',
    errorDescription: 'Payment Vendor is not registered or inactive.',
    invoiceOffice: 'ARBBB',
    module: 'TRS',
    source: 'Email',
    emailTo: 'ncn.aps@one-line.com',
    emailFrom: 'test@example.com',
    status: 'Indexing Failed',
    workflow: [
      { label: 'Invoice Received', done: true },
      { label: 'Source: Email', done: true },
      { label: 'Error Description: Invoice Number is duplicated.', done: true },
      { label: 'Invoice Indexed', done: false },
      { label: 'Invoice Created', done: false },
      { label: 'In Discrepancy', done: false },
      { label: 'Pending 1st Level Approval', done: false },
      { label: '1st Level Approved', done: false },
      { label: 'Final Level Approved', done: false },
      { label: 'SAP Interfaced', done: false },
      { label: 'Paid', done: false }
    ]
  },
  {
    caseId: '104827593',
    receivedDate: '2026-03-11',
    time: '22:23:25',
    errorDescription: 'Invoice Number is duplicated.',
    invoiceOffice: 'HKGBB',
    module: 'TRS',
    source: 'Email',
    emailTo: 'hk.ops@one-line.com',
    emailFrom: 'placeholder_em',
    status: 'Indexing Failed',
    workflow: [
      { label: 'Invoice Received', done: true },
      { label: 'Source: Email', done: true },
      { label: 'Error Description: Invoice Number is duplicated.', done: true },
      { label: 'Invoice Indexed', done: false },
      { label: 'Invoice Created', done: false },
      { label: 'In Discrepancy', done: false },
      { label: 'Pending 1st Level Approval', done: false },
      { label: '1st Level Approved', done: false },
      { label: 'Final Level Approved', done: false },
      { label: 'SAP Interfaced', done: false },
      { label: 'Paid', done: false }
    ]
  },
  {
    caseId: '104827594',
    receivedDate: '2026-03-11',
    time: '09:55:42',
    errorDescription: 'Invoice Number is duplicated.',
    invoiceOffice: 'TYOOB',
    module: 'MNR',
    source: 'Email',
    emailTo: 'jp.ops@one-line.com',
    emailFrom: 'testaccount+1@',
    status: 'Indexing Failed',
    workflow: [
      { label: 'Invoice Received', done: true },
      { label: 'Source: Email', done: true },
      { label: 'Error Description: Invoice Number is duplicated.', done: true },
      { label: 'Invoice Indexed', done: false },
      { label: 'Invoice Created', done: false },
      { label: 'In Discrepancy', done: false },
      { label: 'Pending 1st Level Approval', done: false },
      { label: '1st Level Approved', done: false },
      { label: 'Final Level Approved', done: false },
      { label: 'SAP Interfaced', done: false },
      { label: 'Paid', done: false }
    ]
  },
  {
    caseId: '104827594',
    receivedDate: '2026-03-11',
    time: '09:55:42',
    errorDescription: 'Invoice Number is duplicated.',
    invoiceOffice: 'TYOOB',
    module: 'TRS',
    source: 'Email',
    emailTo: 'jp.ops@one-line.com',
    emailFrom: 'testaccount+1@',
    status: 'Indexing Failed',
    workflow: [
      { label: 'Invoice Received', done: true },
      { label: 'Source: Email', done: true },
      { label: 'Error Description: Invoice Number is duplicated.', done: true },
      { label: 'Invoice Indexed', done: false },
      { label: 'Invoice Created', done: false },
      { label: 'In Discrepancy', done: false },
      { label: 'Pending 1st Level Approval', done: false },
      { label: '1st Level Approved', done: false },
      { label: 'Final Level Approved', done: false },
      { label: 'SAP Interfaced', done: false },
      { label: 'Paid', done: false }
    ]
  },
  {
    caseId: '104827598',
    receivedDate: '2026-03-11',
    time: '06:46:45',
    errorDescription: 'Invoice Number is duplicated.',
    invoiceOffice: 'SHABB',
    module: 'TRS',
    source: 'Email',
    emailTo: 'ncr.ops@one-line.com',
    emailFrom: 'john.doe@fake',
    status: 'Indexing Failed',
    workflow: [
      { label: 'Invoice Received', done: true },
      { label: 'Source: Email', done: true },
      { label: 'Error Description: Invoice Number is duplicated.', done: true },
      { label: 'Invoice Indexed', done: false },
      { label: 'Invoice Created', done: false },
      { label: 'In Discrepancy', done: false },
      { label: 'Pending 1st Level Approval', done: false },
      { label: '1st Level Approved', done: false },
      { label: 'Final Level Approved', done: false },
      { label: 'SAP Interfaced', done: false },
      { label: 'Paid', done: false }
    ]
  }
];

const normalizedData = invoiceData.map((entry, index) => ({
  ...entry,
  id: index + 1,
  sourceState: entry.source
}));

const tableBody = document.getElementById('invoiceTableBody');
const workflowTimeline = document.getElementById('workflowTimeline');
const drawerCaseId = document.getElementById('drawerCaseId');
const drawerStatusBadge = document.getElementById('drawerStatusBadge');
const workflowDrawer = document.getElementById('workflowDrawer');
const toggleAttachments = document.querySelector('.toggle-attachments');
const closeDrawer = document.querySelector('.close-drawer');
const searchCaseId = document.getElementById('caseIdFilter');
const searchError = document.getElementById('errorFilter');

let selectedCaseId = '104827593';

function renderTable() {
  const caseValue = searchCaseId.value.trim().toLowerCase();
  const errorValue = searchError.value.trim().toLowerCase();

  const filtered = normalizedData.filter((row) => {
    const matchesCase = !caseValue || row.caseId.toLowerCase().includes(caseValue);
    const matchesError = !errorValue || row.errorDescription.toLowerCase().includes(errorValue);
    return matchesCase && matchesError;
  });

  if (!filtered.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:18px; color:#666;">No matching records found.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered
    .map((row) => {
      const selected = String(row.caseId) === String(selectedCaseId) ? 'selected' : '';
      return `
        <tr class="${selected}" data-case-id="${row.caseId}">
          <td class="checkbox-cell"><input type="checkbox" /></td>
          <td>${row.caseId}</td>
          <td>
            <div>${row.receivedDate}</div>
            <div style="color:#666; font-size:0.76rem;">${row.time}</div>
          </td>
          <td>${row.errorDescription}</td>
          <td>${row.invoiceOffice}</td>
          <td>${row.module}</td>
          <td>${row.source}</td>
          <td>
            <div class="email-block">
              <div><span class="email-label"><strong>To</strong> ${row.emailTo}</span></div>
              <div><span class="email-label"><strong>From</strong> ${row.emailFrom}</span></div>
            </div>
          </td>
          <td><button class="action-link" data-case-id="${row.caseId}">Workflow History</button></td>
        </tr>
      `;
    })
    .join('');

  tableBody.querySelectorAll('tr[data-case-id]').forEach((row) => {
    const caseId = row.getAttribute('data-case-id');
    row.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      selectCase(caseId);
    });

    const actionButton = row.querySelector('.action-link');
    if (actionButton) {
      actionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        selectCase(caseId);
      });
    }
  });
}

function selectCase(caseId) {
  selectedCaseId = caseId;
  const rowData = normalizedData.find((row) => String(row.caseId) === String(caseId));
  if (!rowData) return;

  drawerCaseId.textContent = rowData.caseId;
  drawerStatusBadge.textContent = rowData.status;

  workflowTimeline.innerHTML = rowData.workflow
    .map((step, index) => {
      const active = index === 2 ? 'active' : '';
      const done = step.done ? 'done' : '';
      return `<li class="${done} ${active}">${step.label}</li>`;
    })
    .join('');

  workflowDrawer.classList.remove('hidden');
  renderTable();
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

searchCaseId.addEventListener('input', renderTable);
searchError.addEventListener('input', renderTable);

toggleAttachments.addEventListener('click', () => {
  const preview = document.getElementById('invoicePreview');
  const isHidden = preview.classList.toggle('hidden');
  toggleAttachments.textContent = isHidden ? 'Show attachments' : 'Hide attachments';
});

closeDrawer.addEventListener('click', () => {
  workflowDrawer.classList.add('hidden');
});

initTabs();
selectCase(selectedCaseId);
renderTable();
