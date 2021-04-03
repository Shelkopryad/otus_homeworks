import http from 'k6/http';
import { Trend, Counter } from 'k6/metrics';
import { check, group, sleep, fail } from 'k6';

let firstTrend = new Trend("CUSTOM_root_duration");
let secondTrend = new Trend("CUSTOM_contacts_duration");

let firstTrendCounter = new Counter("CUSTOM_root-count");
let secondTrendCounter = new Counter("CUSTOM_contacts-count");

const BASE_URL = "http://test.k6.io";

// export let options = {
//   stages: [
//     { duration: '5s', target: 5 },
//     { duration: '5s', target: 10},
//     { duration: '5s', target: 0},
//   ],
//   thresholds: {
//     'http_req_duration': ['p(95)<100'],
//   },
// };

export let options = {
  scenarios: {
    contacts_test: {
      executor: 'constant-arrival-rate',
      rate: 60,
      timeUnit: '1m', // 60 iterations per minute, i.e. 1 RPS
      duration: '10s',
      preAllocatedVUs: 10,
      exec: 'contacts',
    },
    root_test: {
      executor: 'constant-arrival-rate',
      rate: 120,
      timeUnit: '1m', // 120 iterations per minute, i.e. 1 RPS
      duration: '10s',
      preAllocatedVUs: 20,
      exec: 'root',
    },
  },
  discardResponseBodies: true,
  thresholds: {
    'http_req_duration': ['p(95)<250'],
  },
};

// export default function () {
//   group("root", function() {
//     root()
//   })

//   group("contacts", function() {
//     contacts()
//   })
// };

export function root() {
  let res = http.get(BASE_URL);
  firstTrend.add(res.timings.duration);
  firstTrendCounter.add(1);
}

export function contacts() {
  let res = http.get(BASE_URL + "/contacts.php");
  // check(res, {
  //   "response is 200": (res) => res.status == 200,
  //   "title is Contacts": (res) => res.html().find("title").text() == "Contacts",
  // });
  secondTrend.add(res.timings.duration);
  secondTrendCounter.add(1);
  
}

