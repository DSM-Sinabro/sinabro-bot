var RtmClient = require('slack-client').RtmClient;
var WebClient = require('slack-client').WebClient;
var stringSimilarity = require('string-similarity');
var scheduler = require('node-schedule');

var token = 'your-token';

var web = new WebClient(token);
var rtm = new RtmClient(token, { logLevel: 'error' });
rtm.start();

var geon = 'U4HB2PTU5';
var detect = ['시간'];

var RTM_EVENTS = require('slack-client').RTM_EVENTS;

// 팀에 가입했을때
rtm.on(RTM_EVENTS.TEAM_JOIN, function (obj) {
    console.log("TEAM_JOIN \n" + obj);
    web.chat.postMessage("C47C9U141", '하이하이 시나브로 슬랙에 온걸 환영해! \n "+"나의 행동을 수정하고 싶으면 https://github.com/dsm-sinabro/sinabro-bot 에서 코드를 수정해줘 😀', { username: "sinabro-bot" });
});

// 새로운 채널이 생성되었을때
rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (obj) {
    console.log("CHANNEL_CREATED \n" + obj.channel);
    web.chat.postMessage("C47C9U141", '새로운 채널 #' + obj.channel.name + '이 생성되었다!', { username: 'sinabro-bot' })
});

// 건이가 말할때
rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var channel = message.channel;
    var user = message.user;
    var text = message.text;

    console.log('user : ' + user + ' text : ' + text + " channel : " + channel + "\n time : " + new Date());

    if(text == undefined) return;

    if (user == geon) {
        web.chat.postMessage(channel, '건아 닥쳐', { username: "sinabro-bot" });
        console.log("건아 닥쳐");
        return;
    } else if (text == 'hello' || text == 'Hello') {
        web.chat.postMessage(channel, 'world!', { username: "sinabro-bot" });
    }

    var matches = stringSimilarity.findBestMatch(text, detect).bestMatch;
    if(matches.rating == 1){
        var date = new Date();
        web.chat.postMessage(channel, '현재 시각 '+date.getHours()+' 시 '+ date.getMinutes()+ '분 입니다!',{username: "sinabro-bot"});
    }

});

scheduler.scheduleJob('0 0 * * * *',function(){
    var now = new Date();
    if(now.getHours() > 12)
        web.chat.postMessage('C47C9U141', now.getHours()-12+'시 정각입니다!', {username : 'sinabro-bot'});
    else
        web.chat.postMessage('C47C9U141', now.getHours()+'시 정각입니다!', {username : 'sinabro-bot'});
    console.log(now);
});