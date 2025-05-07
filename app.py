from flask import Flask, request, jsonify
import math

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate_stepup():
    data = request.get_json()
    monthly_investment = float(data.get("monthly_amount", 100000))
    step_up_percent = float(data.get("step_up_percent", 10))
    return_percent = float(data.get("return_percent", 20))
    years = int(data.get("years", 30))

    results = []
    total_invested = 0
    total_value = 0
    current_monthly = monthly_investment

    for year in range(1, years + 1):
        yearly_investment = current_monthly * 12
        total_invested += yearly_investment

        for month in range(12):
            total_value = (total_value + current_monthly) * (1 + return_percent / 100 / 12)

        results.append({
            "year": year,
            "invested": round(total_invested, 2),
            "corpus": round(total_value, 2)
        })

        current_monthly *= (1 + step_up_percent / 100)

    return jsonify({
        "results": results,
        "total_invested": round(total_invested, 2),
        "total_corpus": round(total_value, 2),
        "total_returns": round(total_value - total_invested, 2)
    })

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
