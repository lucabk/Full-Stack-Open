interface Score{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


export const calculateExercises = (hours: number[], goal:number):Score => {
  let rate, rateDescr;
  const target=goal;
  const average=(hours.reduce((h,k)=>h+k))/hours.length;
  const periodLength = hours.length;
  const trainingDays = hours.filter(d => d>0).length;
  const success =  average>= goal;
  if (average < goal * 0.5) {
      rate = 1;
      rateDescr = 'below target';
  } else if (average >= goal * 0.5 && average < goal) {
      rate = 2;
      rateDescr = 'near target';
  } else {
      rate = 3;
      rateDescr = 'good job';
  }
  const rating=rate;
  const ratingDescription=rateDescr;
  return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
  };    
};



if (require.main === module){
  
  interface inputArg{
    goal:number,
    hours:number[]
  }

  const parseArguments = (args: string[]): inputArg => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const goal = Number(args[2]);
    const hours = args.slice(3).map(arg => {
      if (isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!');
      }
      return Number(arg);
    });
  
    return {
      goal,
      hours
    };
  };

  try {
    const { goal, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, goal));
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('Error:', e.message);
    } else {
      console.log('Unknown error');
    }
  }
}