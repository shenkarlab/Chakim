var sectionId;
var spani;
var q_num = 1;
var answers = [];
var chkimAns = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var percent = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var result = [14, 16, 15, 17, 10, 26, 20, 22, 11];
var i, j, y, p;
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

var tempName = [partySection(14, "הליכוד", "", "//www.youtube.com/embed/ZA23LiWIHzM", 49.3, 3.2, "#22599c", 10), partySection(16, "המחנה הציוני", "", "//www.youtube.com/embed/J5eDRryp9uY", 61.7, 2.9, "#265da0", 10), partySection(15, "יש עתיד", "", "//www.youtube.com/embed/pKVrFwJ2CVc", 29.3, 2.1, "#16477e", 10), partySection(17, "הבית היהודי", "", "//www.youtube.com/embed/oSwCtvH9838", 38.5, 2.7, "#a2c739", 10), partySection(10, "כולנו", "", "//www.youtube.com/embed/YujaXY3jyKM", 0, 0, "#30b4e7", 10), partySection(26, "ישראל ביתנו", "", "//www.youtube.com/embed/5hO4mnG-wLU", 39.5, 2.4, "#255a70", 10), partySection(20, "מרצ", "", "//www.youtube.com/embed/IF2yLwB0Qa0", 119.7, 5, "#3d9c3f", 10), partySection(22, "הרשימה הערבית", "", "//www.youtube.com/embed/ZxPuED8HZIk", 215, 5.5, "#009138", 10), partySection(11, 'ש"ס', "", "//www.youtube.com/embed/ZxPuED8HZIk", 53, 2.2, "#000000", 10)];

var partiesAvg = [];

var allImages = [];
function calcResidence() {
	$.getJSON("js/party.json", function(data) {
		var kneset = data.kneset;
		$.each(kneset, function(index, value) {
			parties.push(Party(value.name, value.id, value.number_of_seats, value.members));
		});
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

		});

	});
};

