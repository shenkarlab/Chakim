var sectionId;
var q_num = 1;
var answers = [];
var chkimAns = [0, 0, 0, 0, 0, 0, 0, 0];
var percent = [0, 0, 0, 0, 0, 0, 0, 0];
var result = ["14", "16", "15", "17", "18", "26", "20", "22"];
var i, j, y;
var selection = "";
var numParty = 0;
function partySection(id, name, percent, vid, sub, app, Color, avgMonth, avgWeek) {
	return {
		id : id,
		name : name,
		percent : percent,
		answers : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		video : vid,
		rulesSubmission : sub,
		rulesApprove : app,
		color : Color,
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

var tempName = [partySection(14, "הליכוד", "", "//www.youtube.com/embed/ZA23LiWIHzM", 49.3, 3.2, "#265da0"), partySection(16, "העבודה", "", "//www.youtube.com/embed/J5eDRryp9uY", 61.7, 2.9, "#265da0"), partySection(15, "יש עתיד", "", "//www.youtube.com/embed/pKVrFwJ2CVc", 29.3, 2.1, "#265da0"), partySection(17, "הבית היהודי", "", "//www.youtube.com/embed/oSwCtvH9838", 38.5, 2.7, "#a2c739"), partySection(10, "כולנו", "", "//www.youtube.com/embed/YujaXY3jyKM", 0, 0, "#6600CC"), partySection(26, "ישראל ביתנו", "", "//www.youtube.com/embed/5hO4mnG-wLU", 39.5, 2.4, "#6600CC"), partySection(20, "מרצ", "", "//www.youtube.com/embed/IF2yLwB0Qa0", 119.7, 5, "#3d9c3f"), partySection(22, "חדש", "", "//www.youtube.com/embed/ZxPuED8HZIk", 215, 5.5, "#3d9c3f")];

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
$(document).on('click', "#liquid1 .wrapper ul li a", function() {
	console.log(allImages);

	var me = $(this).find("img");
	$.each(allImages, function(index, value) {
		console.log(($(value)));
		if ($(value).hasClass('selected'))
			$(value).removeClass('selected');
	});
	me.addClass('selected');
	numParty = me.parent().attr('id')
	numParty = numParty.replace(/[^\d.]/g, '');

	daynamicFunc(numParty);
	updateButton(numParty);
});
$("button #committee").click();
$(document).ready(function() {
	allImages = $("#liquid1 .wrapper ul li a img");
	$('#liquid1').liquidcarousel({
		height : 191,
		duration : 100,
		hidearrows : false
	});

	$("section#partyPage").hide();
	$('section.questions:not(:first)').hide();
	sectionId = $('section.questions').find("section").attr('id');
	sectionPosition = $('section.questions').attr('id');
	console.log(sectionId);
	console.log(sectionPosition);

	// var width = (1 / 5 * 100);
	// $('#licodProgressBar').css('width', width + "%").css('background', "green");
	calcResidence();
	//$("#committee").click(function(){$(this).focus});
});

$(document).on("click", '.inputButton', function(e) {
	e.preventDefault();
	selection = $(this).attr('value');
	if (selection != "") {
		$("form").submit();
		console.log(selection);
	}
});

$(document).on("mouseenter", '.inputButton', function(e) {
	$(this).css("opacity", "1");
	doBounce($(this), 3, '30px', 300);
});

function doBounce(element, times, distance, speed) {
	for ( i = 0; i < times; i++) {
		element.animate({
			marginTop : '-=' + distance
		}, speed).animate({
			marginTop : '+=' + distance
		}, speed);
	}
}

$(function() {
	var progressbar = $("#l1ProgressBar");
	$("#14ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#2ProgressBar");
	$("#20ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#17ProgressBar");
	$("#17ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#15ProgressBar");
	$("#15ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#26ProgressBar");
	$("#26ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#16ProgressBar");
	$("#16ProgressBar").progressbar({
		max : 100,
	});
	var progressbar = $("#22ProgressBar");
	$("#22ProgressBar").progressbar({
		max : 100,
	});

});

function checkform(obj) {
	checkAns();
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
		return false;
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
	$("section.questions").hide('slide', {
		direction : 'right'
	}, 2500);
	$("#" + sectionPosition).show();
	var active = $(".active");
	console.log(active.attr("data-next"));
	$(active.attr("data-next")).addClass("active");
	active.removeClass("active").addClass('seen');
	sectionId = $("#" + sectionPosition).find("section").attr('id');
	console.log(sectionId);
	window.location = "#" + sectionPosition;
	return false;

}

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
		console.table(tempName);
		console.log(chkimAns + " המרחק מהתשובות של המפלגות:\n");
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

		/*var tName = "";
		 $.each(dataAnswer[0], function(key, val) {
		 tempName.push[key];
		 });*/
		for ( i = 0; i < percent.length; i++) {
			$('.p' + i).append(tempName[i].percent + "%" + "<br />" + tempName[i].name);
			$('.p' + i).parent().attr('id', 'newID' + tempName[i].id);
		}
		$(".answer1 #button0").click(function() {
			$("div.fullAns0").toggle("");
		});
		$(".answer1 #button1").click(function() {
			$("div.fullAns1").toggle("");
		});
		$(".answer1 #button2").click(function() {
			$("div.fullAns2").toggle("");
		});
		$(".answer1 #button3").click(function() {
			$("div.fullAns3").toggle("");
		});
		$(".answer1 #button4").click(function() {
			$("div.fullAns4").toggle("");
		});
		$(".answer1 #button5").click(function() {
			$("div.fullAns5").toggle("");
		});
		$(".answer1 #button6").click(function() {
			$("div.fullAns6").toggle("");
		});
		$(".answer1 #button7").click(function() {
			$("div.fullAns7").toggle("");
		});
		$(".answer1 #button8").click(function() {
			$("div.fullAns8").toggle("");
		});
		$(".answer1 #button9").click(function() {
			$("div.fullAns9").toggle("");
		});
		var index = 0, smaller = 10;
		/*for ( i = 0; i < 8; i++)
		 if (smaller > chkimAns[i]) {
		 smaller = chkimAns[i];
		 index = i;
		 }
		 for ( i = 0; i < 8; i++)
		 if (smaller == chkimAns[i]) {
		 console.log(result[i]);
		 }*/
		console.log(chkimAns);
		$(".next").click();
		// הוספתי
		$("#liquid1 .wrapper ul li a img:last").click();
		//	$("#committee").trigger("click");
		//	$("#committee").click();
		moveToPartyPage();
		//updateButton();
		$("#committee").trigger("click");
	});
}

