var sectionId;
var q_num = 1;
var answers=[];
var url = "partyResult/partyResult.html";
$(document).ready(function() {
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
		$(location).attr('href',url);
		return false;
	}
	sectionId = $("#"+sectionId).next().attr("id");
	$("section.questions").hide();
   	$("#"+sectionId).show();
	return false;
}
