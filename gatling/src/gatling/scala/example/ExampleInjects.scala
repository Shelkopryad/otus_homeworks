package example

import io.gatling.core.Predef._
import io.gatling.core.structure.{PopulationBuilder, ScenarioBuilder}
import io.gatling.http.Predef.http

import scala.concurrent.duration._

trait ExampleInjects extends Simulation {

  val httpProtocol = http.baseUrl("http://185.177.93.224:3000/")

  def simpleLoad(
                  scenario: ScenarioBuilder,
                  minRps: Int,
                  rpsPlanned: Int,
                  rampUpPeriodInSeconds: Int,
                  durationInSeconds: Int,
                  maxDurationInSeconds: Int) = {
    setUp(scenario.inject(
      rampUsersPerSec(minRps).to(rpsPlanned).during(rampUpPeriodInSeconds.seconds),
      constantUsersPerSec(rpsPlanned).during(durationInSeconds.seconds)
    ).protocols(httpProtocol)
      .throttle(reachRps(rpsPlanned) in (rampUpPeriodInSeconds.seconds), holdFor((rampUpPeriodInSeconds + durationInSeconds).seconds)))
      .maxDuration(maxDurationInSeconds.seconds)
  }

  def stressLoad(
                  scenario: ScenarioBuilder,
                  rpsMin: Int,
                  rpsMax: Int,
                  numOfSteps: Int,
                  stepDurationInSeconds: Int,
                  maxDurationInSeconds: Int) = {
    val usersPerStep = (rpsMax - rpsMin) / numOfSteps

    setUp(
      scenario.inject(
        constantUsersPerSec(rpsMax).during(maxDurationInSeconds.seconds)
      ).protocols(httpProtocol)
        .throttle(
          jumpToRps(rpsMin + usersPerStep), holdFor(stepDurationInSeconds.seconds),
          jumpToRps(rpsMin + usersPerStep * 2), holdFor(stepDurationInSeconds.seconds),
          jumpToRps(rpsMin + usersPerStep * 3), holdFor(stepDurationInSeconds.seconds),
          jumpToRps(rpsMin + usersPerStep * 4), holdFor(stepDurationInSeconds.seconds),
          jumpToRps(rpsMin + usersPerStep * 5), holdFor(stepDurationInSeconds.seconds)
        ))
      .maxDuration(maxDurationInSeconds.seconds)
  }

  def reliabilityTest(
                       populationBuilder: PopulationBuilder,
                       populationBuilder1: PopulationBuilder,
                       populationBuilder2: PopulationBuilder,
                       maxDurationInSeconds: Int) = {
    setUp(populationBuilder, populationBuilder1, populationBuilder2).maxDuration(maxDurationInSeconds)
  }

  def preparePopulationBuilder(
                                scenario: ScenarioBuilder,
                                minRps: Int,
                                rpsPlanned: Int,
                                rampUpPeriodInSeconds: Int,
                                durationInSeconds: Int) = {
    scenario.inject(
      rampUsersPerSec(minRps).to(rpsPlanned).during(rampUpPeriodInSeconds.seconds),
      constantUsersPerSec(rpsPlanned).during(durationInSeconds.seconds)
    ).protocols(httpProtocol)
      .throttle(reachRps(rpsPlanned) in (rampUpPeriodInSeconds.seconds), holdFor((rampUpPeriodInSeconds + durationInSeconds).seconds))
  }

}
