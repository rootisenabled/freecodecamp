function getQuote() {
    jQuery.ajax({

        headers: {
            "X-Mashape-Key": "BXqxjz57MlmshlUuWDLu1c8LZDrlp1MNCJWjsnRg31j2gteOhG",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },

        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/endpoint?mashape-key=BXqxjz57MlmshlUuWDLu1c8LZDrlp1MNCJWjsnRg31j2gteOhG',
        type: 'GET',
        dataType: 'json',

        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "BXqxjz57MlmshlUuWDLu1c8LZDrlp1MNCJWjsnRg31j2gteOhG");
        },

        success: function(response) {
            var resp = response;
            var currentQuote = resp.quote;
            var currentAuthor = resp.author;

            jQuery('.quote').text(currentQuote);
            jQuery('.author').text(currentAuthor);

            jQuery(".button_tweet").attr('href', "http://twitter.com/home/?status=" + currentQuote + " - " + currentAuthor);
        },

        error: function(xhr, textStatus, errorThrown) {
            alert("Request failed " + textStatus)
        }
    });
}

jQuery(document).ready(
    function() {
        getQuote();

        jQuery('#getQuote').on('click', getQuote);
        
        jQuery(".button_tweet").on('click', function() {
        	window.open("http://twitter.com/home/?status=" + currentQuote + " - " + currentAuthor, '_blank')
        });
    }
);
