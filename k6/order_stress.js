import http from 'k6/http';

const BASE_URL = "http://185.177.93.224:3000";

/**
 * Целевые интенсивности - 100% нагрузки:
 * scenarioOrder. 20 запросов в секунду
 * 
 * Реализовать ступенчатый тест от 100 - 200% с шагом в 20% (длительность теста любая, лучше не меньше 20 минут)
 */

// options for order
export let options = {
  discardResponseBodies: true,
  scenarios: {
    test_120_percent_rps: {
      executor: 'constant-arrival-rate',
      rate: 24,
      timeUnit: '1s', // 24 RPS
      duration: '1m',
      preAllocatedVUs: 100,
      exec: 'order',
    },
    test_140_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'order',
      rate: 28,
      timeUnit: '1s',
      startTime: '1m',
      duration: '1m',
      preAllocatedVUs: 100,
    },
    test_160_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'order',
      rate: 32,
      timeUnit: '1s',
      startTime: '2m',
      duration: '1m',
      preAllocatedVUs: 100,
    },
    test_180_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'order',
      rate: 36,
      timeUnit: '1s',
      startTime: '3m',
      duration: '1m',
      preAllocatedVUs: 100,
    },
    test_200_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'order',
      rate: 40,
      timeUnit: '1s',
      startTime: '4m',
      duration: '1m',
      preAllocatedVUs: 100,
    },
  },
};

export function order() {
  let body = {
    name: "Ned Stark",
    email: "immortal@gmail.com",
    adress: "Winterfell",
    cartItems: [
      {
        _id: "sushi4",
        title: "Cucumber",
        image: "/images/sushi4.jpg",
        description: "Cheapest",
        price: 30,
        availableSizes: [
          "Small",
          "Big"
        ],
        count: 1
      }
    ]
  };

  let res = http.post(BASE_URL + "/api/orders", JSON.stringify(body));
}
