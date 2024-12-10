interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  dailyHours: number[],
  targetAverage: number,
): ExerciseResult => {
  const average = dailyHours.reduce((acc, x) => acc + x) / dailyHours.length;
  const rating = Math.round((average / targetAverage) * 300) / 100;
  let ratingDescription: string;
  if (rating < 1.4) {
    ratingDescription = "poor";
  } else if (rating < 2) {
    ratingDescription = "fair";
  } else if (rating < 3) {
    ratingDescription = "good";
  } else {
    ratingDescription = "excellent";
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((x) => x > 0).length,
    success: average >= targetAverage,
    rating,
    ratingDescription,
    target: targetAverage,
    average,
  };
};

if (require.main === module) {
  const args = process.argv;
  if (args.length < 4) {
    console.log("not enough arguments");
    process.exit(1);
  }

  const target = Number(args[2]);
  if (isNaN(target)) {
    console.error("invalid target");
    process.exit(1);
  }

  const dailyHours = args.slice(3).map((x) => {
    const y = Number(x);
    if (isNaN(y)) {
      console.error("error parsing daily hours");
      process.exit(1);
    }
    return y;
  });

  console.log(exerciseCalculator(dailyHours, target));
}
