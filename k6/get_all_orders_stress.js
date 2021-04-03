import http from 'k6/http';

const BASE_URL = "http://185.177.93.224:3000";

/**
 * Целевые интенсивности - 100% нагрузки:
 * scenarioGetAllOrders. 50 запросов в секунду
 * 
 * Реализовать ступенчатый тест от 100 - 200% с шагом в 20% (длительность теста любая, лучше не меньше 20 минут)
 */

// options for get_all_orders
export let options = {
  discardResponseBodies: true,
  scenarios: {
    test_120_percent_rps: {
      executor: 'constant-arrival-rate',
      rate: 60,
      timeUnit: '1s', // 60 RPS
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
      exec: 'get_all_orders',
    },
    test_140_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'get_all_orders',
      rate: 70,
      timeUnit: '1s',
      startTime: '4m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_160_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'get_all_orders',
      rate: 80,
      timeUnit: '1s',
      startTime: '8m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_180_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'get_all_orders',
      rate: 90,
      timeUnit: '1s',
      startTime: '12m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_200_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'get_all_orders',
      rate: 100,
      timeUnit: '1s',
      startTime: '16m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export function get_all_orders() {
  let res = http.get(BASE_URL + "/api/orders");
}
