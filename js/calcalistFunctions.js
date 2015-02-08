var sectionId;
var q_num = 1;
var answers = [];
var chkimAns = [0, 0, 0, 0, 0, 0, 0, 0];
var percent = [0, 0, 0, 0, 0, 0, 0, 0];
var result = [14, 16, 15, 17, 18, 26, 20, 22];
var i,
    j,
    y;
var selection = "";
var numParty = 0;
var bouncer;
function partySection(id, name, percent, vid, sub, app, Color, numMem, avgMonth, avgWeek) {
	return {
		id : id,
		name : name,
		percent : percent,
		answers : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		video : vid,
		rulesSubmission : sub,
		rulesApprove : app,
		color : Color,
		members : numMem,
		average_monthly_committee_presence : avgMonth,
		average_weekly_presence : avgWeek

	};
};

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

var tempName = [partySection(14, "הליכוד", "", "//www.youtube.com/embed/ZA23LiWIHzM", 49.3, 3.2, "#265da0", 10), partySection(16, "העבודה", "", "//www.youtube.com/embed/J5eDRryp9uY", 61.7, 2.9, "#265da0", 10), partySection(15, "יש עתיד", "", "//www.youtube.com/embed/pKVrFwJ2CVc", 29.3, 2.1, "#265da0", 0), partySection(17, "הבית היהודי", "", "//www.youtube.com/embed/oSwCtvH9838", 38.5, 2.7, "#a2c739", 7), partySection(10, "כולנו", "", "//www.youtube.com/embed/YujaXY3jyKM", 0, 0, "#6600CC", 0), partySection(26, "ישראל ביתנו", "", "//www.youtube.com/embed/5hO4mnG-wLU", 39.5, 2.4, "#6600CC", 0), partySection(20, "מרצ", "", "//www.youtube.com/embed/IF2yLwB0Qa0", 119.7, 5, "#3d9c3f", 0), partySection(22, "חדש", "", "//www.youtube.com/embed/ZxPuED8HZIk", 215, 5.5, "#3d9c3f", 0)];

var partiesAvg = [];

var allImages = [];
function calcResidence() {
	$.getJSON("js/party.json", function(data) {
		var kneset = data.kneset;
		$.each(kneset, function(index, value) {
			parties.push(Party(value.name, value.id, value.number_of_seats, value.members));
		});
		//console.log("נוכחות במשכן שעות שבועיות בממוצע")
		$.each(parties, function(index, value) {
			var calcWeek = 0;
			var calcComm = 0;
			$.each(value.members, function(index, value) {
				calcComm += parseInt(value.average_monthly_committee_presence, 10);
				if (value.average_weekly_presence_hours) {
					calcWeek += parseInt(value.average_weekly_presence_hours, 10);
				}
				parties.push(Party(value.id, value.number_of_seats, value.members));
			});
			var y = calcWeek / value.number_of_seats;
			var x = calcComm / value.number_of_seats;
			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == value.id) {
					tempName[i].average_monthly_committee_presence = y;
					tempName[i].average_weekly_presence = x;
				}
			}

			//console.log(value.name + " " + y + " נוכחות במשכן:");
			//console.log(value.name + " " + x + " נוכחות בוועדה:");
		});
		console.log(tempName)
		console.log("--------------------------");
	});
};

