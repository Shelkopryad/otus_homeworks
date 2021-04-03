import http from 'k6/http';
import { Trend, Counter } from 'k6/metrics';
import { check, group, sleep, fail } from 'k6';

const BASE_URL = "http://185.177.93.224:3000";

let firstTrend = new Trend("CUSTOM_root_duration");
let firstTrendCounter = new Counter("CUSTOM_root-count");

// export let options = {
//   discardResponseBodies: true,
//   scenarios: {
//     contacts: {
//       executor: 'constant-vus',
//       exec: 'contacts',
//       vus: 50,
//       duration: '30s',
//     },
//     news: {
//       executor: 'per-vu-iterations',
//       exec: 'news',
//       vus: 50,
//       iterations: 100,
//       startTime: '30s',
//       maxDuration: '1m',
//     },
//   },
// };

/**
 * Целевые интенсивности - 100% нагрузки:
 * scenarioGetAllOrders. 50 запросов в секунду
 * scenarioOrder. 20 запросов в секунду
 * scenarioOpenMainPage. 100 запросов в секунду
 */

/**
 * Реализовать тест надежности от 80% от базовой нагрузки в течение часа.
 *
 * Отдельные тесты по сервисам, раскомментировать один для запуска
 */




/**
 * Реализовать тест надежности от 80% от базовой нагрузки в течение часа.
 *
 * Общий тест
 */


/**
 * Реализовать ступенчатый тест от 100 - 200% с шагом в 20% используя Gatling(длительность теста любая, лучше не меньше 20 минут)
 *
 * Отдельные тесты по сервисам, раскомментировать один для запуска
 */

 // options for open_main_page
export let options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '30s', target: 120 },
    { duration: '5s', target: 140 },
    { duration: '30s', target: 140 },
    { duration: '5s', target: 160 },
    { duration: '30s', target: 160 },
    { duration: '5s', target: 180 },
    { duration: '30s', target: 180 },
    { duration: '5s', target: 200 },
    { duration: '30s', target: 200 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
  },
};

// options for get_all_orders
export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '30s', target: 60 },
    { duration: '5s', target: 70 },
    { duration: '30s', target: 70 },
    { duration: '5s', target: 80 },
    { duration: '30s', target: 80 },
    { duration: '5s', target: 90 },
    { duration: '30s', target: 90 },
    { duration: '5s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
  },
};

// options for order
export let options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '30s', target: 24 },
    { duration: '5s', target: 28 },
    { duration: '30s', target: 28 },
    { duration: '5s', target: 32 },
    { duration: '30s', target: 32 },
    { duration: '5s', target: 36 },
    { duration: '30s', target: 36 },
    { duration: '5s', target: 40 },
    { duration: '30s', target: 40 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
  },
};


 
// export let options = {
//   discardResponseBodies: true,
//   scenarios: {
//     root_test_20_rps: {
//       executor: 'constant-arrival-rate',
//       rate: 20,
//       timeUnit: '1s', // 60 iterations per minute, i.e. 1 RPS
//       duration: '30s',
//       preAllocatedVUs: 20,
//       exec: 'open_main_page',
//     },
//     root_test_40_rps: {
//       executor: 'constant-arrival-rate',
//       exec: 'open_main_page',
//       rate: 40,
//       timeUnit: '1s',
//       startTime: '30s',
//       duration: '30s',
//       preAllocatedVUs: 40,
//     },
//     root_test_60_rps: {
//       executor: 'constant-arrival-rate',
//       exec: 'open_main_page',
//       rate: 60,
//       timeUnit: '1s',
//       startTime: '60s',
//       duration: '30s',
//       preAllocatedVUs: 60,
//     },
//     root_test_80_rps: {
//       executor: 'constant-arrival-rate',
//       exec: 'open_main_page',
//       rate: 80,
//       timeUnit: '1s',
//       startTime: '90s',
//       duration: '30s',
//       preAllocatedVUs: 80,
//     },
//     root_test_100_rps: {
//       executor: 'constant-arrival-rate',
//       exec: 'open_main_page',
//       rate: 100,
//       timeUnit: '1s',
//       startTime: '120s',
//       duration: '30s',
//       preAllocatedVUs: 100,
//     },
//   },
// };



// Использую dashboard для Grafana https://grafana.com/grafana/dashboards/2587

export let options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '5s', target: 40 },
    { duration: '30s', target: 40 },
    { duration: '5s', target: 60 },
    { duration: '30s', target: 60 },
    { duration: '5s', target: 80 },
    { duration: '30s', target: 80 },
    { duration: '5s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
  },
};

export default function () {
  group("open_main_page", function() {
    open_main_page()
  })
};

export function open_main_page() {
  let res = http.get(BASE_URL);
  // firstTrend.add(res.timings.duration);
  // firstTrendCounter.add(1);
}

export function get_all_orders() {
  let res = http.get(BASE_URL + "/api/orders");
}

export function order() {
  let body = {
    name:"Ned Stark",
    email:"immortal@gmail.com",
    adress:"Winterfell",
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
