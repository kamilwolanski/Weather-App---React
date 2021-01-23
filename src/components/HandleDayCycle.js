import suncalc from "suncalc";

export default function HandleDayCycle({ data }, setDayCycle, lon, lat) {
  const currentTime = new Date(); // Obecna data i godzina

  const goldenHour = suncalc
    .getTimes(new Date(), lat, lon)
    .goldenHour.getTime();

  console.log(suncalc.getTimes(new Date(), lat, lon));

  const goldenHourEnd = suncalc
    .getTimes(new Date(), lat, lon)
    .goldenHourEnd.getTime();

  const dusk = suncalc.getTimes(new Date(), lat, lon).dusk.getTime();
  const sunSet = suncalc.getTimes(new Date(), lat, lon).sunset.getTime();

  const sunRise = suncalc.getTimes(new Date(), lat, lon).sunrise.getTime();
  const dawn = suncalc.getTimes(new Date(), lat, lon).dawn.getTime();

  const sumTimeToRiseAndDawn = Math.abs(
    new Date() - sunRise + (new Date() - dawn)
  );
  const differenceSunRiseAndDawn = sunRise - dawn;

  const sumTimeToSetAndGoldenHour = Math.abs(
    new Date() - sunSet + (new Date() - goldenHour)
  );
  const differenceSunSetAndGoldenHour = sunSet - goldenHour;

  const sumTimeToSetAndDusk = Math.abs(
    new Date() - sunSet + (new Date() - dusk)
  );
  const differenceDuskAndSunSed = dusk - sunSet;

  const sumTimeToRiseAndGoldenHourEnd = Math.abs(
    new Date() - sunRise + (new Date() - goldenHourEnd)
  );
  const differenceGoldenHourEndAndSunRise = goldenHourEnd - sunRise;

  const differenceBetweenSetAndRise = sunSet - sunRise;
  const toRise = currentTime - sunRise;
  const toSet = currentTime - sunSet;
  const sumTimeToRiseAndSet = Math.abs(toRise + toSet);

  if (sumTimeToRiseAndSet > differenceBetweenSetAndRise) {
    setDayCycle("night");
    if (
      sumTimeToSetAndDusk < differenceDuskAndSunSed &&
      differenceDuskAndSunSed - sumTimeToSetAndDusk < differenceDuskAndSunSed
    ) {
      console.log("night evening");
      setDayCycle("evening");
    }
    if (
      sumTimeToRiseAndDawn < differenceSunRiseAndDawn &&
      differenceSunRiseAndDawn - sumTimeToRiseAndDawn < differenceSunRiseAndDawn
    ) {
      setDayCycle("morning");
    }
  } else {
    setDayCycle("day");
    if (
      sumTimeToRiseAndGoldenHourEnd < differenceGoldenHourEndAndSunRise &&
      differenceGoldenHourEndAndSunRise - sumTimeToRiseAndGoldenHourEnd <
        differenceGoldenHourEndAndSunRise
    ) {
      setDayCycle("morning");
    }
    if (
      sumTimeToSetAndGoldenHour < differenceSunSetAndGoldenHour &&
      differenceSunSetAndGoldenHour - sumTimeToSetAndGoldenHour <
        differenceSunSetAndGoldenHour
    ) {
      setDayCycle("evening");
    }
  }
}
