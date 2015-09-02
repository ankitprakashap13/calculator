var load_history = function(){
	try{
		var questions = JSON.parse(localStorage.getItem("questions"));
		$.each(questions, function(i, elem){
			answers = JSON.parse(localStorage.getItem("answers"));
			$('#history ul').prepend('<li>' + elem + '</li>');
			$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + answers[i] + '</span></a>');
		});
	}
	catch(e){
		console.log(e);
	}
};

$(function(){
	var equal_pressed = false;
	var operators = ["+", "-", "/", "*"];

	load_history();

	var checkLength = function(number){
		if(number.length > 9){
			$('#total').text(number.substr(number.length-9));
		}
	}

	$('#numbers > a').not('#clear').not('#allClear').click(function(){
		if(equal_pressed){
			$('#total').text("");
			equal_pressed = false;
		}
		$('#total').text($('#total').text() + $(this).text());
		checkLength($('#total').text());
	});

	$('#operators > a').not('#equals').click(function(){
		equal_pressed = false;
		var last_char = $('#total').text().slice(-1);
		if(operators.indexOf(last_char) == -1){
			$('#total').text($('#total').text() + $(this).text());
		}else{
			var str = $('#total').text();
			str = str.substring(0, str.length - 1);
			$('#total').text(str + $(this).text());
		}

		checkLength($('#total').text());
	});

	$('#equals').click(function(){
		question = $('#total').text();
		answer = eval(question);

		var q_arr = localStorage.getItem("questions") == null ? [] : JSON.parse(localStorage.getItem("questions"));
		var a_arr = localStorage.getItem("answers") == null ? [] : JSON.parse(localStorage.getItem("answers"));

		q_arr.push(question.toString());
		a_arr.push(answer.toString());

		localStorage.setItem("questions", JSON.stringify(q_arr));
		localStorage.setItem("answers", JSON.stringify(a_arr));

		$('#history ul').prepend('<li>' + question + '</li>');
		$("#previous-display").text(question);
		$('#total').text(answer);
		$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + answer + '</span></a>');
		equal_pressed = true;
	});

	$('#allClear').click(function(){
		$('#total').text("");
	});

	$('#clear').click(function(){
		var str = $('#total').text();
		str = str.substring(0, str.length - 1);
		$('#total').text(str);
	});

	// $('#history ul li a').click(function(){ 
	// 	$(this).children().css('display','block');
	// 	$(this).parent().css('padding-bottom','40px');
	// });

	$('#clear-history').click(function(){
		localStorage.removeItem("questions");
		localStorage.removeItem("answers");
	});
});