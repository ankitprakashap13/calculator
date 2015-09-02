$(function(){
	var number = "";
	var operator = "";
	var initial = "";
	var checkLength = function(number){
		if(number.length > 9){
			$('#total').text(number.substr(number.length-9));
		}
	}
	$('#numbers > a').not('#clear').not('#allClear').click(function(){
		$('#total').text($('#total').text() + $(this).text());
		checkLength($('#total').text());
	});
	$('#operators > a').not('#equals').click(function(){
		initial = $('#total').text();
		number = "";
		operator = $(this).text();
		$('#total').text("");
		checkLength($('#total').text());
	});
	$('#equals').click(function(){
		number = $('#total').text();
		if(operator === "+"){
			$('#history ul').prepend('<li>' + initial + '+' + number + '</li>');
			number = (parseInt(initial) + parseInt(number)).toString();
			$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + number + '</span></a>');
		}
		else if(operator === "-"){
			$('#history ul').prepend('<li>' + initial + '-' + number + '</li>');
			number = (parseInt(initial) - parseInt(number)).toString();
			$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + number + '</span></a>');
		}
		else if(operator === "/"){
			$('#history ul').prepend('<li>' + initial + '/' + number + '</li>');
			number = (parseInt(initial) / parseInt(number)).toString();
			$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + number + '</span></a>');
		}
		else if(operator === "*"){
			$('#history ul').prepend('<li>' + initial + '*' + number + '</li>');
			number = (parseInt(initial) * parseInt(number)).toString();
			$('#history ul li:first').append('<a href="javascript:void(0)">= <span>' + number + '</span></a>');
		}
		$('#total').text(number);
	});
	$('#allClear').click(function(){
		$('#total').text("");
		number = 0;
		initial = 0;
	});
	$('#clear').click(function(){
		$('#total').text("");
		number = 0;
	});
	// $('#history ul li a').click(function(){ 
	// 	$(this).children().css('display','block');
	// 	$(this).parent().css('padding-bottom','40px');
	// });
	$('#toggle-btn').click(function(){
		$('#history ul').toggle( "slow", function(){
		});
	});
});