/*function Kneset() {
this.data;
this.party;
this.members;
this.memberInfo=[];
}

Kneset.prototype.getData = function() {
var me = this;
$.ajax({
url : 'https://oknesset.org/api/v2/',
type : 'GET',
accepts : 'application/json',
dataType : 'jsonp',
async:false
}).success(function(data) {
console.log(data);
me.data = data;
Kneset.prototype.getParty(data.party.list_endpoint);
}).fail(function() {
alert("fail");
});
};

Kneset.prototype.getParty = function(party) {
var me = this;
$.ajax({
url : 'https://oknesset.org' + party,
type : 'GET',
accepts : 'application/json',
dataType : 'jsonp',
async:false
}).success(function(data) {
$(data.objects).each(function() { this.members=[]; });
console.log(data.objects);
me.party = data.objects;
}).fail(function() {
alert("fail");
});
};

Kneset.prototype.getMembers = function() {
var me = this;
$.ajax({
url : 'https://oknesset.org' + me.data.member.list_endpoint,
type : 'GET',
accepts : 'application/json',
dataType : 'jsonp',
async:false
}).success(function(data) {
me.members = data.objects;
}).error(function() {
alert("fail");
});
};
Kneset.prototype.getHachim = function() {
var me = this;
$(me.members).each(function(index,value) {
if (value.is_current)
setTimeout(function (){
$.ajax({
url : 'https://oknesset.org' + value.resource_uri+'?format=jsonp',
type : 'GET',
accepts : 'application/jsonp',
dataType : 'jsonp',
async:false,
success:function(data){
me.memberInfo.push(data);
},
error:function(XMLHttpRequest, textStatus, errorThrown){
console.log("fail");
}
});
},1500);
});
};

Kneset.prototype.orgenizeHachim = function() {
var me = this;
$(me.party).each(function(index,party) {
$(me.memberInfo).each(function(index,member) {
if (member.party_url.indexOf(party.id)!= -1){
party.members.push(member);
}
});
});
};

Kneset.prototype.print = function() {
console.log(this.data, this.party)
};

var kneset = new Kneset();
kneset.getData();
*/
/*
function readAjax(number) {
$.ajax({
url : 'http://oknesset.org/api/v2/member-agendas/'+number+'/?format=jsonp',
type : 'GET',
accepts : 'application/json',
dataType : 'jsonp'
}).success(function(data) {
//console.log(data);
//console.table(data.agendas)
//var x = new Object();
//x[number.toString()] = data.agendas;
data.agendas.origin = number;
m_data.push(data.agendas);
console.table(m_data);
}).fail(function() {
alert("fail");
});
}
*/
//נתניהו הרצוג לפיד בנט כחלון ליברמן מרץ חדש
var t = 0;
var k="";
var w;
$(document).ready(function() {
	$("#submit").click(function() {
		 k[1] = $("input:radio[name=r1]:checked").val();
		 k[2] = $("input:radio[name=r2]:checked").val();
		 k[3] = $("input:radio[name=r3]:checked").val();
		 k[4] = $("input:radio[name=r4]:checked").val();
		 k[5] = $("input:radio[name=r5]:checked").val();
		//console.log(k);
			var i;
			
			for ( i = 0; i < 5; i++) {
				if (k[i] == 'radio1') {
					t++;
				} else if (k[i] =='radio2') {
					t = t + 2;
				}
			}
			console.log(k[1]);
			w=t.toString;
			var arr= ["0bibi", "6arzog", "3lapid", "2benet", "4kahelon", "1liberman", "5merzt", "7hadshe"];
			for ( i = 0; i < 8; i++) {
				if (parseInt(arr[i]) == t) {
					$("#demo").html(arr[i]);
				};

			};
		});
		

		
	});
	

