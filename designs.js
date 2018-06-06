var weight;

function makeGrid(event) {
    var height = $('#inputHeight').val();   //Stores the new rows count
    weight = $('#inputWeight').val();   //Stores the new cells/row count
    var grid = $('#pixelCanvas');           //stores the table that holds the cells

    if(grid.children().length < height){    //If the no of rows is less that the requested
        var oldHeight = grid.children().length;     //The previous no of rows
        var heightEx = height - oldHeight;          //The no of rows to be added now.

        //Add new rows
        for(var i = 0; i < heightEx; i++){
            grid.append("<tr></tr>");
        }

        //Add cells to new rows and increase or decrease cells in old rows if neccesary
        grid.children().each(function(index){
            if(index >= oldHeight){     //If the current row is more that the old rows count
                //Add cells to new rows
                for(var i = 0; i < weight; i++){
                    $(this).append("<td></td>");
                }
            }else{                      //If increase the cells of old rows or decrease them as recuired.
                //Add cells to old rows
                addCells($(this));
                //Remove excess cells in old rows.
                removeExCells($(this));
            }
        });
    }else{                                  //If no of rows is more than or equal to the requested.
        var oldHeight = grid.children().length;
        var rows = grid.children();

        //Remove excess rows.
        while(oldHeight > height){
            rows[--oldHeight].remove();
        }

        //Remove excess cells.
        grid.children().each(function(){
            removeExCells($(this));
        });
        //Add cells.
        grid.children().each(function(){
            addCells($(this));
        });
    }

    event.preventDefault();
}

//Add cells to rows.
function addCells(element){
    for(var i = element.children().length; i < weight; i++){
        element.append("<td></td>");
    }
}

//Remove excess cells
function removeExCells(element){
    if(element.children().length >= weight){
        var oldWeight = element.children().length;

        while(oldWeight > weight){
            element.children()[--oldWeight].remove();
        }
    }
}

//Event Handlers
$('#sizePicker').submit(makeGrid);
$('table').on('click', 'td',function(){
    var color = $('#colorPicker').val();
    var cell = $(this);

    if(cell.attr("class") === "painted" && (colorToHex(cell.css("background-color")) === color)){
        cell.css("background-color", "white");
    }else{
        cell.css("background-color", color);
    }

    console.log(colorToHex(cell.css("background-color")));
    console.log(color);
    cell.toggleClass("painted");
});
$('.clear').click(function(){
    $('tr').find('*').css("background-color", 'white');
});


function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};