$(document).ready(function() {

	//liquid party menu results
	$(document).on('click', "#liquid1 .wrapper ul li a", function() {

		var me = $(this).find("img");
		//add class selected to the clicked result
		$.each(allImages, function(index, value) {
			if ($(value).hasClass('selected')) {
				$("span").css({
					"color" : "#4c4c4c",
				})
				$(value).removeClass('selected');
				$(value).mouseover(function() {
					$(this).css('opacity', '0.5');
				});
				$(value).mouseout(function() {
					$(this).css('opacity', '1');
				});
				//add selected image for explorer and firefox
				$(value).attr('src', 'images/results_bg.png');
			}
			//undo border for explorer and firefox
			$(value).css('border', 'none')
		});
		me.addClass('selected');
		//add un selected image for explorer and firefox
		me.attr('src', 'images/selected_bg.png');
		me.css({
			'border' : 'none',
			'opacity' : '1.0'
		});
		numParty = me.parent().attr('id');
		$("a#" + numParty + " span").css({
			"color" : "#FFFFFF"
		})
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
			duration : 400,
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

function dodo() {
	$(".pluginButtonImage button[type=submit]").click();
}

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
	$.each(result, function(index, val) {
		if (val == 10)
			return;
		var progressbar = $("#" + val + "ProgressBar");
		$("#" + val + "ProgressBar").progressbar({
			max : 100,
		});
		$("#" + val + "ProgressBar").css({
			"background" : "#a6a6a6"
		});
	});
});

//compare form results with party results
function checkform(obj) {
	//checkAns();
	if (q_num >= 9) {
		q_num = sectionId.substr(sectionId.length - 2, sectionId.length);
	} else {
		q_num = sectionId.substr(sectionId.length - 1, sectionId.length);
	}
	var aArray = $("#" + sectionId + " a");
	if (selection == "")
		return false;
	answers.push(selection);
	selection = "";
	if (parseInt(q_num, 10) == 12) {//update to num of questions
		checkAns();
	}

	//change question sections
	var currentSection = "#" + sectionPosition;

	sectionPosition = $("#" + sectionPosition).next().attr("id");

	var nextSection = "#" + sectionPosition;

	$(currentSection).addClass('fadeOutRight');
	$(nextSection).addClass('fadeInLeft').show();

	var active = $(".active");
	$(active.attr("data-next")).addClass("active");
	active.removeClass("active").addClass('seen');
	sectionId = $("#" + sectionPosition).find("section").attr('id');
	return false;

}

//calculate percentage from choosen party
function checkAns() {
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
			if (answers[index] != value.shess) {
				chkimAns[8]++;
			}
			tempName[0].answers[index] = value.licod;
			tempName[1].answers[index] = value.avoda;
			tempName[2].answers[index] = value.yeshAtid;
			tempName[3].answers[index] = value.abityehudi;
			tempName[4].answers[index] = value.culanu;
			tempName[5].answers[index] = value.israelbitnu;
			tempName[6].answers[index] = value.mertz;
			tempName[7].answers[index] = value.hadashe;
			tempName[8].answers[index] = value.shess;
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
			$('.p' + i).append("<b>" + tempName[i].percent + "%" + "</b>" + "<br />" + tempName[i].name);
			$('.p' + i).parent().attr('id', 'newID' + tempName[i].id);
		}
		//update full partys answer

		$(".answer0 #button0").click(function() {
			$("div.fullAns0").slideToggle("fast");
			// $(this).next().slideToggle("fast");

			$('.answer0').css({
				"display" : "block",
				'height' : 'auto',
				'position' : 'relative'
			});

		});
		$(".answer1 #button1").click(function() {
			$("div.fullAns1").slideToggle("fast");
		});
		$(".answer2 #button2").click(function() {
			$("div.fullAns2").slideToggle("fast");
		});
		$(".answer3 #button3").click(function() {
			$("div.fullAns3").slideToggle("fast");
		});
		$(".answer4 #button4").click(function() {
			$("div.fullAns4").slideToggle("fast");
		});
		$(".answer5 #button5").click(function() {
			$("div.fullAns5").slideToggle("fast");
		});
		$(".answer6 #button6").click(function() {
			$("div.fullAns6").slideToggle("fast");
		});
		$(".answer7 #button7").click(function() {
			$("div.fullAns7").slideToggle("fast");
		});
		$(".answer8 #button8").click(function() {
			$("div.fullAns8").slideToggle("fast");
		});
		$(".answer9 #button9").click(function() {
			$("div.fullAns9").slideToggle("fast");
		});
		var index = 0, smaller = 10;
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
	allButton = ["committee", "residence", "submission", "approve"];
	//check menu state and show according to state
	$(document).on('click', "li button", function() {
		for ( i = 0; i < 4; i++) {
			if ($("#" + allButton[i]).hasClass('selected2')) {
				$('.selected2').css({
					"background" : "#FFFFFF",
					color : "#000000",
					"z-index" : "0"
				});
				$("#" + allButton[i]).removeClass('selected2');
			}
		};
		//change manu button according to party color
		$(this).addClass('selected2');
		$(this).css({
			"background-image" : "url('images/button" + num + ".png')",
			color : "#ffffff",
			"z-index" : "2",
			"position" : "relative"
		});

	});
	$('li button').mouseover(function() {
		if (!$(this).hasClass('selected2'))
			$(this).css({
				"background-image" : "url('images/buttonHover" + num + ".png')",
				'color' : "#ffffff"
			});
	});
	$('li button').mouseout(function() {
		if (!$(this).hasClass('selected2'))
			$(this).css({
				"background-image" : "none",
				'color' : "#000000"
			});
	});

	//update bar according to the menu state
	$("button#residence").click(function() {
		$("button#residence").addClass('selected2');
		$('#hour').html("*שעות שבועיות");
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
				case 11: {
					$("#11ProgressBar").animate({
						"width" : ((7.5) * 10) + "px"
					});
					$("#11ProgressBar").html(7.5);
					break;
				}
			}
		}
	});
	$("button#committee").click(function() {
		$(this).addClass('selected2');
		$('#hour').html("*שעות שבועיות");

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
				case 11: {
					$("#11ProgressBar").animate({
						"width" : ((14) * 10) + "px"
					});
					$("#11ProgressBar").html(14);
					break;
				}
			}
		}

	});
	$("button#approve").click(function() {
		$(this).addClass('selected2');
		$('#hour').html("");

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
				case 11: {
					$("#11ProgressBar").animate({
						"width" : ((tempName[i].rulesApprove) * 20) + "px"
					});
					$("#11ProgressBar").html(tempName[i].rulesApprove);
					break;
				}
			}
		}
	});
	$("button#submission").click(function() {
		$(this).addClass('selected2');
		$('#hour').html("");

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
				case 11: {
					$("#11ProgressBar").animate({
						"width" : ((tempName[i].rulesSubmission) * 3) + "px"
					});
					$("#11ProgressBar").html(tempName[i].rulesSubmission);
					break;
				}
			}
		}
	});
}

