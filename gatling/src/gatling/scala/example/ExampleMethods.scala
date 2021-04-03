package example

import io.gatling.core.structure.ChainBuilder
import io.gatling.core.Predef._
import io.gatling.http.Predef._

object ExampleMethods {

  val goToMainPage: ChainBuilder = exec(http("open main page")
    .get("/")
    .header("Accept", "text/html")
    .header("Connection", "keep-alive")
    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36")
    .header("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7")
  )

  val getOrders: ChainBuilder = exec(http("get all orders")
    .get("/api/orders")
    .header("Accept", "text/html")
    .header("Connection", "keep-alive")
    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36")
    .header("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7")
  )

  val order: ChainBuilder = exec(http("order")
    .post("/api/orders")
    .header("Accept", "text/html")
    .header("Connection", "keep-alive")
    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36")
    .header("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7")
    .body(StringBody(body))
  )

  val body =
    """
      {
       "name":"Ned Stark",
       "email":"immortal@gmail.com",
       "adress":"Winterfell",
       "cartItems": [
          {
            "_id": "sushi4",
            "title": "Cucumber",
            "image": "/images/sushi4.jpg",
            "description": "Cheapest",
            "price": 30,
            "availableSizes": [
              "Small",
              "Big"
            ],
            "count": 1
          }
        ]
      }
      """.stripMargin

}
