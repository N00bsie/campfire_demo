function random_matrix(size) {
    var matrix = [];
    for (var i=0; i<size; i++) {
        var row = [];
        for (var j=0; j<size; j++) {
            var num = Math.round(100*Math.pow(Math.random(),2)+1);
            row.push(num);
        }
        matrix.push(row);
    }
    return matrix;
};

function nonrandom_matrix(size) {
    var matrix = [];
    for (var i=0; i<size; i++) {
        var row = [];
        for (var j=0; j<size; j++) {
            var num = 1;
            row.push(j != i ? 1 : 0);
        }
        matrix.push(row);
    }
    return matrix;
};


function new_matrix() {
    var matrix = [];
    for (var i=0; i<10; i++) {
        var row = [];
        for (var j=0; j<10; j++) {
            var num = Math.round(100*Math.pow(Math.random(),2)+1);
            row.push(i+1);
        }
        matrix.push(row);
    }
    return matrix;
};
