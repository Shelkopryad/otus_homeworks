import http from 'k6/http';

const BASE_URL = "http://185.177.93.224:3000";

/**
 * Целевые интенсивности - 100% нагрузки:
 * scenarioOpenMainPage. 100 запросов в секунду
 * 
 * Реализовать ступенчатый тест от 100 - 200% с шагом в 20% (длительность теста любая, лучше не меньше 20 минут)
 */

// options for open_main_page
export let options = {
  discardResponseBodies: true,
  scenarios: {
    test_120_percent_rps: {
      executor: 'constant-arrival-rate',
      rate: 120,
      timeUnit: '1s', // 120 RPS
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
      exec: 'open_main_page',
    },
    test_140_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'open_main_page',
      rate: 140,
      timeUnit: '1s',
      startTime: '4m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_160_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'open_main_page',
      rate: 160,
      timeUnit: '1s',
      startTime: '8m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_180_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'open_main_page',
      rate: 180,
      timeUnit: '1s',
      startTime: '12m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    test_200_percent_rps: {
      executor: 'constant-arrival-rate',
      exec: 'open_main_page',
      rate: 200,
      timeUnit: '1s',
      startTime: '16m',
      duration: '4m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export function open_main_page() {
  let res = http.get(BASE_URL);
}
