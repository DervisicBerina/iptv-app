(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication'];

  function RadioListController($scope, RadioService, Authentication) {

    var vm = this;
    getRadioChannels();
    setupJWPlayer();

    vm.radioList = [{
      'id': 75,
      'number': 1,
      'name': 'Radio Avaz Vrazici',
      'url': 'http:\/\/streaming.zadar.net:8000\/radio057'
    }, { 'id': 76, 'number': 2, 'name': 'Radio Mahala', 'url': 'http:\/\/andromeda.shoutca.st:8204\/' }, {
      'id': 77,
      'number': 3,
      'name': 'Radio Bosanska Posavina',
      'url': 'http:\/\/78.46.64.6:7000\/'
    }, { 'id': 78, 'number': 4, 'name': 'Radio Kakanj', 'url': 'http:\/\/95.211.166.127:8078\/' }, {
      'id': 79,
      'number': 5,
      'name': 'Radio Energy ',
      'url': 'http:\/\/stream.energy.rs.ba:8330\/live'
    }, { 'id': 80, 'number': 6, 'name': 'ABECEDA radio', 'url': 'http:\/\/163.172.213.155:8109\/' }, {
      'id': 81,
      'number': 7,
      'name': 'RGD',
      'url': 'http:\/\/radiokafic.com:1990\/'
    }, { 'id': 82, 'number': 8, 'name': 'Radio Bosna', 'url': 'http:\/\/163.172.213.155:8215\/' }, {
      'id': 84,
      'number': 11,
      'name': 'Narodni radio TNT',
      'url': 'http:\/\/server1.tnt.ba:10200\/'
    }, { 'id': 85, 'number': 12, 'name': 'Radio Bet', 'url': 'http:\/\/37.97.241.199:9988\/' }, {
      'id': 86,
      'number': 13,
      'name': 'Radio Magic',
      'url': 'http:\/\/91.191.19.198:8030'
    }, { 'id': 87, 'number': 14, 'name': 'Radio Preporod', 'url': 'http:\/\/s1.voscast.com:7986' }, {
      'id': 88,
      'number': 15,
      'name': 'Radio Srebrenik',
      'url': 'http:\/\/radiosrebrenik.omerovic.info:7600\/'
    }, { 'id': 89, 'number': 16, 'name': 'Radio San', 'url': 'http:\/\/80.246.63.161:7458\/' }, {
      'id': 90,
      'number': 17,
      'name': 'Radio Srbac',
      'url': 'http:\/\/s32.myradiostream.com:4858\/'
    }, { 'id': 91, 'number': 18, 'name': 'Radio Tesanj', 'url': 'http:\/\/radio.daj.ba:8082\/' }, {
      'id': 92,
      'number': 19,
      'name': 'Radio Treca Dimenzija',
      'url': 'http:\/\/23.250.7.2:8000\/'
    }, { 'id': 94, 'number': 21, 'name': 'Radio Sehara Dj_Ajkula', 'url': 'http:\/\/5.9.25.50:9320' }, {
      'id': 95,
      'number': 22,
      'name': 'Drukciji Radio',
      'url': 'http:\/\/185.99.0.240:9998'
    }, { 'id': 96, 'number': 23, 'name': 'Radio USK Bihac', 'url': 'http:\/\/138.201.227.5:9998\/' }, {
      'id': 97,
      'number': 24,
      'name': 'Radio Islama',
      'url': 'http:\/\/138.201.227.5:9998'
    }, { 'id': 98, 'number': 25, 'name': 'Radio Bir', 'url': 'http:\/\/188.40.62.20:8090' }, {
      'id': 99,
      'number': 26,
      'name': 'Radio Royal Ilijas',
      'url': 'http:\/\/streaming.4-p.org:8318\/1\/'
    }, { 'id': 100, 'number': 27, 'name': 'Radio Kalman', 'url': 'http:\/\/176.9.59.144:8020\/stream' }, {
      'id': 101,
      'number': 28,
      'name': 'Radio Pingvin SA',
      'url': 'http:\/\/5.9.25.50:9976\/'
    }, { 'id': 102, 'number': 29, 'name': 'Radio BH dijaspore', 'url': 'http:\/\/88.198.1.231:9332' }, {
      'id': 103,
      'number': 30,
      'name': 'Radio Doboj ',
      'url': 'http:\/\/88.198.1.231:9318\/stream'
    }, { 'id': 104, 'number': 31, 'name': 'Radio Dernek Jelah', 'url': 'http:\/\/stm6.srvstm.com:22454' }, {
      'id': 105,
      'number': 32,
      'name': 'Radio Balkanski',
      'url': 'http:\/\/studiod.omerovic.info:8018\/'
    }, { 'id': 106, 'number': 33, 'name': 'Radio Bosanski Brod', 'url': 'http:\/\/188.165.192.5:8287' }, {
      'id': 107,
      'number': 34,
      'name': 'Radio 055',
      'url': 'http:\/\/ip.bijeljina.rs:9996'
    }, {
      'id': 108,
      'number': 35,
      'name': 'Radio Carsija Sarajevo',
      'url': 'http:\/\/stream.radiocarsija.com:19406\/'
    }, { 'id': 109, 'number': 36, 'name': 'Radio Bobar', 'url': 'http:\/\/51.254.61.148:9111\/' }, {
      'id': 110,
      'number': 37,
      'name': 'Radio Bihac',
      'url': 'http:\/\/188.40.62.20:8004'
    }, { 'id': 111, 'number': 38, 'name': 'Radio Bratunac', 'url': 'http:\/\/streaming.4-p.org:8124' }, {
      'id': 112,
      'number': 39,
      'name': 'Radio Valentino',
      'url': 'http:\/\/77.74.231.11:7106'
    }, {
      'id': 113,
      'number': 40,
      'name': 'Radio Big Rock',
      'url': 'http:\/\/big-rock.bigportal.ba:8100\/rock'
    }, {
      'id': 114,
      'number': 41,
      'name': 'Radio Big Balade',
      'url': 'http:\/\/big-balade.bigportal.ba:8100\/balade'
    }, { 'id': 115, 'number': 42, 'name': 'Radio ASK Ilidza', 'url': 'http:\/\/radio.epn.ba:8010\/' }, {
      'id': 116,
      'number': 43,
      'name': 'Radio Feral',
      'url': 'http:\/\/185.50.56.3\/'
    }, { 'id': 117, 'number': 44, 'name': 'Radio Sarajevo', 'url': 'http:\/\/malla.softnet.si:8000' }, {
      'id': 118,
      'number': 45,
      'name': 'Radio HIT',
      'url': 'http:\/\/51.254.61.148:8152\/'
    }, { 'id': 119, 'number': 46, 'name': 'Radio Avaz', 'url': 'http:\/\/51.254.61.148:8222\/' }, {
      'id': 120,
      'number': 47,
      'name': 'Radio BN',
      'url': 'http:\/\/stream.rtvbn.com:8522\/'
    }, { 'id': 121, 'number': 48, 'name': 'Radio Dzungla', 'url': 'http:\/\/5.9.25.50:9302\/' }, {
      'id': 122,
      'number': 49,
      'name': 'Radio Velkaton',
      'url': 'http:\/\/188.40.62.20:8016\/'
    }, { 'id': 123, 'number': 50, 'name': 'Radio Balkan DJ', 'url': 'http:\/\/balkan.dj.topstream.net:8070' }, {
      'id': 124,
      'number': 51,
      'name': 'Radio Studio M Teslic',
      'url': 'http:\/\/188.40.62.20:8014\/'
    }, { 'id': 125, 'number': 52, 'name': 'Radio Hule', 'url': 'http:\/\/89.212.151.238:1433\/' }, {
      'id': 126,
      'number': 53,
      'name': 'Radio Vogosca',
      'url': 'http:\/\/188.40.62.20:8018\/'
    }, {
      'id': 127,
      'number': 54,
      'name': 'Radio Studio D Srebrenik',
      'url': 'http:\/\/studiod.omerovic.info:8018\/'
    }, { 'id': 128, 'number': 55, 'name': 'Radio Skala', 'url': 'http:\/\/188.40.62.20:8049\/' }, {
      'id': 129,
      'number': 56,
      'name': 'Radio M',
      'url': 'http:\/\/195.222.33.217:8026\/'
    }, {
      'id': 130,
      'number': 57,
      'name': 'Radio Bosna Express',
      'url': 'http:\/\/expres-bosna.no-ip.biz:1936\/'
    }, { 'id': 131, 'number': 58, 'name': 'Radio Antena Jelah', 'url': 'http:\/\/pa-hosting.de:8060\/' }, {
      'id': 132,
      'number': 59,
      'name': 'Radio BA',
      'url': 'http:\/\/streaming.radioba.ba:10002\/radio_Ba'
    }, { 'id': 133, 'number': 60, 'name': 'Radio BIH', 'url': 'http:\/\/188.40.62.20:8034\/' }, {
      'id': 134,
      'number': 61,
      'name': 'Radio Breza',
      'url': 'http:\/\/64.187.229.244:8040\/'
    }, { 'id': 135, 'number': 62, 'name': 'Radio Zenit', 'url': 'http:\/\/5.189.168.133:8080\/' }, {
      'id': 136,
      'number': 63,
      'name': 'Radio Kameleon',
      'url': 'http:\/\/78.47.39.139:8100\/'
    }, { 'id': 137, 'number': 64, 'name': 'Radio Nes', 'url': 'http:\/\/188.40.62.20:8070\/' }, {
      'id': 138,
      'number': 65,
      'name': 'Radio Stari Grad',
      'url': 'http:\/\/195.222.57.33:8090\/'
    }, { 'id': 139, 'number': 66, 'name': 'Radio Herceg Bosne', 'url': 'http:\/\/178.209.2.100:7060\/' }, {
      'id': 140,
      'number': 67,
      'name': 'Radio Novi Grad',
      'url': 'http:\/\/s37.myradiostream.com:8120\/'
    }, { 'id': 141, 'number': 68, 'name': 'Radio Active Zenica', 'url': 'http:\/\/188.40.62.20:8012\/' }, {
      'id': 142,
      'number': 69,
      'name': 'Radio Hip-Hop Balkan',
      'url': 'http:\/\/88.198.233.68:2022\/'
    }, { 'id': 73, 'number': 70, 'name': 'Radio Mir Medjugorje', 'url': 'http:\/\/85.25.135.86:23565\/' }, {
      'id': 143,
      'number': 71,
      'name': 'Radio RTV 7 Tuzla',
      'url': 'http:\/\/195.222.33.217:8016\/'
    }, { 'id': 144, 'number': 72, 'name': 'Radio Busovaca', 'url': 'http:\/\/178.209.2.100:7010\/' }, {
      'id': 145,
      'number': 73,
      'name': 'Studenski Radio eFM',
      'url': 'http:\/\/206.190.135.28:8776\/stream'
    }, {
      'id': 74,
      'number': 74,
      'name': 'Radio Banovina HR',
      'url': 'http:\/\/stream1.radio-banovina.hr:8005\/;*.mp3'
    }, { 'id': 146, 'number': 75, 'name': 'Radio YUB Zenica', 'url': 'http:\/\/slusaj.yub-radio.com:9958\/' }, {
      'id': 147,
      'number': 76,
      'name': 'Radio Club Music Osijek',
      'url': 'http:\/\/cmr-hosting.com:8010\/'
    }, { 'id': 148, 'number': 77, 'name': 'Radio Snova Zagreb', 'url': 'http:\/\/37.59.32.115:8106' }, {
      'id': 149,
      'number': 78,
      'name': 'Radio Centar- Porec',
      'url': 'http:\/\/radiocentar.hr:8282\/mp3'
    }, { 'id': 150, 'number': 79, 'name': 'Radio Vrbovec', 'url': 'http:\/\/213.239.215.53:9452\/' }, {
      'id': 151,
      'number': 80,
      'name': 'Radio Totalni FM Zagreb',
      'url': 'http:\/\/173.192.137.34:8006\/'
    }, {
      'id': 152,
      'number': 81,
      'name': 'Radio Crash Zagreb',
      'url': 'http:\/\/live.radiocrash.net:8000\/'
    }, {
      'id': 153,
      'number': 82,
      'name': 'Radio Donji Miholjac',
      'url': 'http:\/\/s8.iqstreaming.com:8078\/stream'
    }, {
      'id': 154,
      'number': 83,
      'name': 'Radio KLFM Split',
      'url': 'http:\/\/klfm.streamradio.com.hr:8500\/'
    }, { 'id': 155, 'number': 84, 'name': 'Radio Korzo', 'url': 'http:\/\/212.92.194.188:8000\/' }, {
      'id': 156,
      'number': 85,
      'name': 'Jadranski Radio',
      'url': 'http:\/\/184.154.202.243:8015\/'
    }, {
      'id': 157,
      'number': 86,
      'name': 'Radio EuroStar Umag',
      'url': 'http:\/\/www.radioeurostar.hr:8030\/'
    }, { 'id': 158, 'number': 87, 'name': 'Radio Makarska Rivijera', 'url': 'http:\/\/85.25.135.86:8018' }, {
      'id': 159,
      'number': 88,
      'name': 'Radio GK',
      'url': 'http:\/\/live.rgk.hr:9500\/'
    }, { 'id': 160, 'number': 89, 'name': 'Radio Maestral - Pula', 'url': 'http:\/\/95.154.254.151:3468' }, {
      'id': 161,
      'number': 90,
      'name': 'Radio Enter Zagreb',
      'url': 'http:\/\/173.192.137.34:8006\/'
    }, {
      'id': 162,
      'number': 91,
      'name': 'Radio Etfos Osijek',
      'url': 'http:\/\/radio.etfos.hr:8000\/radioetfos.mp3'
    }, { 'id': 163, 'number': 92, 'name': 'Radio MAX Online', 'url': 'http:\/\/winweb1.novi-net.net:8010' }, {
      'id': 164,
      'number': 93,
      'name': 'Hrvatski Katolicki Radio',
      'url': 'http:\/\/stream.hkr.hr:8000\/hkr.aac'
    }, {
      'id': 165,
      'number': 94,
      'name': 'Radio Delta Metkovici',
      'url': 'http:\/\/delta.server2stream.com:8000'
    }, {
      'id': 166,
      'number': 95,
      'name': 'Radio Rujnica - Zavidovici',
      'url': 'http:\/\/94.176.238.218:8000\/'
    }, {
      'id': 167,
      'number': 96,
      'name': 'Radio City Velika Gorica',
      'url': 'http:\/\/s8.iqstreaming.com:8058\/stream'
    }, { 'id': 168, 'number': 97, 'name': 'Radio Megaton', 'url': 'http:\/\/144.76.172.23:7086\/' }, {
      'id': 169,
      'number': 98,
      'name': 'Radio Nerona Metkovici',
      'url': 'http:\/\/s6.myradiostream.com:11016\/'
    }, { 'id': 170, 'number': 99, 'name': 'Radio Istra', 'url': 'http:\/\/s8.iqstreaming.com:8032\/stream' }, {
      'id': 171,
      'number': 100,
      'name': 'Radio Bakar',
      'url': 'http:\/\/s8.iqstreaming.com:8030\/stream'
    }, { 'id': 172, 'number': 101, 'name': 'Radio Slatina', 'url': 'http:\/\/88.198.53.74:9998\/' }, {
      'id': 173,
      'number': 102,
      'name': 'Narodni Radio Zagreb',
      'url': 'http:\/\/173.192.137.34:8030\/'
    }, {
      'id': 174,
      'number': 103,
      'name': 'Radio MAX Varazdin',
      'url': 'http:\/\/winweb1.novi-net.net:8012\/'
    }, { 'id': 175, 'number': 104, 'name': 'Radio Vitrovica', 'url': 'http:\/\/pa-hosting.de:23619\/' }, {
      'id': 176,
      'number': 105,
      'name': 'Radio Antena Zagreb',
      'url': 'http:\/\/173.192.137.34:8050\/'
    }, { 'id': 177, 'number': 106, 'name': 'Radio Kaj', 'url': 'http:\/\/144.76.172.23:7051\/' }, {
      'id': 178,
      'number': 107,
      'name': 'Radio Dalmacija',
      'url': 'http:\/\/shoutcast.pondi.hr:8000'
    }, {
      'id': 179,
      'number': 108,
      'name': 'Radio 057 Zadar',
      'url': 'http:\/\/streaming.zadar.net:8000\/radio057'
    }, {
      'id': 180,
      'number': 109,
      'name': 'Radio 1 Cakovec',
      'url': 'http:\/\/d28int.novi-net.net:8042\/radio1H'
    }, {
      'id': 181,
      'number': 110,
      'name': 'Radio Baranja',
      'url': 'http:\/\/s8.iqstreaming.com:8036\/stream'
    }, {
      'id': 182,
      'number': 111,
      'name': 'Radio Labin',
      'url': 'http:\/\/radiolabin.streamradio.com.hr:9102\/'
    }, { 'id': 183, 'number': 112, 'name': 'Radio Brac', 'url': 'http:\/\/s8.iqstreaming.com:8066\/stream' }, {
      'id': 184,
      'number': 113,
      'name': 'Radio Imotski',
      'url': 'http:\/\/85.10.201.72:7028\/'
    }, { 'id': 185, 'number': 114, 'name': 'Radio Jack Folk', 'url': 'http:\/\/192.99.8.170:6397\/' }, {
      'id': 186,
      'number': 115,
      'name': 'Radio Naxi - Cafe',
      'url': 'http:\/\/naxidigital-cafe48.streaming.rs:8020\/'
    }, {
      'id': 187,
      'number': 116,
      'name': 'Radio Naxi - Rock',
      'url': 'http:\/\/naxidigital-rock48.streaming.rs:8180'
    }, {
      'id': 188,
      'number': 117,
      'name': 'Radio Naxi - Love',
      'url': 'http:\/\/naxidigital-love48.streaming.rs:8100'
    }, {
      'id': 189,
      'number': 118,
      'name': 'Radio Naxi - Dance',
      'url': 'http:\/\/naxidigital-dance48.streaming.rs:8110'
    }, {
      'id': 190,
      'number': 119,
      'name': 'Radio Naxi - Evergreen',
      'url': 'http:\/\/naxidigital-evergreen48.streaming.rs:8010'
    }, {
      'id': 191,
      'number': 120,
      'name': 'Radio Naxi - 80e',
      'url': 'http:\/\/naxidigital-80s48.streaming.rs:8040'
    }, {
      'id': 192,
      'number': 121,
      'name': 'Radio Naxi - Mix',
      'url': 'http:\/\/naxidigital-mix48.streaming.rs:8220'
    }, {
      'id': 193,
      'number': 122,
      'name': 'Radio Naxi - House',
      'url': 'http:\/\/naxidigital-house48.streaming.rs:8000'
    }, {
      'id': 194,
      'number': 123,
      'name': 'Radio Naxi - Boem',
      'url': 'http:\/\/naxidigital-boem48.streaming.rs:8160'
    }, {
      'id': 195,
      'number': 124,
      'name': 'Radio Naxi - Jazz',
      'url': 'http:\/\/naxidigital-jazz48.streaming.rs:8175\/'
    }, {
      'id': 196,
      'number': 125,
      'name': 'Radio Naxi - RNB',
      'url': 'http:\/\/naxidigital-rnb48.streaming.rs:8125\/'
    }, {
      'id': 197,
      'number': 126,
      'name': 'Radio Naxi - Gold',
      'url': 'http:\/\/naxidigital-gold48.streaming.rs:8065\/'
    }, {
      'id': 198,
      'number': 127,
      'name': 'Radio Naxi - Classic',
      'url': 'http:\/\/naxidigital-classic48.streaming.rs:8035\/'
    }, {
      'id': 199,
      'number': 128,
      'name': 'Radio Naxi - Clubbing',
      'url': 'http:\/\/naxidigital-clubbing48.streaming.rs:8095\/'
    }, {
      'id': 200,
      'number': 129,
      'name': 'Radio Naxi - Kids',
      'url': 'http:\/\/naxidigital-kids48.streaming.rs:8055\/'
    }, {
      'id': 201,
      'number': 130,
      'name': 'Radio Naxi - Fresh',
      'url': 'http:\/\/naxidigital-fresh48.streaming.rs:8215\/'
    }];
    vm.user = Authentication.user;
    vm.currentRadioChannel = vm.radioList[0];
    vm.playRadioChannel = playRadioChannel;
    vm.setupJWPlayer = setupJWPlayer;
    vm.changeCurrentRadioChannel = changeCurrentRadioChannel;

    function changeCurrentRadioChannel(radioChannel) {
      vm.currentRadioChannel = radioChannel;
      vm.playRadioChannel(radioChannel.url);
    }

    function getRadioChannels() {
      RadioService.loadRadio().then(function (data) {
        vm.radioList = data;
        changeCurrentRadioChannel(vm.radioList[0]);
        playRadioChannel(vm.radioList[0].url);
      });
    }

    function playRadioChannel(radioUrl) {
      window.jwplayer('player2').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50
      });
    }

    function setupJWPlayer() {
      window.jwplayer('player2').setup({
        file: 'http://163.172.213.155:8109/;stream.mp3',
        type: 'mp3',
        volume: 50,
        autostart: true
      });
    }
  }
}());
