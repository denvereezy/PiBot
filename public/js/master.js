var io = io();
$(document).ready(function() {

    $('#g1').click(function(e) {
        io.emit('speed', {speed: 85});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-111deg)"});
        e.preventDefault();
    });

    $('#g2').click(function(e) {
        io.emit('speed', {speed: 170});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-93deg)"});
        e.preventDefault();
    });

    $('#g3').click(function(e) {
        io.emit('speed', {speed: 255});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-74deg)"});
        e.preventDefault();
    });

    $('#fwrd').click(function(e) {
        io.emit('direction', {direction: 'forward'});
        e.preventDefault();
    });

    $('#left').click(function(e) {
        io.emit('direction', {direction: 'left'});
        e.preventDefault();
    });

    $('#right').click(function(e) {
        io.emit('direction', {direction: 'right'});
        e.preventDefault();
    });

    $('#back').click(function(e) {
        io.emit('direction', {direction: 'reverse'});
        e.preventDefault();
    });

    $('#stop').click(function(e) {
        io.emit('direction', {direction: 'stop'});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-120deg)"});
        e.preventDefault();
    });

    io.on('readings', function(data) {
        $('#readings').html(data.readings);
    });

    $("#camSrc").keyup(function() {
        var list = [];
        list.push($(this).val());
        var src = list.slice(-1)[0];
        $('#camera').attr('src', src);
    });

    io.on('temp', function(data) {
        $('#temp').html(data.temp);
    });
});
