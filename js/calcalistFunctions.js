var sectionId;
var q_num = 1;
var answers = [];
var chkimAns = [0, 0, 0, 0, 0, 0, 0, 0];
var result = ["14", "16", "15", "17", "18", "26", "20", "22"];
var i;
var selection = "";
function Party(name, id, numberOS, mem) {
	return {
		name : name,
		id : id,
		number_of_seats : numberOS,
		members : mem,
	};
}

var parties = [];
function avgParty(id, avgMonth, avgWeek) {
	return {
		id : id,
		average_monthly_committee_presence : avgMonth,
		average_weekly_presence : avgWeek
	};
}

var partiesAvg = [];

$(document).ready(function() {
	$("section#partyPage").hide();
	$('section.questions:not(:first)').hide();
	sectionId = $('section.questions').find("section").attr('id');
	sectionPosition = $('section.questions').attr('id');
	console.log(sectionId);
	console.log(sectionPosition);
});

$(document).on("click", 'a', function(e) {
	selection = $(this).attr('value');
	console.log(selection);
});

function checkform(obj) {
	if (q_num >= 9) {
		console.log("bigger then 9");
		q_num = sectionId.substr(sectionId.length - 2, sectionId.length);
		console.log(q_num);
	} else {
		console.log("less then 9");
		q_num = sectionId.substr(sectionId.length - 1, sectionId.length);
		console.log(q_num);
	}
	var aArray = $("#" + sectionId + " a");
	if (selection == "")
		return;
	answers.push(selection);
	selection = "";
	console.log(answers);
	if (parseInt(q_num, 10) == 12) {
		console.log(answers);
		checkAns();
	}
	console.log(sectionPosition);
	sectionPosition = $("#" + sectionPosition).next().attr("id");
	console.log("#" + sectionPosition);
	$("section.questions").hide();
	$("#" + sectionPosition).show();
	sectionId = $("#" + sectionPosition).find("section").attr('id');
	console.log(sectionId);
	return false;
}

function checkAns() {
	console.log("in check answers");
	//console.log(answers);
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
		console.log(chkimAns + " המרחק מהתשובות של המפלגות:\n");
		var index = 0,
		    smaller = 10;
		for ( i = 0; i < 8; i++)
			if (smaller > chkimAns[i]) {
				smaller = chkimAns[i];
				index = i;
			}
		for ( i = 0; i < 8; i++)
			if (smaller == chkimAns[i]) {
				console.log(result[i]);
			}
		console.log(chkimAns);
		moveToPartyPage();
		daynamicFunc(result[index]);

		var t = "<ul>"
		for ( i = 0; i < answers.length; i++) {
			t += "<li>" + answers[i] + "</li>";
		}
		t += "</ul>";
		$('#answer').append(t);
	});
}

function moveToPartyPage() {
	console.log("in party page");
	$("section#formContainer").hide();
	$("section#partyPage").show();

}

function daynamicFunc(num) {
	$.getJSON("js/party.json", function(data) {
		var kneset = data.kneset;
		$.each(kneset, function(index, value) {
			parties.push(Party(value.name, value.id, value.number_of_seats, value.members));
			console.log(value.name);
			console.log(value.id);
		});
		calcResidence();
		console.table(partiesAvg);
		console.table(parties);

		$.each(parties, function(index, value) {
			if (value.id == num) {
				$('#subTitle').append(value.name);
				/*		var mem = value.members;
				 $.each(mem, function(i, v) {
				 debugger;
				 console.log(v.img_url);
				 $('#pichome'+i).css('background-image',v.img_url);
				 });*/
			};
		});
		var images = {
			'image1' : 'images/BennettNaftali.jpg',
			'image2' : 'images/BenDahanEliahu.jpg',
			'image3' : 'images/arieluriyehuda.jpg'
		};
		$.each(images, function() {
			$('#imagesList').append('<li><img src="' + this + '" /></li>');
		});
		var sHTML = "<ul>";
		$.each(partiesAvg, function(index, value) { debugger;
			if (value.id == num) {
				sHTML += "<li><b>נוכחות בוועדות ישיבות בחודש בממוצע:</b>" + value.average_monthly_committee_presence + "</li>";
				sHTML += "<br />"
				sHTML += "<li><b>נוכחות במשכן שעות שבועיות בממוצע:</b>" + value.average_weekly_presence + "</li>";
			};
		});
		sHTML += "</ul>";
		$('#presence').append(sHTML);

	});
};
function calcResidence() {
	//console.log("נוכחות במשכן שעות שבועיות בממוצע")
	$.each(parties, function(index, value) {
		var calcWeek = 0;
		var calcComm = 0;
		$.each(value.members, function(index, value) {
			if (value.average_weekly_presence_hours) {
				calcWeek += parseInt(value.average_weekly_presence_hours, 10);
				calcComm += parseInt(value.average_monthly_committee_presence, 10);
				parties.push(Party(value.id, value.number_of_seats, value.members));
			}
		});
		var y = calcWeek / value.number_of_seats;
		var x = calcComm / value.number_of_seats;
		partiesAvg.push(avgParty(value.id, x, y));
		//console.log(value.name + " " + y + " נוכחות במשכן:");
		//console.log(value.name + " " + x + " נוכחות בוועדה:");
	});
	console.log("--------------------------");
}

/*
 function calcCommittee() {
 console.log("נוכחות בוועדות ישיבות בחודש בממוצע");
 $.each(parties, function(index, value) {
 var calc = 0;
 $.each(value.members, function(index, value) {
 calc += parseInt(value.average_monthly_committee_presence, 10);
 });
 var x=calc / value.number_of_seats;
 console.log(value.name + " " + x + "נוכוחות בועדות: ");
 });
 console.log(parties[1])
 }*/