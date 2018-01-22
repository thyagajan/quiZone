$( document ).ready(function() {
	
	var multiPlayer = false;
	var player1 = "";
	var player2 = "";	
	$('.player2').hide();
	$('#quiz').hide();
	var currentQ = 0;
	var hasPassed= false;
	var choiceShown = false;
	var p1Score=0;
	var p2Score=0;
	
	
     $('#toggle-event').change(function() {
    	if ($(this).prop('checked')){
			$('.player2').hide();
			multiPlayer = false;
		}else{
			$('.player2').show();
			multiPlayer = true;
		}
    });
	
	$('#beginBtn').click(function()   {
		$('#landing').hide();
		$('#quiz').show();
		initPlayers();
		prepareTheRound();
    });
	
	function initPlayers(){
		player1 = setValue($('#player1').val(),"Player 1");
		$('#p1').text(player1);
		$('#p1Score').text(p1Score);
		if(multiPlayer){
			player2 = setValue($('#player2').val(),"Player 2");
			$('#p2ScoreDiv').show();
			$('#p2').text(player2);
			$('#p2Score').text(p2Score);
		}
		
	}
	
	$('#optionsBtn').click(function()   {
		choiceShown = true;
		$('#optionsBtn').hide();
		$('#nochoice').hide();
		showOptions();
		$('#mchoice').show();
		$('#marks').text(setValue(questions[currentQ].delayedPoints,points.delayedPoints));
    });
	
	
	function showOptions(){
		$('#opt1').text(questions[currentQ].option1);
		$('#opt2').text(questions[currentQ].option2);
		$('#opt3').text(questions[currentQ].option3);
		$('#opt4').text(questions[currentQ].option4);
	}
	
	
	$('#nxtBtn').click(function()   {
		currentQ = currentQ+1;
		prepareTheRound();
    });
	
	$('#answer').focus(function(){
		resetFields();
		removeBackgrounds($('#answer'));
	});
	
	$('#subBtn').click(function()   {
		var selanswer = "";
		var rightAnswer = questions[currentQ].answer;
		var answer="";
		var selector = "";
		if(choiceShown ){
			answer = $('.answers.active span').text();
			selector =$('.answers.active'); 
			
		}else{
			answer = $('#answer').val();
			selector =$('#answer'); 
		}
			
		if(answer == rightAnswer ){
			removeBackgrounds(selector);
			changeBackground(selector,"bg-success");
			addScore();
			$('#optionsBtn').hide();
			$('#subBtn').hide();
			$('#nxtBtn').show();
		}else{
			removeBackgrounds(selector);
			changeBackground(selector,"bg-danger");
			var allowPassing = setValue(questions[currentQ].allowPass,allowPass);
			if(multiPlayer && allowPassing && !hasPassed){
				togglePlayer();
				$('#marks').text(setValue(questions[currentQ].passPoints,points.passPoints));
				hasPassed = true;
			}else{
				$('.answers span').each(function(key,value) {
					if(value.textContent == rightAnswer ){
						removeBackgrounds($( this ).parent());
						changeBackground($( this ).parent(),"bg-success");
					 }
				 	
			 	});
				$('#answerLable').show();
				$('#rightAnswer').text(rightAnswer);
				$('#optionsBtn').hide();
				$('#subBtn').hide();
				$('#nxtBtn').show();
			}
			
		}
		
	});
	
	function changeBackground(selector,bgClass){
		selector.addClass(bgClass);
		selector.addClass("text-white");
	}
	
	
	function setValue(value,defValue){
		if(typeof value == 'boolean')
			return value;
		if((typeof value == 'undefined') || value === "" )
			return defValue;
		else
			return value;
		
	}
	
	function prepareTheRound(){
		hasPassed=false;
		choiceShown=false;
		var qNum =questions[currentQ].id;
		$('#qNum').text(qNum);
		$('#question').text(questions[currentQ].question);
		$('#marks').text(setValue(questions[currentQ].points,points.points));
		setActualPlayer(qNum);
		displayButtons();
		removeBackgrounds($('.answers'));
		removeBackgrounds($('#answer'));
		resetFields();
	}
	
	function resetFields(){
		$('#answer').val('');
		$('#rightAnswer').text('');
		$('#answerLable').hide();
	}
	
	function displayButtons(){
		$('#nxtBtn').hide();
		$('#optionsBtn').hide();
		var delay = setValue(questions[currentQ].delayChoice,delayChoice);
		if(questions[currentQ].qType == "mChoice"){
			if(delay){
				$('#nochoice').show();
				$('#optionsBtn').show();
				$('#mchoice').hide();
			}else{
				$('#nochoice').hide();
				$('#optionsBtn').hide();
				showOptions();
				$('#mchoice').show();
				choiceShown = true;
			}
		}
		$('#subBtn').show();	

		
	}
	
	function removeBackgrounds(selector){
		selector.removeClass("text-white");
		selector.removeClass("bg-success");
		selector.removeClass("bg-danger");
		selector.removeClass("active");
	}
	
	function setActualPlayer(qNum){
		$('#pname').text(player1);
		if(multiPlayer &&(qNum %2 == 0)){
			$('#pname').text(player2);
		}
		
	}
	
	function togglePlayer(){
		if(!multiPlayer)
			return;
		var aPlayer =  $('#pname').text()==player1?player2:player1;
		$('#pname').text(aPlayer);
	}
	
	function addScore(){
		if($('#pname').text() == player2){
			p2Score = p2Score + parseInt($('#marks').text(),10);
			$('#p2Score').text(p2Score)
		}else{
			p1Score = p1Score +parseInt($('#marks').text(),10);
			$('#p1Score').text(p1Score)
		}
	}

	
	
});
