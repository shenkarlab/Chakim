var sectionId;
var q_num = 1;
var answers=[];
var chkimAns = [0, 0, 0, 0, 0, 0, 0, 0];
var result = ["licod", "avoda", "yeshAtid", "abityehudi", "culanu", "israelbitnu", "mertz", "hadashe"];
var i;
var url = "partyResult/partyResult.html";
$(document).ready(function() {
	$("section#partyPage").hide();
	$('section.questions:not(:first)').hide();
	sectionId = $('section.questions').attr('id');
});

function checkform(obj){
	if (q_num>=9) q_num = sectionId.substr(sectionId.length-2,sectionId.length);
	else q_num = sectionId.substr(sectionId.length-1,sectionId.length);
	var q = "question"+q_num+"choices";
	console.log(obj[q].value);
	answers.push(obj[q].value);
	console.log(parseInt(q_num,10));
	if (parseInt(q_num,10)==12){
		alert("from end");
		console.log(answers);
		checkAns();
		//return false;
	}
	sectionId = $("#"+sectionId).next().attr("id");
	$("section.questions").hide();
   	$("#"+sectionId).show();
	return false;
}

function checkAns() {
	console.log("in check answers");
	$.getJSON("js/answer.json", function(data) {
		var dataAnswer = data.Answers;
		$.each(dataAnswer, function(index, value) {
			//parties.push(Party(value.name, value.id, value.number_of_seats, value.members))
			console.log(value.licod);
			if (answers[index] != value.licod) {
				chkimAns[0]++;
			}
			if (answers[index] != value.avoda) {
				chkimAns[1]++;
			}
			if (answers[index] != value.yeshAtid) {
				chkimAns[2]++;
			}
			if (answers[index] != value.abityehudi) {
				chkimAns[3]++;
			}
			if (answers[index] != value.culanu) {
				chkimAns[4]++;
			}
			if (answers[index] != value.israelbitnu) {
				chkimAns[5]++;
			}
			if (answers[index] != value.mertz) {
				chkimAns[6]++;
			}
			if (answers[index] != value.hadashe) {
				chkimAns[7]++;
			}
		});
		console.log(chkimAns+" המרחק מהתשובות של המפלגות:\n");
		var index = 0, smaller = 10;
		for ( i = 0; i < 8; i++)
			if (smaller > chkimAns[i]) {
				smaller = chkimAns[i];
				//index = i;
			}
		for ( i = 0; i < 8; i++)
			if (smaller==chkimAns[i]) {
				console.log(result[i]);
			}
		console.log(chkimAns);
		moveToPartyPage();
	});
}

function moveToPartyPage(){
	console.log("in party page");
	$("section#formContainer").hide();
	$("section#partyPage").show();
}