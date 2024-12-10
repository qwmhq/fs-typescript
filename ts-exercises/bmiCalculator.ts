export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    return "Normal range";
  } else if (bmi < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    return "Obese (Class I)";
  } else if (bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

interface BmiParams {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): BmiParams => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");

  let height = Number(args[2]);
  let weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("invalid height or weight!");
  }
  return {
    weight,
    height,
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (err) {
    console.log("An error occured:", err.message);
  }
}
