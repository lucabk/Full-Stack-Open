interface Score{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: number[], goal:number):Score => {
    let rate, rateDescr
    let target=goal
    let average=(hours.reduce((h,k)=>h+k))/hours.length
    let periodLength = hours.length
    let trainingDays = hours.filter(d => d>0).length
    let success =  average>= goal
    if (average < goal*0.33){  rate = 1; rateDescr='below target'}
    else if(average > goal*0.33 && average < goal*0.66) { rate = 2; rateDescr='near target'} 
    else { rate=3; rateDescr='good job'}
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))