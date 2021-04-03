package example


import example.ExampleMethods._
import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder

class ExampleSimulation extends Simulation with ExampleInjects {

  def scenarioOpenMainPage: ScenarioBuilder = scenario("open main page")
    .exec(goToMainPage)

  def scenarioGetAllOrders: ScenarioBuilder = scenario("get orders")
    .exec(getOrders)

  def scenarioOrder: ScenarioBuilder = scenario("order")
    .exec(order)

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
  simpleLoad(scenarioOpenMainPage, 0, 80, 600, 3000, 3600)
  simpleLoad(scenarioGetAllOrders, 0, 40, 600, 3000, 3600)
  simpleLoad(scenarioOrder, 0, 16, 600, 3000, 3600)


  /**
   * Реализовать тест надежности от 80% от базовой нагрузки в течение часа.
   *
   * Общий тест
   */
  reliabilityTest(
    preparePopulationBuilder(scenarioOpenMainPage, 0, 80, 600, 3000),
    preparePopulationBuilder(scenarioGetAllOrders, 0, 40, 600, 3000),
    preparePopulationBuilder(scenarioOrder, 0, 16, 600, 3000),
    3600
  )


  /**
   * Реализовать ступенчатый тест от 100 - 200% с шагом в 20% используя Gatling(длительность теста любая, лучше не меньше 20 минут)
   *
   * Отдельные тесты по сервисам, раскомментировать один для запуска
   */
  stressLoad(scenarioOpenMainPage, 100, 200, 5, 180, 1200)
  stressLoad(scenarioGetAllOrders, 50, 100, 5, 180, 1200)
  stressLoad(scenarioOrder, 20, 40, 5, 180, 1200)

}
