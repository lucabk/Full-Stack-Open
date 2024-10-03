interface Score{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

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
  }

const calculateExercises = (hours: number[], goal:number):Score => {
    let rate, rateDescr
    let target=goal
    let average=(hours.reduce((h,k)=>h+k))/hours.length
    let periodLength = hours.length
    let trainingDays = hours.filter(d => d>0).length
    let success =  average>= goal
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
    let rating=rate
    let ratingDescription=rateDescr
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }    
}

try {
    const { goal, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, goal));
  } catch (e) {
    console.log('Error:', e.message);
  }