from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    initial = float(data['initial'])
    step_up = float(data['step_up'])
    annual_return = float(data['return_rate'])
    years = int(data['years'])

    months = years * 12
    monthly_rate = annual_return / 100 / 12
    invested = 0
    corpus = 0
    result = []

    current = initial
    for m in range(1, months + 1):
        if m != 1 and m % 12 == 1:
            current *= (1 + step_up / 100)
        corpus = corpus * (1 + monthly_rate) + current
        invested += current
        result.append({
            "month": m,
            "invested": round(invested, 2),
            "corpus": round(corpus, 2)
        })

    return jsonify({
        "details": result,
        "total_invested": round(invested, 2),
        "final_corpus": round(corpus, 2),
        "total_returns": round(corpus - invested, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
