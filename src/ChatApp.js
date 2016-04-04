function ChatApp(newSender, newRecipient) {
    var sender = newSender;
    var recipient = newRecipient;

    this.init = function() {
        drawChat();
        enableSend();
        sendingMessage();
    };

    // Building the DOM
    var drawChat = function() {
        // Buil form with an textfield input and a send button
        var inputText = $('<input class="messageToSend" type="text" placeholder="Send message...">');
        var button = $('<input class="sendButton" type="submit" value="Send" disabled>');
        var form = $('<form onsubmit="return false">').append(inputText).append(button);
        // Title of the chatbox
        var title = $('<h2>' + sender + ' discute avec ' + recipient + '</h2>');
        // Where messages are displayed
        var windowChat = $('<div class="chatWindow"></div>');
        // The chatbox that contains all
        var chatModule = $('<section id=' + sender + '>').append(title, windowChat, form);
        // Finally
        $('#container').append(chatModule);
    };

    // Enable the send button when something is write in the textfield input
    var enableSend = function() {
        $('#' + sender + ' input.messageToSend').on('input', function() {
            var text = $('#' + sender + ' input.messageToSend').val();
            // If textefield input is not empty
            if (text && text.length !== 0) {
                $('#' + sender + ' input.sendButton').prop('disabled', false);
            } else {
                $('#' + sender + ' input.sendButton').prop('disabled', true);
            }
        });
    };

    var getTime = function() {
        var date = new Date();

        function pad(n) {
            return n < 10 ? '0' + n : n;
        } // return the time formated 00 if time < 10
        var hours = pad(date.getHours());
        var minutes = pad(date.getMinutes());
        var secondes = pad(date.getSeconds());
        var time = '[' + hours + ':' + minutes + ':' + secondes + ']';
        return time;
    };

    var sendingMessage = function() {
        $('#' + sender + ' input.sendButton').on('click', function() {
            //add class to color the name of the sender for the sender
            var displaySender = $('<span class="sender">').text('<' + sender + '> ');

            //add class to color the name of the sender for the recipient
            var displayRecipient = $('<span class="recipient">').text('<' + sender + '> ');

            // Construct the received line and send line
            function lineConstruct(displayUser){
                // text of message
                var text = $('#' + sender + ' input.messageToSend').val();
                var time = $('<span class="time">').text(getTime() + ' ');
                var line = $('<p>')
                    .append(time)
                    .append(displayUser)
                    .append($('<span class="text">').text(text));
                return line;

            }
            $('#' + sender + ' .chatWindow').append(lineConstruct(displaySender));
            $('#' + recipient + ' .chatWindow').append(lineConstruct(displayRecipient));

            // Clear textfield input
            $('#' + sender + ' input.messageToSend').val('');
            // Disable send button
            $('#' + sender + ' input.sendButton').prop('disabled', true);

            //Scroll bottom to see the last message send or received
            $(".chatWindow").scrollTop($(".chatWindow")[0].scrollHeight);
        });
    };
}