//show party page result
function moveToPartyPage() {
	$("section#formContainer").hide();
	$("section#partyPage").show();

}

//update page with choosen party
function daynamicFunc(num) {
	$.getJSON("js/full.json", function(d) {
		var dataFull = d.fullAnswers;
		//$('#fullAns' + index).html(v);
		$.each(result, function(index, val) {
			if (val == num) {
				$.each(dataFull[index], function(x, v) {
					$('#fullAns' + x).html(v);
				});
			}
			return;
		});
	});

	$.each(parties, function(index, value) {
		if (value.id == num && num != 10 && num != 11) {

			$('#logo').css({
				"background-image" : "url('images/logo" + num + ".png')"
			});

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

			$('section.partyNameTrue').each(function() {
				$(this).html(value.name + " ענו:")
			});

			myAnsfunc();

			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == value.id) {
					$('#percentOf').html(tempName[i].percent + "%");

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
						if (tempName[i].answers[j] == "") {
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/no_comment.png')"
							});
						}
					}
					$("#" + value.id + "ProgressBar").addClass('selected1');
					$('.selected1').css({
						"background" : ((tempName[i].color))
					});
					$('.selected2').css({
						"background-image" : "url('images/button" + num + ".png')"
					}, {
						color : "#ffffff"
					});
					$('#activity h4').css({
						"color" : tempName[i].color
					});
					$('#questionnaire h4').css({
						"color" : tempName[i].color
					});
					$('#list h4').html("המועמדים המובילים במפלגת " + tempName[i].name);
					$('#list h4').css({
						"color" : tempName[i].color
					});

					break;
				}

			}
		}
		if (num == 10) {
			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == 10 ) {
					$('#logo').css({
						"background-image" : "url('images/logo" + num + ".png')"
					});
					$('#percentOf').html(tempName[i].percent + "%");
					$('section.partyNameTrue').each(function() {
						$(this).html(tempName[i].name + " ענו:")
					});

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
						if (tempName[i].answers[j] == "") {
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/no_comment.png')"
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
					$("#" + num + "ProgressBar").addClass('selected1');
					$('.selected1').css({
						"background" : ((tempName[i].color))
					});
					$('.selected2').css({
						"background-image" : "url('images/button" + num + ".png')"
					}, {
						color : "#ffffff"
					});
					$('#activity h4').css({
						"color" : tempName[i].color
					});
					$('#questionnaire h4').css({
						"color" : tempName[i].color
					});
					$('#list h4').html("המועמדים המובילים במפלגת " + tempName[i].name);
					$('#list h4').css({
						"color" : tempName[i].color
					});
					break;
				}
			}
		}
		if (num == 11) {

			for ( i = 0; i < tempName.length; i++) {
				if ( tempName[i].id == 11) {
					$('#logo').css({
						"background-image" : "url('images/logo" + num + ".png')"
					});
					$('#percentOf').html(tempName[i].percent + "%");
					$('section.partyNameTrue').each(function() {
						$(this).html(tempName[i].name + " ענו:")
					});

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
						if (tempName[i].answers[j] == "") {
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/no_comment.png')"
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
					$("#" + num + "ProgressBar").addClass('selected1');
					$('.selected1').css({
						"background" : ((tempName[i].color))
					});
					$('.selected2').css({
						"background-image" : "url('images/button" + num + ".png')"
					}, {
						color : "#ffffff"
					});
					$('#activity h4').css({
						"color" : tempName[i].color
					});
					$('#questionnaire h4').css({
						"color" : tempName[i].color
					});
					$('#list h4').html("המועמדים המובילים במפלגת " + tempName[i].name);
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
					"backgroundImage" : "url('images/dontKnow.png')"
				});
			}
		}
	}
}
