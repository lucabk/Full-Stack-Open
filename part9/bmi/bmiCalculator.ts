
 const calculateBmi  = (height:number, mass:number):string => {
    const bmi:number = mass/(height/100)**2;
    
    if (bmi<16)
        return 'Underweight (Severe thinness)';
    else if (bmi>16 && bmi<16.9)
        return 'Underweight (Moderate thinness)';
    else if (bmi>17 && bmi<18.4)
        return 'Underweight (Mild thinness)';
    else if (bmi>18.5 && bmi<24.9)
        return 'Normal range';
    else if (bmi>25 && bmi<29.9)
        return 'Overweight (Pre-obese)';
    else if (bmi>30 && bmi<34.9)
        return 'Obese (Class I)';
    else if (bmi>35 && bmi<39.9)
        return 'Obese (Class II)';
    else if (bmi>=40)
        return'Obese (Class II)';
    else return 'out of range';

};


if (require.main === module){
    interface input{
        h:number,
        w:number
       
    }
    const pArguments = (args: string[]): input => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            return {
              h: Number(args[2]),
              w: Number(args[3])
            };
          } else {
            throw new Error('Provided values were not numbers!');
          }
    };
    
    try {
        const { h, w } = pArguments(process.argv);
        console.log(calculateBmi(h, w));
      } catch (e) {
        console.log('Error:', e.message);
      }
    
}


export {calculateBmi};