$(document).ready(function() {

	//liquid party menu results
	$(document).on('click', "#liquid1 .wrapper ul li a", function() {

		var me = $(this).find("img");
		//add class selected to the clicked result
		$.each(allImages, function(index, value) {
			console.log(($(value)));
			if ($(value).hasClass('selected'))
				$(value).removeClass('selected');
		});
		me.addClass('selected');
		numParty = me.parent().attr('id')
		numParty = numParty.replace(/[^\d.]/g, '');
		daynamicFunc(numParty);
		//update page with party results
		updateButton(numParty);
		//update progress bar with party results
	});

	//click the first commite button
	$("button #committee").click();
	//initialize liquid menu
	$(document).ready(function() {
		allImages = $("#liquid1 .wrapper ul li a img");
		$('#liquid1').liquidcarousel({
			height : 191,
			duration : 100,
			hidearrows : false
		});
		//form hide all sections but the first question
		$("section#partyPage").hide();
		$('section.questions:not(:first)').hide();
		sectionId = $('section.questions').find("section").attr('id');
		sectionPosition = $('section.questions').attr('id');

		//calculate the party activity
		calcResidence();
	});
	//get the value clicked in form
	$(document).on("click", '.inputButton', function(e) {
		e.preventDefault();
		selection = $(this).attr('value');
		if (selection != "") {
			$("form").submit();
			console.log(selection);
		}
	});
	//change animation on hover form
	$(document).on("mouseenter", '.inputButton', function(e) {
		$(this).css("opacity", "1");
		var $that = $(this);
		doBounce($that, 0.8, '10px', 400);
		bouncer = setInterval(function() {
			doBounce($that, 0.8, '10px', 400);
		}, 800);
	});
	//stop animtion on hover form
	$(document).on("mouseleave", '.inputButton', function(e) {
		$(this).css("opacity", "0.6");
		clearInterval(bouncer);
	});
});
//bounce animation in form
function doBounce(element, times, distance, speed) {
	for ( i = 0; i < times; i++) {
		element.animate({
			marginTop : '-=' + distance
		}, speed).animate({
			marginTop : '+=' + distance
		}, speed);
	}
}

//initialize all progress bar
$(function() {
	var progressbar = $("#l4ProgressBar");
	$("#14ProgressBar").progressbar({
		max : 100,
	});
	$("#14ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#20ProgressBar");
	$("#20ProgressBar").progressbar({
		max : 100,
	});
	$("#20ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#17ProgressBar");
	$("#17ProgressBar").progressbar({
		max : 100,
	});
	$("#17ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#15ProgressBar");
	$("#15ProgressBar").progressbar({
		max : 100,
		"background-color" : "#a6a6a6"
	});
	$("#15ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#26ProgressBar");
	$("#26ProgressBar").progressbar({
		max : 100,
	});
	$("#26ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#16ProgressBar");
	$("#16ProgressBar").progressbar({
		max : 100,
	});
	$("#16ProgressBar").css({
		"background" : "#a6a6a6"
	});
	var progressbar = $("#22ProgressBar");
	$("#22ProgressBar").progressbar({
		max : 100,
	});
	$("#22ProgressBar").css({
		"background" : "#a6a6a6"
	});

});
//compare form results with party results
function checkform(obj) {
	checkAns();
	if (q_num >= 9) {
		q_num = sectionId.substr(sectionId.length - 2, sectionId.length);
		console.log(q_num);
	} else {
		q_num = sectionId.substr(sectionId.length - 1, sectionId.length);
		console.log(q_num);
	}
	var aArray = $("#" + sectionId + " a");
	if (selection == "")
		return false;
	answers.push(selection);
	selection = "";
	console.log(answers);
	if (parseInt(q_num, 10) == 12) {//update to num of questions
		console.log(answers);
		checkAns();
	}

	//change question sections
	var currentSection = "#" + sectionPosition;
	console.log("currentSection=" + currentSection);

	console.log(sectionPosition);
	sectionPosition = $("#" + sectionPosition).next().attr("id");
	console.log("#" + sectionPosition);

	var nextSection = "#" + sectionPosition;
	console.log("nextSection=" + nextSection);

	$(currentSection).addClass('fadeOutLeft');
	$(nextSection).addClass('fadeInRight').show();

	var active = $(".active");
	console.log(active.attr("data-next"));
	$(active.attr("data-next")).addClass("active");
	active.removeClass("active").addClass('seen');
	sectionId = $("#" + sectionPosition).find("section").attr('id');
	console.log(sectionId);
	window.location = "#" + sectionPosition;
	return false;

}

