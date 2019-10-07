	function callExercise1() {
        document.getElementById("answExercise1").innerHTML = this.exercise1(13,12);
    }
    function callExercise2() {
        document.getElementById("answExercise2").innerHTML = this.exercise2(0.0625);
    }
	
    function callExercise4() {
        var array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
        ];
		
		document.getElementById("answExercise4").innerHTML = printArray2D(this.exercise4(array));
        console.log(this.exercise4(array));
    }
	
	function callExercise6() {
		document.getElementById("answExercise6").innerHTML = this.exercise6(743038);
        console.log(this.exercise6(743038));
    }
	
	function callExercise7() {
        var array = [
            [0, 2, 3, 3, 3],
            [0, 0, 2, 2, 2],
            [1, 8, 2, 3, 1],
        ];
		
		document.getElementById("answExercise7").innerHTML = printArray2D(this.exercise7(array));
        console.log(this.exercise7(array).join('\n'));
        
    }
	
	function printArray2D(array){
		
		var str = '[\n';
		for (var row = 0; row < array.length; row++) {
		  str += "  [";
		  for (var col = 0; col < array[0].length; col++) {
			str += array[row][col] + ', ';
		  }

		  str = str.substring(0, str.length - 2);
		  str += "],\n";   
		}
		str += "];"
		
		return str;
	}
    
	/*BEGIN FUNCTIONS*/
	
	
	/**
     * Write a function that receives two numeric parameters (positive integers), adds them and prints the result
        in the console. You should not use + or any arithmetic operators
     * IDEA, convert to binary and sum each position using XOR and then convert to decimal
     * @param num1 number 1
     * @param num2 number 2
     */
    function exercise1(num1, num2) {
        // Convert each number into a binary array and reverse it.
        var binary1 = Array.from(String((num1 >>> 0).toString(2)), Number).reverse();
        var binary2 = Array.from(String((num2 >>> 0).toString(2)), Number).reverse();
        var result = [];
		
        //Set length with the biggest array, shallow copy is not necesary.
        if (binary1.length > binary2.length)
            result = binary1.slice();
        else
            result = binary2.slice();
        
		//when 1 + 1 carry = 1 add to the next index
        var carry = 0;
        
		//Result will be the base to be able to map the biggest binary number
        result.forEach(function (item, index, array) {
        
			//As it may be a shorter array, to avoid errors, push 0 if index doesn't exist
            if (binary2[index] === undefined) {
                binary2.push(0);
            }
            if (binary1[index] === undefined) {
                binary1.push(0);
            }
            
			//if 1 and 1 or 0 and 0 then 0, otherwise 1, Basic Sum 
            array[index] = binary1[index] ^ binary2[index];
            
			//If carry then re evaluate
            if (carry === 1) {
            
			//if sum values from binaries arrays are 1 and 1 or if carry and XOR new value are 1 and 1
                // then add carry = 1
                carry = binary1[index] & binary2[index] || carry & array[index];

                //Sum carry to the current value
                array[index] = array[index] ^ 1; //XOR (0 and 0) and (1 and 1) = 0, otherwise 1     
            }
            else
                carry = binary1[index] & binary2[index]; //if carry = 0 then evaluate values
        });

        //If we got a final carry add it to the result array
        if (carry === 1) {
            result.push(carry);
        }
		
		var result = parseInt(result.reverse().join(''), 2).toString(10);
		
		console.log(result);
		
		//Return added it for testing interface
		return result;
    }
	
	
    /**
     * Given a number between 0 and 1 (e.g. 0.15), print its binary representation. If the number cannot be
       represented accurately in binary with at most 32 characters, just print "Error".
       ** Idea:
       * All finites fractions converted to binary must end in 25 or 75, except 0.5
       * If it does, give a chance to:
       * Iterate over number and make sure we won't be larger than 32 characters
     * @param binary Binary between 0 and 1 (Fraction number)
     */
    function exercise2(binary) {
        //Validate number between 0 and 1
        if (binary <= 0 || binary >= 1) {
            console.log('Number must be between 0 and 1');
            return 'Number must be between 0 and 1';
        }
        var arrResult = [];
        var count = 0;
        const MAX = 30; //Max characters are 32, so, 30 will be MAX to be able to add '0.' to represent it as fraction
        /* Imp: decimal operations have a limit,
         * to know whether it will be finite or not, make sure it ends with 25 or 75 we will get a better approch.
         * If it does, lets give it a try.
         *  */

        var  sValidation = binary.toString();
        sValidation = sValidation.substring(sValidation.length - 2, sValidation.length);
        if (sValidation !== '.5' && (sValidation !== '25' && sValidation !== '75')) {
            console.log('Error');
            return 'Error';
        }

        //Count iterations to keep behind MAX
        while (++count <= MAX) {
            binary *= 2; //First step

            //Push into result ingeter 0 or 1
            arrResult.push(Math.floor(binary));

            //Get fraction
            binary %= 1;

            //Validate if it is done
            if (binary === 0) {
                break;
            }
        }

        //If count was bigger than MAX (30) print error, else print result;
        console.log(count > MAX ? "Error" : '0.' + arrResult.join(''));
		
		//Testing Pge
		return count > MAX ? "Error" : '0.' + arrResult.join('');
    }
	
	
    /**
     * Write a function that receives a matrix and returns its transposed one.
     * IDEA:
     * Map the array, and assinged row,col with col,row
     * @param array Matiz M x N
     */
    function exercise4(array) {
		
        // Input Array M x N, Create an array N x M to be ready to transpose.
        var newArray = Array.from(Array(array[0].length), () => new Array(array.length));
        
		//item in [row,col] will be place in [col,row]
        // It does it with all elements in matrix
        array.forEach((row, iRow) => row.forEach((item, iCol) => newArray[iCol][iRow] = item));
        return newArray;
    }
    
    
    /**
     * Write a function that can accept any number and return the number of circles inside the number, e.g.
  24690 as 3 circles, one for 6, another for 9 and another for 0, 7431 doesn't have any circles inside.
     * IDEA:
     * Set all numbers with circles, then find numbers that match with circles ones
     * Then add 1 or 2 if the number is 8.
     * @param num Number to find for circles
     */
    function exercise6(num) {
        //Define the numbers that contains at least a circle on it
        const circleArray = [0, 6, 8, 9];
        var nCircles = 0;
        var arrNumber = Array.from(String(num), Number); //Convert number to array of numbers

        //Filter array with only numbers with cicles (According to the values set) then sum 1 or 2 if number = 8 
        arrNumber.filter(x => circleArray.indexOf(x) !== -1)
            .map(x => nCircles += x === 8 ? 2 : 1);
        return nCircles;
    }
    
    /**
     * Write a function such that if an element in an MxN matrix is 0, its entire row and column are set to 0 and
        then printed out.
     * IDEA:
     * Map Matrix, if 0 is found then verify if it has not been set row and column with 0, if not then does it.
     * if all rows or all columns are set to 0, exit and pritn array that will be all fill with 0.
     * This last validation will be tracked with 2 arrays verRow and verCol.
     * @param array Matix MxN to apply rules
     *
     * */
    function exercise7(array) {
        var newArray = array.map((arr) => arr.slice()); //Go each level to shadow copy

        //Get M and N, it will be helpfull to compare later
        var nRow = array.length;
        var nCol = array[0].length;

        //Define verification array and set all 0, It will be use to avoid setting twice 0 Rows and Columns, and break if need it
        var verRow = Array(nRow).fill(0);
        var verCol = Array(nCol).fill(0);

        //Start mapping array looking for 0
        newArray.forEach(function (row, r, arrRow) {
            row.forEach(function (col, c, arrCol) {
                var rRow = null;
                var cCol = null;
                if (array[r][c] === 0) { //If 0 is found
                    if (verRow[r] === 0) { //ROW validation. it is not done yet?
                        rRow = r; //Assing r to set row in 0
                        verRow[r] = 1; //Mark row completed
                    }
                    if (verCol[c] === 0) { // Columns Verify is not done
                        cCol = c; // Assing c to set Column in 0
                        verCol[c] = 1; // Mark Column as completed
                    }

                    //If Row is going to be 0 then set it
                    if (rRow !== null) {
                        newArray[rRow].forEach(function (a, b, arrRowZ) {
                            arrRowZ.fill(0);
                        });
                    }

                    //If Column is going to be 0 then set it
                    if (cCol !== null) {
                        newArray.forEach(item => {
                            item[cCol] = 0;
                        });
                    }

                    //Verify if all Columns and All Rows are done by adding rows/cols done and compare it with total of rows/cols. if done then exit.
                    if (verCol.reduce((x, y) => x + y) === nCol || verRow.reduce((x, y) => x + y) === nRow) {
                        return;
                    }
                }
            });
        });
        
		//If it was all mapped the print result
        console.log(newArray);
		
		//To Print value
		return newArray;
    }
