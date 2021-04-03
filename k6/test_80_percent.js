import http from 'k6/http';
import { Trend, Counter } from 'k6/metrics';

const BASE_URL = "http://185.177.93.224:3000";

let openMainPageTrend = new Trend("Open maim page duration");
let openMainPageCounter = new Counter("Open maim page count");

let getAllOrdersTrend = new Trend("Get all orders duration");
let getAllOrdersCounter = new Counter("Get all orders count");

let orderTrend = new Trend("Order duration");
let orderCounter = new Counter("Order count");

/**
 * Реализовать тест надежности от 80% от базовой нагрузки в течение часа.
 *
 * Целевые интенсивности - 100% нагрузки:
 * scenarioGetAllOrders. 50 запросов в секунду
 * scenarioOrder. 20 запросов в секунду
 * scenarioOpenMainPage. 100 запросов в секунду
 */
 
export let options = {
  discardResponseBodies: true,
  scenarios: {
    open_main_page_test: {
      executor: 'constant-arrival-rate',
      rate: 80,
      timeUnit: '1s', // 80 RPS
      duration: '60m',
      preAllocatedVUs: 100,
      exec: 'open_main_page',
    },
    get_all_orders_test: {
      executor: 'constant-arrival-rate',
      exec: 'get_all_orders',
      rate: 40,
      timeUnit: '1s',
      duration: '60m',
      preAllocatedVUs: 100,
    },
    order_test: {
      executor: 'constant-arrival-rate',
      exec: 'order',
      rate: 16,
      timeUnit: '1s',
      duration: '60m',
      preAllocatedVUs: 100,
    },
  },
};

export function open_main_page() {
  let res = http.get(BASE_URL);
  openMainPageTrend.add(res.timings.duration);
  openMainPageCounter.add(1);
}

export function get_all_orders() {
  let res = http.get(BASE_URL + "/api/orders");
  getAllOrdersTrend.add(res.timings.duration);
  getAllOrdersCounter.add(1);
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
  orderTrend.add(res.timings.duration);
  orderCounter.add(1);
}
