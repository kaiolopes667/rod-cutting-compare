function rodCutGuloso(prices, n) {
  // prices é um array que armazena os preços por unidade para cada comprimento de haste
  // n é o comprimento da haste inicial

  let solution = {
    cuts: [],  // array que armazena os cortes feitos
    cost: 0  // custo total
  };

  while (n > 0) {
    // encontre o comprimento i do pedaço mais rentável para ser cortado
    let i = 0;
    for (let j = 1; j <= n; j++) {
      if (prices[j] > prices[i]) {
        i = j;
      }
    }

    // corte a haste no comprimento i
    solution.cuts.push(i);
    solution.cost += prices[i];
    n -= i;
  }

  return solution;
}

function rodCutIterativo(preco, n) {
    let cost =[]
    let sol = []

    for (let i = 0; i <= n; i++) {
      cost.push(0);
      sol.push(0)
    }

    for (let i = 1; i <= n; i++) {
      let maximoValor = Number.MIN_SAFE_INTEGER;

      for (let j = 0; j < i; j++) {
        let valor = preco[j] + cost[i - j - 1];
        if (valor > maximoValor) {
          maximoValor = valor;
          sol[i] = j + 1
        }
      }

      cost[i] = maximoValor;
    }

    return {
      cost: cost[n],
      cuts: sol[n],
    }
  }


let brk = 10;

let arrayN = [];
let prices = [];
let arrTempIterative = [];
let arrTempGreedy = [];
const {performance} = require('perf_hooks');

for(let i = 0; i < brk; i++){
    arrayN[i] = Math.floor(Math.random() * (15 - 1) + 1);
}

for(let i = 0; i < brk; i++){
    prices[i] = Math.floor(Math.random() * (20 - 1) + 1);
}

console.log("A SEGUIR O ALGORITMO QUE RESOLVE O PROBLEMA DO CORTE DE BARRAS COM MÉTODO ITERATIVO: ");

for (let i = 0; i < arrayN.length; i++) { 
    let startIterative = performance.now();
      
    console.log(rodCutIterativo(prices , arrayN[i]));
      
    let endIterative = performance.now();
      
    arrTempIterative.push(endIterative - startIterative);
    console.log(`tempo de execução do guloso:${endIterative - startIterative} ms.`)
}

console.log("A SEGUIR O ALGORITMO QUE RESOLVE O PROBLEMA DO CORTE DE BARRAS COM MÉTODO GULOSO: ");
for (let i = 0; i < arrayN.length; i++){
    let startGreedy = performance.now();
      
    console.log(rodCutGuloso(prices , arrayN[i]));
      
    let endGreedy = performance.now();
      
    arrTempGreedy.push(endGreedy - startGreedy);
    console.log(`tempo de execução do guloso:${endGreedy - startGreedy} ms.`)
}
