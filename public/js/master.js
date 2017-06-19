var io = io();
$(document).ready(function() {
    var speed = 0;
    $('#play').html('<i class="fa fa-play" aria-hidden="true"></i>');

    $('#g1').click(function(e) {
        speed = 85;
        io.emit('speed', {speed: 85});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-111deg)"});
        $('#g1').css('background', '#FF0000');
        $('#g2, #g3').css('background', '');
        e.preventDefault();
    });

    $('#g2').click(function(e) {
        speed = 170;
        io.emit('speed', {speed: 170});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-93deg)"});
        $('#g1, #g3').css('background', '');
        $('#g2').css('background', '#FF0000');
        e.preventDefault();
    });

    $('#g3').click(function(e) {
        speed = 255;
        io.emit('speed', {speed: 255});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-74deg)"});
        $('#g1, #g2').css('background', '');
        $('#g3').css('background', '#FF0000');
        e.preventDefault();
    });

    $('#fwrd').click(function(e) {
        if (speed == 0) {
            $('#alert').html('Select gear first');
        } else {
            $('#alert').html('');
            $('#fwrd').css('background', '#FF0000');
            $('#left, #right, #back, #stop').css('background', '');
            io.emit('direction', {direction: 'forward'});
            e.preventDefault();
        }
    });

    $('#left').click(function(e) {
        if (speed == 0) {
            $('#alert').html('Select gear first');
        } else {
            $('#alert').html('');
            $('#fwrd, #right, #back, #stop').css('background', '');
            $('#left').css('background', '#FF0000');
            io.emit('direction', {direction: 'left'});
            e.preventDefault();
        }
    });

    $('#right').click(function(e) {
        if (speed == 0) {
            $('#alert').html('Select gear first');
        } else {
            $('#alert').html('');
            $('#fwrd, #left, #back, #stop').css('background', '');
            $('#right').css('background', '#FF0000');
            io.emit('direction', {direction: 'right'});
            e.preventDefault();
        }
    });

    $('#back').click(function(e) {
        if (speed == 0) {
            $('#alert').html('Select gear first');
        } else {
            $('#alert').html('');
            $('#fwrd, #left, #right, #stop').css('background', '');
            $('#back').css('background', '#FF0000');
            io.emit('direction', {direction: 'reverse'});
            e.preventDefault();
        }
    });

    $('#stop').click(function(e) {
        speed = 0;
        io.emit('direction', {direction: 'stop'});
        $("#o").css({"transition": "transform 7s linear"});
        $("#o").css({"transform": "rotate(-120deg)"});
        $('#g1, #g2, #g3, #fwrd, #left, #right, #back').css('background', '');
        $('#stop').css('background', '#FF0000');
        e.preventDefault();
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

    $('#rewind').click(function(e) {
        $('#rewind').css('background', '#00ff00');
        $('#play, #skip').css('background', '');
        io.emit('music_event', {action: 'rewind'});
        e.preventDefault();
    });

    $('.play').click(function(e) {
        $('#play').css('background', '#00ff00');
        $('#rewind, #skip').css('background', '');
        var $this = $(this);
        $this.toggleClass('play');
        if($this.hasClass('play')){
            $this.html('<i class="fa fa-play" aria-hidden="true"></i>');
            io.emit('music_event', {action: 'play_pause'});
        } else {
            $this.html('<i class="fa fa-pause" aria-hidden="true"></i>');
        }
        e.preventDefault();
    });

    $('#skip').click(function(e) {
        $('#skip').css('background', '#00ff00');
        $('#play, #rewind').css('background', '');
        io.emit('music_event', {action: 'skip'});
        e.preventDefault();
    });
});
