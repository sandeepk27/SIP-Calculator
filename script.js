// JavaScript code for the SIP and Step-Up SIP calculator
    let chart;

    function switchTab(tab) {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(tab).classList.add('active');
      document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    }

    document.querySelectorAll('input[type=range]').forEach(range => {
      range.oninput = () => {
        document.getElementById(range.id + 'Val').innerText = range.value;
      }
    });

    function calculateSIP() {
      const amount = parseFloat(document.getElementById('sipAmount').value);
      const rate = parseFloat(document.getElementById('sipReturn').value) / 100 / 12;
      const months = parseInt(document.getElementById('sipYears').value) * 12;

      let corpus = 0;
      for (let i = 0; i < months; i++) {
        corpus = (corpus + amount) * (1 + rate);
      }
      const invested = amount * months;
      showResults('sipResults', invested, corpus);
    }

    function calculateStepUp() {
      let amount = parseFloat(document.getElementById('stepAmount').value);
      const stepUp = parseFloat(document.getElementById('stepPercent').value);
      const rate = parseFloat(document.getElementById('stepReturn').value) / 100 / 12;
      const years = parseInt(document.getElementById('stepYears').value);
      const months = years * 12;

      let corpus = 0;
      let invested = 0;

      for (let year = 0; year < years; year++) {
        for (let month = 0; month < 12; month++) {
          corpus = (corpus + amount) * (1 + rate);
          invested += amount;
        }
        amount *= (1 + stepUp / 100);
      }
      showResults('stepupResults', invested, corpus);
    }

    function showResults(elementId, invested, corpus) {
      const returns = corpus - invested;
      document.getElementById(elementId).innerHTML = `
        <p><b>Total Invested:</b> ₹${invested.toFixed(2)}</p>
        <p><b>Expected Returns:</b> ₹${returns.toFixed(2)}</p>
        <p><b>Total Corpus:</b> ₹${corpus.toFixed(2)}</p>
      `;

      if (chart) chart.destroy();
      chart = new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
          labels: ['Invested', 'Returns', 'Corpus'],
          datasets: [{
            label: 'Amount (₹)',
            data: [invested, returns, corpus],
            backgroundColor: ['#ffc107', '#28a745', '#007bff']
          }]
        }
      });
    }
