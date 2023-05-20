//Q:Print the sum, difference, and product of who complex numbers by creating a class named 'Complex' who real
//  and imaginary parts are entered by the user

//for this, we will first think of imaginary and real numbers, and their addition
//  given (ki+m) as a complex number and (ji+n) as another complex number, their sum would be-
//      (ki + m) + (ji + n) = ki + m + ji + n
//                          = ki + ji + m + n
//                          = i(k + j) + (m + n)
//
//now lets think of calculating difference
//  given (ki+m) as a complex number and (ji+n) as another complex number, their difference would be-
//      (ki + m) - (ji + n) = ki + m - ji - n
//                          = ki - ji + m - n
//                          = i(k - j) + (m - n)
//
//now lets think of calculating product
//  given (ki+m) as a complex number and (ji+n) as another complex number, their difference would be-
//      (ki + m)(ji + n) = ki(jk + n) + m(ji + n)
//                          = k*j*i*i + k*i*n + m*j*i + m*n
//                          = k*j*(-1) + kin + mji + mn
//                          = -kj + kin + mji + mn
//
//Now lets use these are formulae for our calculations

//first, clear the class Complex

class Complex {
    //init properties
    _imaginary = 0;
    _real = 0;

    //create contructor
    constructor(imaginary: number, real: number) {
        //set properies
        this._imaginary = imaginary;  //_imaginary*i = imaginary part
        this._real = real;
    }

    //create sum function with return value of an object which returns real, imaginary, and display string as a
    //  property, and takes the real and imaginary parts of another complex numbers as parameter
    add(imaginary: number, real: number): { imaginary: number, real: number, displayString: string } {
        //calculate imaginary sum
        let imaginaryPart = this._imaginary + imaginary;  //add imaginary parts
        let realPart = this._real + real; //add real parts
        let displayString = `${imaginaryPart}i + ${realPart}`; //format it as a display sting

        //return the variables
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }

    //create difference method with takes real and imaginary as params
    subtract(imaginary: number, real: number): { imaginary: number, real: number, displayString: string } {
        //perform calculations
        let imaginaryPart = this._imaginary - imaginary;
        let realPart = this._real - real;
        let displayString = `${imaginaryPart}i + ${realPart}`;

        //return vars
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }

    //create multiply method
    multiply(imaginary: number, real: number): { imaginary: number, real: number, displayString: string } {
        //(ki + m)(ji + n) = ki(jk + n) + m(ji + n)
        //                          = k*j*i*i + k*i*n + m*j*i + m*n
        //                          = k*j*(-1) + kin + mji + mn
        //                          = -kj + kin + mji + mn
        //                          = kin + mji - kj + mn
        //                          = i(kn + mj) - kj + mn
        //here, our k = this._imaginary, m = this._real, j = imaginary, n = real, so lets use this info
        let imaginaryPart = (this._imaginary * real) + (this._real * imaginary);
        let realPart = (-1 * this._imaginary * imaginary) + (this._real * real);
        let displayString = `${imaginaryPart}i + ${realPart}`;

        //return vars
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }
}

//in this implementation, the imaginary: number, real: number and 
//  { imaginary: number, real: number, displayString: string } are used everywhere, so instead of writing them
//  over and over again, lets use interfaces.

interface ComplexSmartParams {
    imaginary: number,
    real: number
}

interface ComplexSmartReturn {
    imaginary: number,
    real: number,
    displayString: string
}

class ComplexSmart {
    //init properties
    _imaginary = 0;
    _real = 0;

    //create contructor
    constructor(args: ComplexSmartParams) {
        //set properies
        this._imaginary = args.imaginary;  //_imaginary*i = imaginary part
        this._real = args.real;
    }

    //create sum function with return value of an object which returns real, imaginary, and display string as a
    //  property, and takes the real and imaginary parts of another complex numbers as parameter
    add(args: ComplexSmartParams): ComplexSmartReturn {
        //calculate imaginary sum
        let imaginaryPart = this._imaginary + args.imaginary;  //add imaginary parts
        let realPart = this._real + args.real; //add real parts
        let displayString = `${imaginaryPart}i + ${realPart}`; //format it as a display sting

        //return the variables
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }

    //create difference method with takes real and imaginary as params
    subtract(args: ComplexSmartParams): ComplexSmartReturn {
        //perform calculations
        let imaginaryPart = this._imaginary - args.imaginary;
        let realPart = this._real - args.real;
        let displayString = `${imaginaryPart}i + ${realPart}`;

        //return vars
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }

    //create multiply method
    multiply(args: ComplexSmartParams): ComplexSmartReturn {
        //(ki + m)(ji + n) = ki(jk + n) + m(ji + n)
        //                          = k*j*i*i + k*i*n + m*j*i + m*n
        //                          = k*j*(-1) + kin + mji + mn
        //                          = -kj + kin + mji + mn
        //                          = kin + mji - kj + mn
        //                          = i(kn + mj) - kj + mn
        //here, our k = this._imaginary, m = this._real, j = args.imaginary, n = args.real, so lets use this info
        let imaginaryPart = (this._imaginary * args.real) + (this._real * args.imaginary);
        let realPart = (-1 * this._imaginary * args.imaginary) + (this._real * args.real);
        let displayString = `${imaginaryPart}i + ${realPart}`;

        //return vars
        return {
            imaginary: imaginaryPart,
            real: realPart,
            displayString: displayString
        }
    }
}