//calculate percentage from choosen party
function checkAns() {
	console.log("in check answers");
	//console.log(answers);
	$.getJSON("js/answer.json", function(data) {
		var dataAnswer = data.Answers;
		var eachPercent = 0;
		$.each(dataAnswer, function(index, value) {
			//parties.push(Party(value.name, value.id, value.number_of_seats, value.members))
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
			tempName[0].answers[index] = value.licod;
			tempName[1].answers[index] = value.avoda;
			tempName[2].answers[index] = value.yeshAtid;
			tempName[3].answers[index] = value.abityehudi;
			tempName[4].answers[index] = value.culanu;
			tempName[5].answers[index] = value.israelbitnu;
			tempName[6].answers[index] = value.mertz;
			tempName[7].answers[index] = value.hadashe;
		});

		for ( i = 0; i < chkimAns.length; i++) {
			eachPercent = 100 - ((chkimAns[i] * 100) / 10);
			percent[i] = parseInt(eachPercent);
			tempName[i].percent = parseInt(eachPercent);
		}
		//sort party reults
		var swapped;
		do {
			swapped = false;
			for ( i = 0; i < tempName.length - 1; i++) {
				if (tempName[i].percent > tempName[i + 1].percent) {
					var temp = tempName[i];
					tempName[i] = tempName[i + 1];
					tempName[i + 1] = temp;
					swapped = true;
				}
			}
		} while (swapped);
		//append results to  result menu
		for ( i = 0; i < percent.length; i++) {
			$('.p' + i).append(tempName[i].percent + "%" + "<br />" + tempName[i].name);
			$('.p' + i).parent().attr('id', 'newID' + tempName[i].id);
		}
		//update full partys answer
		$(".answer0 #button0").click(function() {
			$("div.fullAns0").slideToggle("slide");
			if ($('.answer0').height() == "240")
				$('.answer0').css({
					"height" : "480px "
				});
			else
				$('.answer0').css({
					"height" : "240px "
				});
		});
		$(".answer1 #button1").click(function() {
			$("div.fullAns1").slideToggle("");
			if ($('.answer1').height() == "240")
				$('.answer1').css({
					"height" : "480px "
				});
			else
				$('.answer1').css({
					"height" : "240px "
				});
		});
		$(".answer2 #button2").click(function() {
			$("div.fullAns2").slideToggle("");
			if ($('.answer2').height() == "240")
				$('.answer2').css({
					"height" : "480px "
				});
			else
				$('.answer2').css({
					"height" : "240px "
				});
		});
		$(".answer3 #button3").click(function() {
			$("div.fullAns3").slideToggle("");
			if ($('.answer3').height() == "240") {
				$('.answer3').css({
					"height" : "480px"
				});
			} else {
				$('.answer3').css({
					"height" : "240px"
				});
			}
		});
		$(".answer4 #button4").click(function() {
			$("div.fullAns4").slideToggle("");
			if ($('.answer4').height() == "240")
				$('.answer4').css({
					"height" : "480px "
				});
			else
				$('.answer4').css({
					"height" : "240px "
				});
		});
		$(".answer5 #button5").click(function() {
			$("div.fullAns5").slideToggle("");
			if ($('.answer5').height() == "240")
				$('.answer5').css({
					"height" : "480px "
				});
			else
				$('.answer5').css({
					"height" : "240px "
				});
		});
		$(".answer6 #button6").click(function() {
			$("div.fullAns6").slideToggle("");
			if ($('.answer6').height() == "240")
				$('.answer6').css({
					"height" : "480px "
				});
			else
				$('.answer6').css({
					"height" : "240px "
				});
		});
		$(".answer7 #button7").click(function() {
			$("div.fullAns7").slideToggle("");
			if ($('.answer7').height() == "240")
				$('.answer7').css({
					"height" : "480px "
				});
			else
				$('.answer7').css({
					"height" : "240px "
				});
		});
		$(".answer8 #button8").click(function() {
			$("div.fullAns8").slideToggle("");
			if ($('.answer8').height() == "240")
				$('.answer8').css({
					"height" : "480px "
				});
			else
				$('.answer8').css({
					"height" : "240px "
				});
		});
		$(".answer9 #button9").click(function() {
			$("div.fullAns9").slideToggle("");
			if ($('.answer9').height() == "240")
				$('.answer9').css({
					"height" : "480px "
				});
			else
				$('.answer9').css({
					"height" : "240px "
				});
		});
		var index = 0,
		    smaller = 10;
		//move first result to start
		$(".next").click();
		//choose the first result
		$("#liquid1 .wrapper ul li a img:last").click();
		//show party results
		moveToPartyPage();
		//check if works
		$("#committee").trigger("click");
	});
}

