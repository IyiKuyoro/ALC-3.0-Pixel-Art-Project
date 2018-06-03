function makeGrid(event) {
	let height = $('#inputHeight').val();
	let weight = $('#inputWeight').val();
	const grid = $('#pixelCanvas');

	for(var h = 1; h <= height; h++){
		grid.append("<tr></tr>");
	}

	grid.children().each(function(){
		for(var w = 1; w <= weight; w++){
			$(this).append("<td></td>");
	}

	grid.html("");

	event.preventDefault();
	})

}

$("table").on('click', "td", function(){
    var color = $('#colorPicker').val();
        $(this).css("background-color", color);
});

$('#sizePicker').submit(makeGrid);
