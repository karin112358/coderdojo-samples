$(document).ready(function () {
    'use strict';
    var resultwindow = $('div.search-result-window');
    var resultlist = $('ul.search-results');
    var noresults = $('.no-results');

    // Set up search
    $.getJSON('/lunr.json', function (response) {
        // Create index
        var index = lunr(function() {
            this.ref('uri');
            this.field('title', { boost: 10 });
            this.field('content');
            this.field('tags');
        }); 

        $.each(response, function(i, item) {
            index.add(item);
        });

        // Handle search
        $('input#search').on('keyup', function () {
            // Get query
            var query = $(this).val();

            if (query) {
                resultwindow.show();

                // Search for query
                var result = index.search(query);
                console.log(result);

                // Show results
                resultlist.empty();
                if (result.length > 0) {
                    noresults.hide();
                    for (var item in result) {
                        var ref = result[item].ref;
                        var title = response.find(function(item) { return item.uri == ref; }).title;
                        var searchitem = '<li><a href="' + ref + '">' + title + '</a></li>';
                        resultlist.append(searchitem);
                    }
                } else {
                    noresults.show();
                }

            } else {
                resultwindow.hide();
            }
        });
    });
});

function closeSearchWindow() {
    $('div.search-result-window').hide();
    $('input#search').val('');
}