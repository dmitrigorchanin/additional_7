module.exports = function solveSudoku(matrix) {
    let Square = new Object();
    let matrix2 = matrix;
    let backup = [];
    let breakpoint;
    Square = {
        "1":{
            x_Start:0,
            x_End:2,
            y_Start:0,
            y_End:2,
        },
        "2":{
            x_Start:0,
            x_End:2,
            y_Start:3,
            y_End:5,
        },
        "3":{
            x_Start:0,
            x_End:2,
            y_Start:6,
            y_End:8,
        },
        "4":{
            x_Start:3,
            x_End:5,
            y_Start:0,
            y_End:2,
        },
        "5":{
            x_Start:3,
            x_End:5,
            y_Start:3,
            y_End:5,
        },
        "6":{
            x_Start:3,
            x_End:5,
            y_Start:6,
            y_End:8,
        },
        "7":{
            x_Start:6,
            x_End:8,
            y_Start:0,
            y_End:2,
        },
        "8":{
            x_Start:6,
            x_End:8,
            y_Start:3,
            y_End:5,
        },
        "9":{
            x_Start:6,
            x_End:8,
            y_Start:6,
            y_End:8,
        },
    }
    function main(functionName) {
        for (var x = 0; x<9;x++) {
            for (var y = 0; y<9;y++) {
                if (matrix[x][y] === 0) {
                    for (var i = 1; i<=9; i++) {
                        checkSquare(Square[i]["x_Start"],Square[i]["x_End"],Square[i]["y_Start"],Square[i]["y_End"],functionName);
                    }
                }
            }
        } 
    }

    function checkSquare(x_Start,x_End,y_Start,y_End,functionName) {
        var tempNum = [1,2,3,4,5,6,7,8,9];
        var tempArr = [];
        var Num = []; 

        for (var x = x_Start; x <= x_End; x++) {
            for (var y = y_Start; y <= y_End; y++) {
                if (matrix[x][y] === 0) {
                    tempArr.push([x,y]);
                }
                else{
                    delete tempNum[matrix[x][y]-1];
                }
            }
        }
        for (var i = 0, length = tempNum.length; i<length;i++) {
            if (tempNum[i]!==undefined) {
                Num.push(tempNum[i]);
            }
        }
        functionName(Num,tempArr);

    }

    function detectedNumbers(Num,tempArr) {
        var notes = new Object();

        for (var j = 0, length = Num.length; j < length;j++) {
            var counter = 0;

            for (var i = 0, length = tempArr.length; i < length;i++) {
                if ((checkRaw(tempArr[i][0],Num[j]) === 0) && (checkColumn(tempArr[i][1],Num[j])) === 0) {
                    counter++;
                    notes[Num[j]] = {"count": counter,
                    "location_x": tempArr[i][0],
                    "location_y": tempArr[i][1]
                    }
                }
            }
        }

        for (var i = 0, length = Num.length; i < length;i++) {

            if (notes[Num[i]]["count"] === 1) {
                matrix[notes[Num[i]]["location_x"]][notes[Num[i]]["location_y"]] = Num[i];
            }
          }
    }    
    
    function detectedCells(Num,tempArr) {
        var notes = new Object();

        for (var j = 0, length = tempArr.length; j < length;j++) {
            var counter = 0;

            for (var i = 0, length = Num.length; i < length;i++) {
                if ((checkRaw(tempArr[j][0],Num[i]) === 0) && (checkColumn(tempArr[j][1],Num[i])) === 0) {
                    counter++;
                    notes[tempArr[j]]={"count": counter,
                    "number": Num[i],
                    "location_x": tempArr[j][0],
                    "location_y": tempArr[j][1]
                    }
                }
            }
        }
        for (var i = 0, length = tempArr.length; i<length;i++) {

            if (notes[tempArr[i]]["count"] === 1) {
                matrix[notes[tempArr[i]]["location_x"]][notes[tempArr[i]]["location_y"]] = notes[tempArr[i]]["number"];
            }
          }
        
    }

    function smartFunction(Num,tempArr) {
        breakpoint = 0;

        for (var j = 0, length = Num.length; j<length;j++) {
            var loc = [];

            for (var i = 0, length = tempArr.length; i<length;i++) {
                if ((checkRaw(tempArr[i][0],Num[j]) === 0) && (checkColumn(tempArr[i][1],Num[j])) === 0) {
                    loc.push(tempArr[i]);
                }
            }
            
            if (loc.length === 2){
                matrix[loc[0][0]][loc[0][1]] = Num[j];
                breakpoint = 1;
                break;

            }
        }
    }

    function checkRaw(index,number) {
        for (var i = 0; i<9;i++) {
            if (matrix[index][i]===number) {
                return 1;
            }
        }
        return 0;
    }

    function checkColumn(index,number) {
        for (var i = 0; i<9;i++) {
            if (matrix[i][index]===number) {
                return 1;
            }
        }
        return 0;
    }
     
    function checkZero() {
        var zero = 0;

        for (var x = 0; x<9;x++) {
            for (var y = 0; y<9;y++) {
                if (matrix[x][y] === 0) {
                    zero++
                }
            }
        }
        //console.log(zero);
        return zero === 0 ? 1 : 0;
       
    }

    function main2() {
        for (var i = 1; i<=9; i++) {
            checkSquare(Square[i]["x_Start"],Square[i]["x_End"],Square[i]["y_Start"],Square[i]["y_End"],smartFunction)

            if (breakpoint === 1) {
                break;
            }
        }
        solve();

    }
    function solve(){
        main(detectedNumbers);
        main(detectedCells);
        if (checkZero()!=1) {    
            try {
                main2()
                } catch(error) {
                    matrix = matrix2
                    main2()
                }   
        }
        else{
            return;
        }
    }
    solve();
    return matrix;

}