//update progress bar with results
function updateButton(num) {
	var idNum;
	for ( i = 0; i < tempName.length; i++) {
		if (num == tempName[i].id)
			idNum = i;
	}
	console.log(tempName);
	allButton = ["committee", "residence", "submission", "approve"];
	//check menu state and show according to state
	$(document).on('click', "button", function() {
		for ( i = 0; i < 4; i++) {
			if ($("#" + allButton[i]).hasClass('selected2')) {
				$('.selected2').css({
					"background" : "#FFFFFF",
					color : "#000000"
				});
				$("#" + allButton[i]).removeClass('selected2');
			}
		};
		//change manu button according to party color
		$(this).addClass('selected2');
		$(this).css({
			"background" : (tempName[idNum].color),
			color : "#ffffff"
		});
	});
	//update bar according to the menu state
	$("button#residence").click(function() {
		$("button#residence").addClass('selected2');
		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
			case 14: {
				$("#14ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#14ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 15: {
				$("#15ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#15ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 16: {
				$("#16ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#16ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 17: {
				$("#17ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#17ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 10: {
				break;
			}
			case 26: {
				$("#26ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#26ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 20: {
				$("#20ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#20ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			case 22: {
				$("#22ProgressBar").animate({
					"width" : ((tempName[i].average_weekly_presence) * 10) + "px"
				});
				$("#22ProgressBar").html(parseInt(tempName[i].average_weekly_presence));
				break;
			}
			}
		}
	});
	$("button#committee").click(function() {
		$(this).addClass('selected2');
		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
			case 14: {
				$("#14ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#14ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 15: {
				$("#15ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#15ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 16: {
				$("#16ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#16ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 17: {
				$("#17ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#17ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 10: {
				break;
			}
			case 26: {
				$("#26ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#26ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 20: {
				$("#20ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#20ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			case 22: {
				$("#22ProgressBar").animate({
					"width" : ((tempName[i].average_monthly_committee_presence) * 10) + "px"
				});
				$("#22ProgressBar").html(parseInt(tempName[i].average_monthly_committee_presence));
				break;
			}
			}
		}

	});
	$("button#approve").click(function() {
		$(this).addClass('selected2');
		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
			case 14: {
				$("#14ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#14ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 15: {
				$("#15ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#15ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 16: {
				$("#16ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#16ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 17: {
				$("#17ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#17ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 10: {
				break;
			}
			case 26: {
				$("#26ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#26ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 20: {
				$("#20ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#20ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			case 22: {
				$("#22ProgressBar").animate({
					"width" : ((tempName[i].rulesApprove) * 20) + "px"
				});
				$("#22ProgressBar").html(tempName[i].rulesApprove);
				break;
			}
			}
		}
	});
	$("button#submission").click(function() {
		$(this).addClass('selected2');
		for ( i = 0; i < tempName.length; i++) {
			switch (tempName[i].id) {
			case 14: {
				$("#14ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission ) * 3) + "px"
				});
				$("#14ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 15: {
				$("#15ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission) * 3) + "px"
				});
				$("#15ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 16: {
				$("#16ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission) * 3) + "px"
				});
				$("#16ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 17: {
				$("#17ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission) * 3) + "px"
				});
				$("#17ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 10: {
				break;
			}
			case 26: {
				$("#26ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission) * 3) + "px"
				});
				$("#26ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 20: {
				$("#20ProgressBar").animate({
					"width" : ((tempName[i].rulesSubmission) * 3) + "px"
				});
				$("#20ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			case 22: {
				$("#22ProgressBar").animate({
					"width" : "500px"
				});
				$("#22ProgressBar").html(tempName[i].rulesSubmission);
				break;
			}
			}
		}
	});
}

//show party page result
function moveToPartyPage() {
	console.log("in party page");
	$("section#formContainer").hide();
	$("section#partyPage").show();

}

//update page with choosen party
function daynamicFunc(num) {
	$.each(parties, function(index, value) {
		if (value.id == num && num != 10) {
			$('#headLogo').css({
				"background-image" : "url('images/headOf1.png')"
			});
			$('#subTitle').html("");
			$('#logo').css({
				"background-image" : "url('images/logo" + num + ".png')"
			});

			//$('#subTitle').html(value.name);
			if (value.id == 17 || value.id == 20) {
				$('#choice').css({
					"background-image" : "url('images/resultParty" + num + ".jpg')"
				});
			} else {
				$('#choice').css({
					"background-image" : "url('images/resultParty14.jpg')"
				});
			}
			i = 0;
			$.each(result, function(i, v) {
				if ($(("#" + v + "ProgressBar")).hasClass('selected1')) {
					$('.selected1').css({
						"background" : "#a6a6a6"
					});
					$(("#" + v + "ProgressBar")).removeClass('selected1');
				}
			});
			$("#" + value.id + "ProgressBar").addClass('selected1');
			/*$("#" + value.id + "ProgressBar").css({
			 "background" : "#4C4C4C",
			 "color" : "#ffffff"
			 });*/
			/*		var mem = value.members;
			 $.each(mem, function(i, v) {
			 console.log(v.img_url);
			 $('#pichome'+i).css('background-image',v.img_url);
			 });*/

			$('section.partyNameTrue').each(function() {
				$(this).html(value.name + " ענו:")
			});
			/*$('#myAnswer').each(function(i,v) {
			if (answers[i] == "yes")
			$(this).css({"background-image": "images/smalLike.jpg"});
			else {
			if (answers[i] == "no")
			$(this).css({"background-image": "images/smallDisLike.jpg"});

			}
			});*/
			//my results from form
			myAnsfunc();

			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == value.id) {
					$('#percentOf').html(tempName[i].percent + "%");
					document.getElementById("frame").src = tempName[i].video;

					for ( j = 0; j < 10; j++) {
						if (tempName[i].answers[j] == "yes")
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/smalLike.png')"
							});
						else {
							if (tempName[i].answers[j] == "no")
								$('#theAns .partyAnswer' + j).css({
									"backgroundImage" : "url('images/smallDisLike.png')"
								});
						}
					}
					$('.selected1').css({
						"background" : ((tempName[i].color))
					});
					$('.selected2').css({
						"background" : (tempName[i].color)
					}, {
						color : "#ffffff"
					});
					$('#activity h4').css({
						"color" : tempName[i].color
					});
					$('#questionnaire h4').css({
						"color" : tempName[i].color
					});
					$('#list h4').css({
						"color" : tempName[i].color
					});
					console.log(tempName[i].color);
					break;
				}
			}
		}
		if (num == 10) {
			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == 10) {
					$('#headLogo').css({
						"background-image" : "url('images/headOf1.png')"
					});
					$('#subTitle').html("");
					$('#percentOf').html(tempName[i].percent + "%");
					$('#choice').css({
						"background-image" : "url('images/resultParty14.jpg')"
					})
					$('section.partyNameTrue').each(function() {
						$(this).html(tempName[i].name + " ענו:")
					});

					document.getElementById("frame").src = tempName[i].video;

					//	$('#frame').src = "'"+tempName[i].video+"'";
					console.log(tempName[i].video);
					myAnsfunc();
					for ( j = 0; j < 10; j++) {
						if (tempName[i].answers[j] == "yes")
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/smalLike.png')"
							});
						else {
							if (tempName[i].answers[j] == "no")
								$('#theAns .partyAnswer' + j).css({
									"backgroundImage" : "url('images/smallDisLike.png')"
								});
						}
					}
					y = 0;
					$.each(result, function(y, v) {
						if ($(("#" + v + "ProgressBar")).hasClass('selected1')) {
							$('.selected1').css({
								"background" : "#a6a6a6"
							});
							$(("#" + v + "ProgressBar")).removeClass('selected1');
						}
					});
					$('.selected2').css({
						"background" : (tempName[i].color)
					}, {
						color : "#ffffff"
					});
					$('#activity h4').css({
						"color" : tempName[i].color
					});
					$('#questionnaire h4').css({
						"color" : tempName[i].color
					});
					$('#list h4').css({
						"color" : tempName[i].color
					});
					break;
				}
			}
		}
	});
	var images = [];
	for ( j = 1; j < tempName[i].members + 1; j++) {
		images[j] = 'images/' + num + '/' + num + '.' + j + '.png';
	}
	console.log(images);
	var sHTML = "";
	for ( j = 1; j < images.length; j++) {
		sHTML += '<li><img src="' + images[j] + '" /></li>';
	};
	$('#imagesList').html(sHTML);
}

//get user results
var u = 0;
function myAnsfunc() {
	for ( u = 0; u < 10; u++) {
		if (answers[u] == "yes")
			$('#theAns .myAnswer' + u).css({
				"backgroundImage" : "url('images/smalLike.png')"
			});
		else {
			if (answers[u] == "no")
				$('#theAns .myAnswer' + u).css({
					"backgroundImage" : "url('images/smallDisLike.png')"
				});
			else if (answers[u] == "don't know") {
				$('#theAns .myAnswer' + u).css({
					"backgroundImage" : "url('images/smallDisLike.png')"
				});
			}
		}
	}
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
 }*/