function updateResults(id) {

}

function moveToPartyPage() {
	console.log("in party page");
	$("section#formContainer").hide();
	$("section#partyPage").show();

}

function updateButton(num) {
	var idNum;
	for ( i = 0; i < tempName.length; i++) {
		if (num == tempName[i].id)
			idNum = i;
		debugger;
	}
	console.log("update button" + idNum);
	console.log(tempName);
	allButton = ["committee", "residence", "submission", "approve"];
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
		$(this).addClass('selected2');
		$(this).css({
			"background" : (tempName[idNum].color),
			color : "#ffffff"
		});
	});
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

function daynamicFunc(num) {
	$.each(parties, function(index, value) {
		if (value.id == num && num != 10) {
			$('#subTitle').html(value.name);
			for ( i = 0; i < 27; i++) {

				if ($(("#" + i + "ProgressBar")).hasClass('selected1')) {
					$('.selected1').css({
						"background" : "#eeeeee"
					});
					$(("#" + i + "ProgressBar")).removeClass('selected1');
				}
			}
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
			myAnsfunc();
			for ( i = 0; i < tempName.length; i++) {
				if (tempName[i].id == value.id) {
					$('#percentOf').html(tempName[i].percent + "%");
					document.getElementById("frame").src = tempName[i].video;

					//	$('#frame').src = "'"+tempName[i].video+"'";
					console.log(tempName[i].video);

					for ( j = 0; j < 10; j++) {
						if (tempName[i].answers[j] == "yes")
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/smalLike.jpg')"
							});
						else {
							if (tempName[i].answers[j] == "no")
								$('#theAns .partyAnswer' + j).css({
									"backgroundImage" : "url('images/smallDisLike.jpg')"
								});
						}
					}
					$('.selected1').css({
						"background" : (tempName[i].color)
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
				debugger;
				if (tempName[i].id == 10) {

					$('#subTitle').html(tempName[i].name);
					$('#percentOf').html(tempName[i].percent + "%");
					$('section.partyNameTrue').each(function() {
						$(this).html(tempName[i].name + " ענו:")
					});

					document.getElementById("frame").src = tempName[i].video;

					//	$('#frame').src = "'"+tempName[i].video+"'";
					console.log(tempName[i].video);
					myAnsfunc();
					for ( j = 0; j < 10; j++) {
						debugger;
						if (tempName[i].answers[j] == "yes")
							$('#theAns .partyAnswer' + j).css({
								"backgroundImage" : "url('images/smalLike.jpg')"
							});
						else {
							if (tempName[i].answers[j] == "no")
								$('#theAns .partyAnswer' + j).css({
									"backgroundImage" : "url('images/smallDisLike.jpg')"
								});
						}
					}
					for ( y = 0; y < 27; y++) {

						if ($(("#" + y + "ProgressBar")).hasClass('selected1')) {
							$('.selected1').css({
								"background" : "#eeeeee"
							});
							$(("#" + y + "ProgressBar")).removeClass('selected1');
						}
					}
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
	/*var images = {
	 'image1' : 'images/BennettNaftali.jpg',
	 'image2' : 'images/BenDahanEliahu.jpg',
	 'image3' : 'images/arieluriyehuda.jpg'
	 };
	 $.each(images, function() {
	 $('#imagesList').append('<li><img src="' + this + '" /></li>');
	 });
	 var sHTML = "<ul>";
	 $.each(partiesAvg, function(index, value) {//כותב את בנוכחות במשכן של הפמלגה num
	 if (value.id == num) {
	 sHTML += "<li><b>נוכחות בוועדות ישיבות בחודש בממוצע:</b>" + value.average_monthly_committee_presence + "</li>";
	 sHTML += "<br />"
	 sHTML += "<li><b>נוכחות במשכן שעות שבועיות בממוצע:</b>" + value.average_weekly_presence + "</li>";
	 };
	 });
	 sHTML += "</ul>";
	 $('#presence').append(sHTML);
	 */
}
var u=0;
function myAnsfunc() {
	for ( u = 0; u < 10; u++) {
		if (answers[u] == "yes")
			$('#theAns .myAnswer' + u).css({
				"backgroundImage" : "url('images/smalLike.jpg')"
			});
		else {
			if (answers[u] == "no")
				$('#theAns .myAnswer' + u).css({
					"backgroundImage" : "url('images/smallDisLike.jpg')"
				});
			else if (answers[u] == "don't know") {
				$('#theAns .myAnswer' + u).css({
					"backgroundImage" : "url('images/smallDisLike.jpg')"
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
 console.log(parties[1])
 }*/